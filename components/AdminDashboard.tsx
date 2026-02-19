import React, { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { userService } from '../services/userService';
import { getCurrentUser } from '../services/supabase';

// Simple Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const KeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
);
const MagicWandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4V2"></path><path d="M15 16v-2"></path><path d="M8 9h2"></path><path d="M20 9h2"></path><path d="M17.8 11.8L19 13"></path><path d="M15 9h0"></path><path d="M17.8 6.2L19 5"></path><path d="M3 21l9-9"></path><path d="M12.2 6.2L11 5"></path></svg>
);

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        role: 'user',
        is_admin: false
    });
    const [accessDenied, setAccessDenied] = useState(false);
    const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

    // Initial Load & Auth Check
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            const currentUser = await getCurrentUser();
            
            if (!currentUser) {
                // If not authenticated, the App.tsx might redirect, but safe to handle here
                window.location.hash = ''; 
                return;
            }

            // Check if current user is admin via profile
            const profile = await userService.getCurrentUserProfile();
            
            if (!profile || !profile.is_admin) {
                setAccessDenied(true);
                setLoading(false);
                return;
            }

            // Load users
            loadUsers();
        };

        init();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (error) {
            showNotification('Failed to load users', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user => 
        user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = (user: UserProfile | null = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                full_name: user.full_name || '',
                email: user.email || '',
                role: user.role || 'user',
                is_admin: user.is_admin || false
            });
        } else {
            setEditingUser(null);
            setFormData({
                full_name: '',
                email: '',
                role: 'user',
                is_admin: false
            });
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingUser(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await userService.updateUser(editingUser.id, formData);
                showNotification('User updated successfully', 'success');
            } else {
                await userService.addUser(formData);
                showNotification('User created successfully (Profile only)', 'success');
            }
            handleCloseModal();
            loadUsers();
        } catch (error) {
            showNotification('Operation failed', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        
        try {
            await userService.deleteUser(id);
            showNotification('User deleted successfully', 'success');
            loadUsers();
        } catch (error) {
            showNotification('Failed to delete user', 'error');
        }
    };

    const handleSendPasswordReset = async (email: string) => {
        if (!window.confirm(`Send password reset email to ${email}?`)) return;
        try {
            await userService.sendPasswordReset(email);
            showNotification(`Reset email sent to ${email}`, 'success');
        } catch (error) {
            showNotification('Failed to send reset email', 'error');
        }
    };

    const handleSendMagicLink = async (email: string) => {
        if (!window.confirm(`Send magic login link to ${email}?`)) return;
        try {
            await userService.sendMagicLink(email);
            showNotification(`Magic link sent to ${email}`, 'success');
        } catch (error) {
            showNotification('Failed to send magic link', 'error');
        }
    };

    if (accessDenied) {
        return (
            <div className="min-h-screen bg-nilumi-navy flex items-center justify-center text-white">
                <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
                    <p className="mb-6">You do not have permission to view this page.</p>
                    <button 
                        onClick={() => window.location.hash = ''}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-nilumi-navy text-white p-6 md:p-12 font-sans">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-nilumi-green to-nilumi-teal">
                        User Management
                    </h1>
                    <p className="text-gray-400 mt-1">Manage platform access and profiles</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button 
                        onClick={() => window.location.hash = ''} 
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Exit Dashboard
                    </button>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-nilumi-green to-nilumi-teal hover:opacity-90 transition-opacity font-semibold shadow-lg shadow-nilumi-green/20"
                    >
                        <PlusIcon /> Add User
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:w-96">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <SearchIcon />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search users by name or email..." 
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-nilumi-green/50 transition-colors"
                            />
                        </div>
                        <div className="text-sm text-gray-400">
                            Showing {filteredUsers.length} users
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        {loading ? (
                             <div className="p-12 text-center text-gray-400">Loading users...</div>
                        ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="p-4 font-semibold text-gray-300">Name</th>
                                    <th className="p-4 font-semibold text-gray-300">Email</th>
                                    <th className="p-4 font-semibold text-gray-300">Role</th>
                                    <th className="p-4 font-semibold text-gray-300">Status</th>
                                    <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.length > 0 ? filteredUsers.map(user => (
                                    <tr key={user.id} className="group md:hover:bg-white/5 transition-colors relative">
                                        <td className="p-4 font-medium">{user.full_name || 'N/A'}</td>
                                        <td className="p-4 text-gray-400">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {user.is_admin ? (
                                                <span className="text-nilumi-green text-sm flex items-center gap-1">
                                                    ● Admin
                                                </span>
                                            ) : (
                                                <span className="text-gray-500 text-sm">Member</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 relative z-10">
                                                <button 
                                                    onClick={() => handleOpenModal(user)}
                                                    className="p-3 hover:bg-white/10 active:bg-white/20 rounded-lg text-gray-400 hover:text-white transition-colors touch-target-fix"
                                                    title="Edit"
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-3 hover:bg-red-500/20 active:bg-red-500/30 rounded-lg text-gray-400 hover:text-red-400 transition-colors touch-target-fix"
                                                    title="Delete"
                                                >
                                                    <TrashIcon />
                                                </button>
                                                <div className="w-px h-6 bg-white/10 mx-1"></div>
                                                <button 
                                                    onClick={() => handleSendPasswordReset(user.email)}
                                                    className="p-3 hover:bg-yellow-500/20 active:bg-yellow-500/30 rounded-lg text-gray-400 hover:text-yellow-400 transition-colors touch-target-fix"
                                                    title="Send Password Reset"
                                                >
                                                    <KeyIcon />
                                                </button>
                                                <button 
                                                    onClick={() => handleSendMagicLink(user.email)}
                                                    className="p-3 hover:bg-purple-500/20 active:bg-purple-500/30 rounded-lg text-gray-400 hover:text-purple-400 transition-colors touch-target-fix"
                                                    title="Send Magic Link"
                                                >
                                                    <MagicWandIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-gray-500">
                                            No users found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0B0F19] rounded-2xl border border-white/10 shadow-2xl w-full max-w-md p-6 relative">
                        <button 
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <XIcon />
                        </button>
                        
                        <h2 className="text-2xl font-bold mb-6 font-heading">
                            {editingUser ? 'Edit User' : 'Add New User'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-nilumi-green transition-colors"
                                    value={formData.full_name}
                                    onChange={e => setFormData({...formData, full_name: e.target.value})}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    required 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-nilumi-green transition-colors"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                                    <select 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-nilumi-green transition-colors"
                                        value={formData.role}
                                        onChange={e => setFormData({...formData, role: e.target.value})}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="editor">Editor</option>
                                    </select>
                                </div>
                                <div className="flex items-center pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 rounded border-gray-600 text-nilumi-green focus:ring-nilumi-green"
                                            checked={formData.is_admin}
                                            onChange={e => setFormData({...formData, is_admin: e.target.checked})}
                                        />
                                        <span className="text-sm font-medium text-gray-300">Is Admin</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-nilumi-green to-nilumi-teal text-white font-semibold hover:opacity-90 transition-opacity"
                                >
                                    {editingUser ? 'Save Changes' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Notification Toast */}
            {notification && (
                <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-xl shadow-2xl backdrop-blur-md border ${
                    notification.type === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-200' : 'bg-red-500/20 border-red-500/50 text-red-200'
                } transition-all duration-300 transform translate-y-0`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
