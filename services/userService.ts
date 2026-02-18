import { supabase } from './supabase';
import { UserProfile } from '../types';

export const userService = {
  // Fetch all users from the profiles table
  getUsers: async (): Promise<UserProfile[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    return data || [];
  },

  // Add a new user profile
  // NOTE: This creates a profile record. For full auth, an Edge Function 
  // or admin API usage is better to avoid auto-login issues.
  addUser: async (user: Omit<UserProfile, 'id' | 'created_at'>): Promise<UserProfile> => {
    // For now, we'll let Supabase generate the ID if not provided, or use a placeholder
    // In a real app, this should probably trigger an invite via Supabase Auth
    const { data, error } = await supabase
      .from('profiles')
      .insert([user])
      .select()
      .single();

    if (error) {
      console.error('Error adding user:', error);
      throw error;
    }

    return data;
  },

  // Update an existing user profile
  updateUser: async (id: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }

    return data;
  },

  // Delete a user profile
  deleteUser: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Get current user's profile to check permissions
  getCurrentUserProfile: async (): Promise<UserProfile | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
        // If no profile exists, return null rather than throwing
        if (error.code === 'PGRST116') return null;
        console.error('Error fetching current user profile:', error);
        return null;
    }

    return data;
  },

  // Send password reset email
  sendPasswordReset: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/#reset-password',
    });

    if (error) {
      console.error('Error sending password reset:', error);
      throw error;
    }
  },

  // Send magic link (OTP)
  sendMagicLink: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      }
    });

    if (error) {
      console.error('Error sending magic link:', error);
      throw error;
    }
  }
};
