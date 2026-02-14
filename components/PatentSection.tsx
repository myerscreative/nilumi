
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  theme?: 'dark' | 'light';
}

const PatentSection: React.FC<Props> = ({ theme = 'light' }) => {
  return (
    <section id="patent" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 text-nilumi-teal font-black text-[10px] uppercase tracking-[0.5em] mb-10 bg-white shadow-xl px-8 py-3 rounded-full border border-slate-100"
          >
            <span className="w-2 h-2 rounded-full bg-nilumi-green animate-pulse"></span>
            US Utility Patents Registered
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-[#0F172A] mb-8 tracking-tighter leading-none">
            United States Patents <br/> 
            <span className="text-slate-300">#</span>11,852,306 & <span className="text-slate-300">#</span>12,529,456
          </h2>
          <p className="text-slate-500 text-lg lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            Unrivaled protection for the unique <span className="text-[#0F172A] font-bold">magnetic-coupling architecture</span> that defines the Nilumi interface.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Certificate Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#0F172A] rounded-[3.5rem] p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-white/5"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-nilumi-green/10 blur-[100px] rounded-full"></div>
            
            <h4 className="text-nilumi-green font-black mb-10 uppercase text-[11px] tracking-[0.4em] flex items-center gap-4">
              <div className="w-12 h-px bg-nilumi-green/30"></div>
              Protected Claims
            </h4>

            <ul className="space-y-8">
              {[
                { label: "01", text: "Proprietary magnetic-coupling for secure modular switching." },
                { label: "02", text: "Dual-state cradle functionality during module absence." },
                { label: "03", text: "Precision contact pathways for code-compliant charging." }
              ].map((claim, idx) => (
                <li key={idx} className="flex gap-8 group">
                  <span className="text-nilumi-green/40 font-black text-xl font-heading group-hover:text-nilumi-green transition-colors">{claim.label}</span>
                  <p className="text-white text-lg lg:text-xl font-medium leading-snug">
                    {claim.text}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Action Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white border border-slate-100 rounded-[3.5rem] p-12 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-100">
                <svg className="w-8 h-8 text-nilumi-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-4 tracking-tight">Legal Transparency</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium mb-10">
                Download the full technical summary including electrical certifications and licensing opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <a 
                href="/docs/11852306.pdf" 
                download="Nilumi_Patent_11852306.pdf"
                className="w-full nilumi-gradient text-[#0F172A] font-black py-6 px-8 rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 text-[11px] uppercase tracking-widest shadow-xl shadow-nilumi-green/20 group"
              >
                Download Patent Brief
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              </a>
              <p className="text-center text-[9px] text-slate-400 uppercase font-black tracking-widest">PDF • 318KB • OFFICIAL PATENT</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PatentSection;