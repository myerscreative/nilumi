import React from 'react';
import { motion } from 'framer-motion';

const CradleFocus: React.FC = () => {
  return (
    <section className="py-32 bg-white text-slate-900 overflow-hidden relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* LEFT COLUMN: Narrative & Safeguards */}
          <div className="flex flex-col">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-slate-900"
            >
              Licensing-Ready Architecture.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 leading-relaxed text-lg max-w-xl mb-16"
            >
              Removable modular products introduce user-error and utility-loss risk. Nilumi eliminates this through a dual-state cradle architecture engineered for safety, retrofit compatibility, and scalable integration.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Zero Downtime</h3>
                <p className="text-slate-400 leading-relaxed text-base max-w-md">
                  Primary lighting remains fully operational during module removal.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Retrofit Compatible</h3>
                <p className="text-slate-400 leading-relaxed text-base max-w-md">
                  Designed for standard 1-gang and multi-gang decorative configurations.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">No Exposed Electrical Contacts</h3>
                <p className="text-slate-400 leading-relaxed text-base max-w-md">
                  Removable module contains no accessible conductive surfaces.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* RIGHT COLUMN: Architectural Diagram */}
          <div className="flex flex-col justify-center">
            <div className="relative mb-10">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="aspect-[16/11] bg-[#FDFDFD] rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative"
              >
                <img 
                  src="/images/magnetic-connection.png" 
                  alt="Nilumi Engineering Diagram" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-80"
                />
                
                {/* Minimal Technical Annotations */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Magnet Zone */}
                  <div className="absolute top-[32%] left-[48%] flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-slate-900" />
                    <div className="h-px w-4 bg-slate-200" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 py-1">Magnet Zone</span>
                  </div>

                  {/* Bridge Path */}
                  <div className="absolute top-[48%] right-[22%] flex items-center gap-2 flex-row-reverse">
                    <div className="w-1 h-1 rounded-full bg-slate-900" />
                    <div className="h-px w-4 bg-slate-200" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 py-1">Bridge Path</span>
                  </div>

                  {/* Charging Zone */}
                  <div className="absolute bottom-[28%] left-[32%] flex flex-col items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-slate-900" />
                    <div className="w-px h-3 bg-slate-200" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 py-1">Charging Zone</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-xs font-medium tracking-wide border-l border-slate-100 pl-4 ml-2"
            >
              Engineered for scalable manufacturing using standard switch housing dimensions.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CradleFocus;