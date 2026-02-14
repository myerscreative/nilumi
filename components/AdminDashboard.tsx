
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLeads, getAIChats } from '../services/supabase';
import { Lead, AIChat } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'ai'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [aiChats, setAIChats] = useState<AIChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const ADMIN_KEY = "nilumi2025";

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'leads') {
        const data = await getLeads();
        setLeads(data || []);
      } else {
        const data = await getAIChats();
        setAIChats(data || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError("Unauthorized access. Invalid key.");
    }
  };

  const downloadCSV = () => {
    if (activeTab === 'leads') {
      if (leads.length === 0) return;
      const headers = ["First Name", "Last Name", "Email", "Company", "Message", "Captured At"];
      const rows = leads.map(l => [`"${l.first_name}"`, `"${l.last_name}"`, `"${l.email}"`, `"${l.company}"`, `"${l.licensing_interest?.replace(/"/g, '""')}"`, `"${new Date(l.captured_at).toLocaleString()}"`]);
      triggerDownload("nilumi_leads", [headers.join(","), ...rows.map(r => r.join(","))].join("\n"));
    } else {
      if (aiChats.length === 0) return;
      const headers = ["User Query", "AI Response", "Timestamp"];
      const rows = aiChats.map(c => [`"${c.user_query?.replace(/"/g, '""')}"`, `"${c.ai_response?.replace(/"/g, '""')}"`, `"${new Date(c.created_at).toLocaleString()}"`]);
      triggerDownload("nilumi_ai_analytics", [headers.join(","), ...rows.map(r => r.join(","))].join("\n"));
    }
  };

  const triggerDownload = (name: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${name}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-10 rounded-3xl w-full max-w-md shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-nilumi-green/20 rounded-lg flex items-center justify-center">
               <img src="/images/nilumi-logo.png" alt="Nilumi" className="w-6 h-6 object-contain" />
            </div>
            <h1 className="text-white font-heading font-bold text-xl tracking-tight">Command Center</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Access Portal Key</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nilumi-green transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-nilumi-green to-nilumi-teal text-[#0B0F19] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] transform"
            >
              Initialize Session
            </button>
          </form>
          <p className="mt-8 text-slate-600 text-[10px] text-center uppercase tracking-[0.2em]">Restricted to Nilumi Strategic Partners</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Header */}
      <nav className="border-b border-slate-800 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/nilumi-logo.png" alt="Nilumi" className="w-8 h-8" />
            <h1 className="font-heading font-bold text-lg tracking-tighter">Strategic Command</h1>
          </div>
          
          <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'leads' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Leads
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'ai' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              AI Insights
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={downloadCSV}
              className="bg-slate-800 hover:bg-slate-700 text-xs font-bold px-4 py-2 rounded-lg border border-slate-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Export {activeTab === 'leads' ? 'Leads' : 'Analytics'}
            </button>
            <button 
              onClick={() => window.location.hash = ''} 
              className="text-slate-400 hover:text-white text-xs font-bold px-4 py-2 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-heading font-bold mb-2">
            {activeTab === 'leads' ? 'Lead Pipeline' : 'AI Assistant Analytics'}
          </h2>
          <p className="text-slate-500 text-sm">
            {activeTab === 'leads' 
              ? 'Real-time partnership inquiries from the global pitch portal.' 
              : 'Tracking user intent and AI responses to optimize the conversion funnel.'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-12 h-12 border-2 border-nilumi-green border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400 text-xs tracking-widest uppercase italic">Accessing Encrypted Stream...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-red-900/20 border border-red-900/50 p-6 rounded-2xl text-red-400 text-sm"
            >
              SECURE SYNC FAILED: {error}
            </motion.div>
          ) : (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/50 shadow-2xl"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/50">
                    {activeTab === 'leads' ? (
                      <>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">Contact</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">Company</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">Inquiry Profile</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 text-right">Captured</th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">User Query</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">AI Response Path</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 text-right">Timestamp</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {activeTab === 'leads' ? leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-6">
                        <div className="font-bold text-white mb-0.5">{lead.first_name} {lead.last_name}</div>
                        <div className="text-slate-500 text-xs font-medium">{lead.email}</div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-[11px] font-bold text-nilumi-green uppercase tracking-tight">
                          {lead.company || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <p className="text-slate-400 text-xs leading-relaxed max-w-md italic">"{lead.licensing_interest}"</p>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="text-slate-400 text-xs font-mono">{new Date(lead.captured_at).toLocaleDateString()}</div>
                      </td>
                    </tr>
                  )) : aiChats.map((chat) => (
                    <tr key={chat.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-6 font-medium text-nilumi-green text-xs max-w-xs">{chat.user_query}</td>
                      <td className="px-6 py-6">
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 hover:line-clamp-none transition-all cursor-help max-w-lg">
                          {chat.ai_response}
                        </p>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="text-slate-400 text-xs font-mono">{new Date(chat.created_at).toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(activeTab === 'leads' ? leads : aiChats).length === 0 && (
                <div className="p-20 text-center text-slate-600 text-xs uppercase tracking-widest font-bold">
                  Pipeline Empty
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
