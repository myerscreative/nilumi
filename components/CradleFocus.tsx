
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  theme?: 'dark' | 'light';
}

const CradleFocus: React.FC<Props> = ({ theme = 'light' }) => {
  return (
    <section className="py-24 bg-white text-[#0F172A] overflow-hidden relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-slate-50 border border-slate-200 p-12 rounded-[3rem] relative z-10 shadow-sm">
              <span className="text-nilumi-teal font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Engineered for Partners</span>
              <h3 className="text-4xl font-bold mb-6 tracking-tight">Designed for Licensing.</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg font-medium">
                VPs of Innovation know the biggest risk with removable components is user error. Nilumi solves this with the <span className="text-nilumi-teal font-bold">Functional Cradle</span>. 
              </p>
              <ul className="space-y-6 text-sm text-slate-500 font-medium">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-nilumi-green/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-nilumi-green rounded-full" />
                  </div>
                  <span><strong>Zero Downtime:</strong> The primary light switch is NEVER disabled, ensuring constant utility for the user.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-nilumi-green/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-nilumi-green rounded-full" />
                  </div>
                  <span><strong>Retrofit Ready:</strong> Fits standard 1-gang to multi-gang decorative cover plates with no box modification.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-nilumi-green/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-nilumi-green rounded-full" />
                  </div>
                  <span><strong>Wireless Safety:</strong> No exposed electrical contacts on the removable unit, exceeding consumer safety expectations.</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <motion.div 
                whileHover={{ y: -10 }}
                className="h-72 bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl"
              >
                <img 
                  src="/images/magnetic-connection.png" 
                  alt="Magnetic Connection" 
                  className="w-full h-full object-cover brightness-135 saturate-[1.2]" 
                />
              </motion.div>
              <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-lg">
                <h4 className="font-bold text-[#0F172A] mb-3 uppercase tracking-wider">Form Factor</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">Maintains the "Stealth" look demanded by modern, minimalist interiors.</p>
              </div>
            </div>
            <div className="space-y-8 pt-16">
              <div className="p-8 bg-[#0F172A] text-white rounded-[2rem] shadow-2xl">
                <h4 className="font-bold mb-3 uppercase tracking-wider text-nilumi-green">Stealth Lock</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">Invisible high-strength Neodymium magnets provide premium tactile feedback.</p>
              </div>
              <motion.div 
                whileHover={{ y: -10 }}
                className="h-72 bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl"
              >
                <img src="/images/steps-for-use.png" alt="Steps for Use" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CradleFocus;