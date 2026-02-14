
import React from 'react';
import { motion } from 'framer-motion';

// @ts-ignore
import stepsForUse from '../images/steps-for-use.png';

const PhaseShift: React.FC = () => {
  const specs = [
    "Grid-sensing detection circuitry",
    "Automatic bypass architecture",
    "Recessed charging contacts",
    "Magnetic self-alignment system",
    "Zero-utility-loss cradle design"
  ];

  return (
    <section id="engineering" className="py-32 lg:py-48 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          {/* Left Column: Engineering List */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-12 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-100"
            >
              Engineering Validation
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-16 tracking-tight leading-[0.9] font-heading"
            >
              How It Works.
            </motion.h2>

            <div className="space-y-8">
              {specs.map((spec, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-nilumi-green/40 group-hover:bg-nilumi-green transition-colors" />
                  <p className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-none uppercase">
                    {spec}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-20 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] border-t border-slate-200 pt-12"
            >
              Mechanical Integration • Patent Reference US 11,852,306
            </motion.p>
          </div>

          {/* Right Column: Interaction Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.4em] mb-8">
              Validated Interaction Flow
            </span>
            
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white p-4">
              <img 
                src={stepsForUse} 
                alt="4-Step Interaction Collage" 
                className="w-full h-full object-cover rounded-2xl grayscale-[0.2] contrast-[1.05] brightness-[1.02]"
              />
              
              {/* Subtle Step Markers - Minimal and Gray */}
              {[1, 2, 3, 4].map((step, i) => (
                <div 
                  key={i}
                  className={`absolute w-6 h-6 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 pointer-events-none transition-opacity
                    ${i === 0 ? 'top-8 left-8' : 
                      i === 1 ? 'top-8 right-8' : 
                      i === 2 ? 'bottom-8 left-8' : 
                      'bottom-8 right-8'}`}
                >
                  0{step}
                </div>
              ))}
            </div>

            <p className="mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Removal → Use → Return → Continuity Maintained
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Structural Accents */}
      <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-slate-100/30 -skew-x-12 translate-x-1/2"></div>
    </section>
  );
};

export default PhaseShift;
