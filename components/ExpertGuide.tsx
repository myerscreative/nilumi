import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import robertImage from '../images/robert-myers.png';

const ExpertGuide: React.FC = () => {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-slate-100 rounded-[4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-20 shadow-[0_50px_100px_rgba(15,23,42,0.08)]"
        >
          {/* High-End Portrait Visual */}
          <div className="relative flex-shrink-0 group">
            <div className="absolute inset-0 bg-nilumi-teal/10 rounded-[4rem] rotate-6 group-hover:rotate-0 transition-transform duration-700"></div>
            <div className="w-56 h-56 md:w-80 md:h-80 rounded-[3.5rem] overflow-hidden border-[12px] border-slate-50 relative z-10 shadow-2xl transition-all duration-700">
              <img 
                src={robertImage} 
                alt="Robert Myers" 
                className="w-full h-full object-cover object-[50%_20%] saturate-[0.85] grayscale-0 transition-all duration-1000 scale-x-[-1]"
              />
            </div>
          </div>

          <div className="text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-4 mb-10">
              <div className="h-[2px] w-12 bg-nilumi-teal/30"></div>
              <p className="text-nilumi-teal text-[11px] font-black uppercase tracking-[0.6em]">The Innovation Vision</p>
            </div>
            
            <h4 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-4 tracking-tighter font-heading">Robert Myers</h4>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-12">
              <span className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">Lead Design Engineer</span>
              <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
              <span className="text-nilumi-teal text-sm font-black uppercase tracking-[0.2em] bg-nilumi-teal/5 px-4 py-1.5 rounded-full border border-nilumi-teal/10">
                30+ Years Experience
              </span>
            </div>

            <blockquote className="text-3xl md:text-4xl text-slate-700 font-light italic mb-12 leading-[1.3] font-sans">
              "We didn't just want to build a gadget. We wanted to solve the <span className="text-[#0F172A] font-medium not-italic">inherent failure</span> of the light switch. Nilumi ensures you never have to search for safety in the dark."
            </blockquote>
            
            <div className="grid sm:grid-cols-2 gap-8 pt-10 border-t border-slate-100">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-nilumi-teal group-hover:bg-nilumi-teal group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Intellectual Property</p>
                  <p className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Patents US 11,852,306 & 12,529,456</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-nilumi-teal group-hover:bg-nilumi-teal group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Market Readiness</p>
                  <p className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">UL-Compliance Ready</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertGuide;
