
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

            <h2 className="text-4xl lg:text-7xl font-black text-[#0F172A] tracking-tighter leading-[1.1] mb-10 font-heading drop-shadow-sm">
              Introducing <span className="nilumi-text-gradient">Nilumi:</span> <br className="hidden lg:block"/>
              <span className="text-2xl lg:text-5xl opacity-80 block mt-8 tracking-tight">The Flashlight Wall Switch.</span>
            </h2>

            <p className="text-slate-500 text-xl lg:text-3xl font-medium leading-relaxed mb-20 max-w-2xl italic border-l-4 border-nilumi-green/30 pl-8">
              Elegant design that lights the way.
            </p>
            
            <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
              {/* Pillar 1: Modern Design */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="group relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A3C644] to-[#43A49B] flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h4 className="text-[#0F172A] font-black text-[11px] uppercase tracking-[0.3em] mb-3">Modern Design</h4>
                <p className="text-slate-600 text-sm lg:text-base leading-relaxed font-bold">
                  Nilumi elegantly hides the flashlight right where you can see it.
                </p>
              </motion.div>

              {/* Pillar 2: Daily Utility */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="group relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A3C644] to-[#43A49B] flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="text-[#0F172A] font-black text-[11px] uppercase tracking-[0.3em] mb-3">Daily Utility</h4>
                <p className="text-slate-600 text-sm lg:text-base leading-relaxed font-bold">
                  Use it every day to control your lights exactly like a standard switch.
                </p>
              </motion.div>

              {/* Pillar 3: Your Guide in the Dark */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="group relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A3C644] to-[#43A49B] flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-[#0F172A] font-black text-[11px] uppercase tracking-[0.3em] mb-3">Guide in the Dark</h4>
                <p className="text-slate-600 text-sm lg:text-base leading-relaxed font-bold">
                  Removable, always charged, and ready the moment the power fails.
                </p>
              </motion.div>
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