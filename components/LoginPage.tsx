
import React, { useState } from 'react';
import { signIn } from '../services/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import ForgotPasswordModal from './ForgotPasswordModal';

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn(email, password);
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Access denied. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-white font-inter">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a3cf4a]/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2bb673]/5 rounded-full blur-[120px] -ml-48 -mb-48" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#a3cf4a] to-[#2bb673] rounded-2xl p-4 shadow-2xl shadow-green-900/20 mb-6 group transition-transform hover:scale-105">
            <img src="/images/nilumi-logo.png" alt="Nilumi" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Partner Innovation Portal
          </h1>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">
            Review the latest Nilumi patent documents and licensing opportunities.
          </p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
          {/* Form Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-5 relative">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#a3cf4a] mb-2 px-1">
                Security Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a3cf4a]/50 focus:ring-1 focus:ring-[#a3cf4a]/20 transition-all font-medium placeholder-slate-600"
                placeholder="partner@lutron.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#a3cf4a] mb-2 px-1">
                Access Token
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a3cf4a]/50 focus:ring-1 focus:ring-[#a3cf4a]/20 transition-all font-medium placeholder-slate-600"
                placeholder="••••••••"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#a3cf4a] to-[#2bb673] text-slate-950 font-bold py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <>
                  <span>Unlock Access</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

             <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs text-slate-500 hover:text-[#a3cf4a] transition-colors"
                >
                  Forgot your access token?
                </button>
             </div>

          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
            Protected by Nilumi Intellectual Property Stack
          </p>
          <div className="flex justify-center gap-6 opacity-30">
            <div className="text-[10px] border border-slate-500 px-2 py-0.5 rounded">PATENT US 11,852,306</div>
            <div className="text-[10px] border border-slate-500 px-2 py-0.5 rounded">PATENT US 12,529,456</div>
          </div>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-auto pt-10 text-slate-700 text-[10px] flex items-center gap-2">
        <span>© 2026 NILUMI SOLUTIONS</span>
        <span className="w-1 h-1 bg-slate-800 rounded-full" />
        <button className="hover:text-slate-400 transition-colors">REQUEST ACCESS</button>
      </div>

      <ForgotPasswordModal 
        isOpen={isForgotModalOpen} 
        onClose={() => setIsForgotModalOpen(false)} 
      />
    </div>
  );
};

export default LoginPage;
