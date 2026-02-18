import React from 'react';

export interface SectionProps {
  id?: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

export interface UserProfile {
  id: string;
  email: string; // Often linked to auth.users, but good to have in profile for display
  full_name: string;
  role: 'admin' | 'user' | string;
  is_admin?: boolean;
  created_at?: string;
}

export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  licensing_interest: string;
  captured_at: string;
}

export interface AIChat {
  id: string;
  user_query: string;
  ai_response: string;
  created_at: string;
}
