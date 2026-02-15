
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Form submissions will not be saved to the database.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// --- AUTH FUNCTIONS ---
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const resetPasswordForEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/#reset-password`,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw error;
  return data;
};

// --- DATA FUNCTIONS ---
export const getLeads = async () => {
  const { data, error } = await supabase
    .from('nilumi_leads')
    .select('*')
    .order('captured_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const saveAIChat = async (user_query: string, ai_response: string) => {
  const { error } = await supabase
    .from('nilumi_ai_chats')
    .insert([{ user_query, ai_response }]);
  if (error) console.error("Error saving AI chat:", error);
};

export const getAIChats = async () => {
  const { data, error } = await supabase
    .from('nilumi_ai_chats')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};
