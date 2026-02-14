import React from 'react';
import { signOut } from '../services/supabase';

interface NavbarProps {
  scrolled: boolean;
  theme?: 'dark' | 'light';
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, theme = 'dark', isAuthenticated, onLogout }) => {
  const isLight = theme === 'light';

  const handleLogout = async () => {
    try {
      await signOut();
      if (onLogout) onLogout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled 
        ? isLight 
          ? 'bg-white/80 backdrop-blur-xl py-4 shadow-xl border-b border-slate-200'
          : 'bg-[#0f172a]/90 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' 
        : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-9 h-9 overflow-hidden rounded-sm group-hover:scale-105 transition-transform border border-white/10 shadow-lg">
            <img 
              src="/images/nilumi-logo.png" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-lg font-bold tracking-[0.3em] font-heading uppercase transition-all leading-none ${isLight ? 'text-nilumi-navy' : 'text-white'}`}>NILUMI</span>
            {isAuthenticated && (
              <span className="text-[7px] font-bold tracking-[0.2em] text-[#a3cf4a] uppercase mt-1">Secure Portal</span>
            )}
          </div>
        </div>
        
        <div className={`hidden md:flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${isLight ? 'text-slate-500' : 'text-white/60'}`}>
          <a href="#problem" className={`hover:text-nilumi-teal transition-colors`}>The Gap</a>
          <a href="#solution" className={`hover:text-nilumi-teal transition-colors`}>Innovation</a>
          <a href="#features" className={`hover:text-nilumi-teal transition-colors`}>Tech</a>
          <a href="#patent" className={`hover:text-nilumi-teal transition-colors`}>IP</a>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-colors px-4 py-2 rounded-sm border ${
                isLight 
                  ? 'text-slate-500 border-slate-200 hover:bg-slate-50' 
                  : 'text-white/60 border-white/10 hover:bg-white/5'
              }`}
            >
              Logout
            </button>
          )}
          <a 
            href="#contact"
            className={`${isLight ? 'bg-nilumi-navy text-white hover:bg-slate-800' : 'bg-white text-slate-950 hover:bg-slate-100'} px-7 py-2.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl`}
          >
            Request Demo
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
