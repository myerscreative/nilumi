
import React from 'react';

interface Props {
  theme?: 'dark' | 'light';
}

const Footer: React.FC<Props> = ({ theme = 'light' }) => {
  return (
    <footer className="bg-slate-50 py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 overflow-hidden rounded-lg shadow-md border border-white">
            <img 
              src="/images/nilumi-logo.png" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-2xl font-bold text-[#0F172A] tracking-[0.2em] font-heading uppercase">NILUMI</span>
        </div>
        
        <div className="text-slate-400 text-[10px] tracking-widest uppercase font-black text-center md:text-left leading-relaxed">
          © 2026 NILUMI TECHNOLOGIES. <br className="md:hidden"/>
          U.S. PATENT NOs. 11,852,306 & 12,529,456. <br className="hidden md:block"/>
          ALL RIGHTS RESERVED.
        </div>

        <div className="flex gap-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-nilumi-teal transition-colors">Privacy</a>
          <a href="#" className="hover:text-nilumi-teal transition-colors">Terms</a>
          <a href="#" className="hover:text-nilumi-teal transition-colors">IP Licensing</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;