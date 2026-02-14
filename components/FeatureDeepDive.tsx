
import React from 'react';
import { motion } from 'framer-motion';

// @ts-ignore
import switchHovering from '../images/switch-hovering.png';

const FeatureDeepDive: React.FC = () => {
  const features = [
    {
      title: "Dual-State Functional Bridge",
      desc: "Maintains full primary lighting operation when the module is removed, eliminating utility loss and user failure risk.",
      id: "bridge"
    },
    {
      title: "Concealed Charging Contacts",
      desc: "Gravity-protected, recessed contact design eliminates exposed electrical pathways while ensuring consistent charging alignment.",
      id: "pins"
    },
    {
      title: "Magnetic Auto-Alignment",
      desc: "Integrated neodymium magnets ensure automatic seating and 100% pin-to-contact engagement without user precision.",
      id: "magnets"
    }
  ];

  return (
    <section id="engineering-architecture" className="py-40 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Left Column: Engineering Stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="pt-8"
          >
            <div className="mb-16">
              <span className="text-slate-400 text-[10px] uppercase font-black tracking-[0.4em] mb-6 block font-heading">Architecture</span>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tighter mb-8 font-heading">
                Patented Architecture. <br/> 
                Engineered for Integration.
              </h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl">
                Nilumi’s cradle system preserves full switch functionality while integrating concealed charging and magnetic alignment in a production-ready form factor.
              </p>
            </div>

            <div className="space-y-12 mb-20">
              {features.map((feature, i) => (
                <div key={feature.id} className="relative border-l border-slate-100 pl-8 transition-colors">
                  <h4 className="text-slate-900 font-bold text-lg mb-3 tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 text-base leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Integration Line */}
            <div className="pt-10 border-t border-slate-100">
              <p className="text-slate-400 text-sm font-bold leading-relaxed flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                Retrofit-ready for standard 1-gang configurations.
              </p>
              <p className="text-slate-400 text-sm font-bold leading-relaxed mt-2 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                Designed for decorative plate compatibility and portfolio expansion.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Visual Breakdown */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-4 bg-slate-50 rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden"
            >
              <img 
                src={switchHovering} 
                alt="Nilumi Engineering Render" 
                className="w-full h-auto rounded-[2.5rem] mix-blend-multiply opacity-90"
              />

              {/* Technical Annotations */}
              
              {/* Bridge Circuit Pathway */}
              <div className="absolute top-[50%] left-[20%] group flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-slate-900/10 border border-slate-900/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-slate-900"></div>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded">Bridge circuit pathway</span>
              </div>

              {/* Concealed Charging Zone */}
              <div className="absolute top-[35%] right-[25%] group flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded order-first">Concealed charging zone</span>
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-slate-900/10 border border-slate-900/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-slate-900"></div>
                  </div>
                </div>
              </div>

              {/* Magnet Zone */}
              <div className="absolute bottom-[35%] right-[35%] group flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-slate-900/10 border border-slate-900/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-slate-900"></div>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded">Magnet zone</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureDeepDive;
