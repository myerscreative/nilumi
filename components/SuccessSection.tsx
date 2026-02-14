
import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import successImage from '../images/nilumi switch on wall with woman\'s hand.png';

const SuccessSection: React.FC = () => {
  return (
    <motion.section 
      id="success-reveal" 
      initial={{ backgroundColor: "#0B0F19" }}
      whileInView={{ backgroundColor: "#F1F5F9" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Background Image - Full Screen and Flipped */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 1.5, delay: 0.2 }}
           className="w-full h-full"
        >
          <img 
            src={successImage}
            alt="Nilumi Success Scene" 
            className="w-full h-full object-cover scale-x-[-1]"
          />
        </motion.div>
        {/* Subtle Gradient Overlays for Readability and Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F1F5F9]/80 via-[#F1F5F9]/20 to-transparent lg:from-[#F1F5F9] lg:via-[#F1F5F9]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-24 w-full relative z-10 py-24">
        <div className="max-w-4xl">
          {/* Transition Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 text-nilumi-teal font-black text-[10px] uppercase tracking-[0.5em] mb-12 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-nilumi-teal/10 shadow-xl"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-nilumi-teal animate-pulse"></span>
              Revelation
            </motion.div>

            <h2 className="text-4xl lg:text-7xl font-black text-[#0F172A] tracking-tighter leading-[1.1] mb-8 font-heading drop-shadow-sm">
              Introducing <span className="nilumi-text-gradient">Nilumi</span>
            </h2>

            <p className="text-xl lg:text-3xl text-[#0F172A] font-bold leading-tight mb-16 max-w-2xl border-l-4 border-nilumi-green/30 pl-8">
              A patented wall switch architecture with an integrated, removable, self-charging light module.
            </p>
            
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 mb-20">
              {[
                "Functions as a standard decorative wall switch",
                "Activates automatically during power interruption",
                "Removable high-output lithium light module",
                "Maintains full switch continuity during module removal"
              ].map((bullet, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-4 py-4 border-b border-slate-200"
                >
                  <span className="text-nilumi-teal text-xl font-black">•</span>
                  <span className="text-[#0F172A] text-lg lg:text-xl font-bold tracking-tight">{bullet}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 lg:gap-12 pt-12 border-t border-slate-200">
              {[
                "NO BEHAVIOR CHANGE REQUIRED",
                "NO EXPOSED WIRING",
                "NO ELECTRICAL BOX MODIFICATION"
              ].map((claim, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (i * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <svg className="w-5 h-5 text-nilumi-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">{claim}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Anchor Branding at Bottom */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center pointer-events-none opacity-20">
        <div className="h-20 w-[1px] bg-gradient-to-b from-transparent to-[#0F172A] mb-4"></div>
        <span className="text-[10px] font-black uppercase tracking-[1em] ml-[1em] text-[#0F172A]">NILUMI</span>
      </div>
    </motion.section>
  );
};

export default SuccessSection;