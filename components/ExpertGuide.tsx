import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import robertImage from '../images/robert-myers.png';

const ExpertGuide: React.FC = () => {
  return (
    <section className="py-24 px-6 relative z-10 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-slate-200 rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 md:gap-20 shadow-sm"
        >
          {/* Engineering Portrait Visual */}
          <div className="relative flex-shrink-0">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden grayscale brightness-105 border border-slate-200 relative z-10">
              <img 
                src={robertImage} 
                alt="Robert Myers" 
                className="w-full h-full object-cover object-[50%_20%] scale-x-[-1]"
              />
            </div>
          </div>

          <div className="text-center lg:text-left flex-1">
            <div className="mb-8">
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-medium-header mb-2">Founder & Lead Design Engineer</p>
              <h4 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 tracking-tight font-heading">Robert Myers</h4>
              <p className="text-slate-400 text-sm uppercase tracking-wider font-medium-header">
                Lead Design Engineer &bull; <span className="normal-case tracking-normal">30+ Years Experience</span>
              </p>
            </div>
            
            <div className="mb-10 max-w-2xl">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-sans font-light">
                Nilumi was developed to address structural failure in traditional wall switches during power interruption. The system integrates patented magnetic coupling, dual-state cradle architecture, and concealed charging pathways into a production-ready form factor.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Intellectual Property</p>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-slate-800">US Patent 11,852,306</p>
                  <p className="text-sm font-semibold text-slate-800">US Patent 12,529,456</p>
                </div>
              </div>

              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Market Readiness</p>
                <p className="text-sm font-semibold text-slate-800 uppercase tracking-wider">UL-Compliance Architecture Ready</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertGuide;
