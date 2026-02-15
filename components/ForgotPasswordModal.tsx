import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resetPasswordForEmail, requestManualAuthHelp } from '../services/supabase';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'help_requested'>('idle');
  const [message, setMessage] = useState('');
  const [isRequestingHelp, setIsRequestingHelp] = useState(false);
  const [showHelpOption, setShowHelpOption] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      await resetPasswordForEmail(email);
      setStatus('success');
      setMessage('Recovery email sent. Please check your inbox.');
      setCooldown(60); // Set 60s cooldown on success
    } catch (error: any) {
      console.error("Password reset error:", error);
      setStatus('error');
      if (error.status === 429 || error.message?.includes('rate limit') || error.message?.includes('exceeded')) {
        setMessage("To protect your account, Supabase restricts how many reset links can be sent per hour. If you don't see an email yet, please check your spam folder or try again in an hour.");
        setShowHelpOption(true);
        setCooldown(60);
      } else {
        setMessage(error.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestHelp = async () => {
    setIsRequestingHelp(true);
    try {
      await requestManualAuthHelp(email);
      setStatus('help_requested');
      setMessage("Request sent! Robert has been notified and will manually assist you with your access as soon as possible.");
    } catch (error: any) {
      console.error("Help request error:", error);
      setMessage("Failed to send help request. Please try again or contact support directly.");
    } finally {
      setIsRequestingHelp(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 relative shadow-2xl overflow-hidden"
            >
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3cf4a]/10 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none" />

              <h2 className="text-xl font-bold text-white mb-2">Reset Password</h2>
              <p className="text-slate-400 text-sm mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {status === 'success' ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-medium mb-2">Check your email</p>
                  <p className="text-slate-400 text-sm mb-6">{message}</p>
                  <button
                    onClick={onClose}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors border border-slate-600"
                  >
                    Return to Login
                  </button>
                </div>
              ) : status === 'help_requested' ? (
                <div className="bg-[#a3cf4a]/10 border border-[#a3cf4a]/20 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-[#a3cf4a]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-[#a3cf4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[#a3cf4a] font-bold text-sm mb-1">Help Request Sent</p>
                  <p className="text-slate-300 text-[11px] leading-relaxed mb-4">
                    {message}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full bg-[#a3cf4a] text-slate-950 text-xs font-bold py-2 rounded-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#a3cf4a] mb-2 px-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#a3cf4a]/50 focus:ring-1 focus:ring-[#a3cf4a]/20 transition-all font-medium placeholder-slate-600"
                      placeholder="name@company.com"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="space-y-4">
                      <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl">
                        {message}
                      </div>
                      
                      {showHelpOption && (
                        <div className="bg-[#a3cf4a]/10 border border-[#a3cf4a]/20 p-4 rounded-xl text-center">
                          <p className="text-white text-xs font-medium mb-3">
                            Need immediate assistance?
                          </p>
                          <button
                            type="button"
                            onClick={handleRequestHelp}
                            disabled={isRequestingHelp}
                            className="w-full bg-white/5 hover:bg-white/10 text-[#a3cf4a] text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2 border border-[#a3cf4a]/30"
                          >
                            {isRequestingHelp ? (
                              <div className="w-3 h-3 border-2 border-[#a3cf4a]/30 border-t-[#a3cf4a] rounded-full animate-spin" />
                            ) : (
                              'Request Manual Reset'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 bg-transparent hover:bg-slate-800 text-slate-400 font-medium py-3 rounded-xl transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || cooldown > 0}
                      className="flex-1 bg-gradient-to-r from-[#a3cf4a] to-[#2bb673] text-slate-950 font-bold py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center text-sm"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                      ) : cooldown > 0 ? (
                        `Wait ${cooldown}s`
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;
