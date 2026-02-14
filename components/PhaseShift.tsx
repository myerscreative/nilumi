
import React from 'react';
import { motion } from 'framer-motion';

const PhaseShift: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F1F5F9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-4 text-nilumi-teal font-black text-[11px] uppercase tracking-[0.6em] mb-10 bg-white shadow-xl px-8 py-3 rounded-full border border-slate-100"
        >
          <span className="w-2 h-2 rounded-full bg-nilumi-green shadow-[0_0_10px_#A3C644]"></span>
          The Shift
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-black text-[#0F172A] mb-8 uppercase tracking-tight leading-none font-heading"
        >
          Nilumi Knows. <br/> <span className="nilumi-text-gradient">Nilumi Leads.</span>
        </motion.h2>

        <div className="h-1 w-32 bg-gradient-to-r from-nilumi-green to-nilumi-teal rounded-full mb-10"></div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-slate-500 font-bold text-xl lg:text-3xl italic leading-relaxed"
        >
          A high-performance bridge between panic and safety. <br className="hidden md:block"/> 
          Engineered to activate exactly when, and where, you need it.
        </motion.p>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-nilumi-green/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-nilumi-teal/5 blur-[120px] rounded-full"></div>
      </div>
    </section>
  );
};

export default PhaseShift;
