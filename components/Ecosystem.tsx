
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  theme?: 'dark' | 'light';
}

const Ecosystem: React.FC<Props> = ({ theme = 'light' }) => {
  return (
    <section className="py-24 bg-white text-[#0F172A] relative overflow-hidden border-t border-slate-100" id="ecosystem">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Product Expansion</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#0F172A]">Platform Expansion & IP Growth.</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
              Nilumi’s patented architecture extends beyond wall-switch integration into portable, dimmable, and desktop charging configurations — expanding SKU potential and protected claims.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-0"
          >
            <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-2 rounded-full">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">IP Expansion: Extended Dimming & Desktop Integration Patents Issued</span>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Feature 1: The Integrated Dimmer Module */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-slate-50/50 rounded-3xl overflow-hidden border border-slate-100 h-full flex flex-col transition-all duration-500">
              <div className="h-[380px] relative overflow-hidden bg-white border-b border-slate-100">
                <img 
                  src="/images/dimmer.png" 
                  alt="Integrated Dimmer Module" 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-[#0F172A]">Integrated Dimming Module</h3>
                <p className="text-slate-500 mb-6 leading-relaxed text-sm font-medium">
                  Patent extension integrates tactile dimmer control into the removable flashlight body, expanding use beyond emergency lighting into portable task illumination.
                </p>
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Licensing Signal:
                  </p>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    Enables premium SKU differentiation within existing switch portfolios.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: The Desktop Charging Cradle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            <div className="bg-slate-50/50 rounded-3xl overflow-hidden border border-slate-100 h-full flex flex-col transition-all duration-500">
              <div className="h-[380px] relative overflow-hidden bg-white border-b border-slate-100">
                <img 
                  src="/images/table-top-cradle.png" 
                  alt="Desktop Charging Cradle" 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-[#0F172A]">Desktop Charging Cradle</h3>
                <p className="text-slate-500 mb-6 leading-relaxed text-sm font-medium">
                  Extends concealed-pin charging and blackout activation into tabletop environments.
                </p>
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Licensing Signal:
                  </p>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    Creates cross-category expansion into hospitality, bedside, and office markets.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
