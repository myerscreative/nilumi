
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  theme?: 'dark' | 'light';
}

const Ecosystem: React.FC<Props> = ({ theme = 'light' }) => {
  return (
    <section className="py-24 bg-white text-[#0F172A] relative overflow-hidden border-t border-slate-100" id="ecosystem">
      {/* Patent Sash */}
      <div className="absolute top-0 right-0 z-50 pointer-events-none">
        <div className="bg-nilumi-green text-[#0F172A] font-black text-[10px] uppercase tracking-widest py-2 px-12 rotate-45 translate-x-12 translate-y-6 shadow-xl border-b border-[#0F172A]/10">
          New Patent
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-nilumi-teal font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Product Expansion</span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Beyond the Wall.</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Nilumi is more than an emergency device; it's a living ecosystem designed to transition seamlessly from your home infrastructure to your personal space.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-0"
          >
            <div className="inline-flex items-center gap-4 bg-slate-50 border border-slate-200 px-6 py-3 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-nilumi-green rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">IP Expansion: Extended Dimming & Desktop Integration Patents Issued</span>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Feature 1: The Portable Dimmer */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-[#F5F3EC] rounded-[3rem] overflow-hidden border border-[#E5E3DB] h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2">
              <div className="h-[400px] relative overflow-hidden">
                <img 
                  src="/images/dimmer.png" 
                  alt="Nilumi Dimmer Control" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100 shadow-sm">
                    New Patent
                  </span>
                </div>
              </div>
              <div className="p-12 flex flex-col flex-grow">
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Precision Control, Anywhere.</h3>
                <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                  Our latest patent extension integrates a tactile dimmer switch directly into the flashlight body. Nilumi isn't just an on/off emergency light; it's a portable, dimmable task light for reading, nurseries, or bedside use.
                </p>
                <div className="mt-auto">
                  <button className="flex items-center gap-2 text-nilumi-teal font-bold text-sm group/btn">
                    Explore Lighting Physics 
                    <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: The Desktop Charging Cradle */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-[#0F172A] text-white rounded-[3rem] overflow-hidden border border-slate-800 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-nilumi-teal/20 hover:-translate-y-2">
              <div className="h-[400px] relative overflow-hidden">
                <img 
                  src="/images/table-top-cradle.png" 
                  alt="Nilumi Tabletop Cradle" 
                  className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-12 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-bold tracking-tight">The Bedside Guardian.</h3>
                  <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center">
                    <div className="w-2 h-2 bg-nilumi-teal rounded-full" />
                  </div>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed font-medium">
                  The Nilumi ecosystem expands to the tabletop. The Desktop Cradle provides the same hidden-pin charging and "Instant-On" blackout protection as the wall unit, making it the perfect companion for nightstands and desks.
                </p>
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl mb-8">
                  <p className="text-xs text-slate-300 font-medium italic leading-relaxed">
                    "In a power failure, the desktop unit activates a low-level safety glow automatically, ensuring you are never lost, even before you reach for the light."
                  </p>
                </div>
                <div className="mt-auto">
                  <button className="px-8 py-3 bg-white text-[#0F172A] font-bold rounded-full text-sm transition-all hover:bg-nilumi-teal hover:text-white">
                    View Ecosystem Specs
                  </button>
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
