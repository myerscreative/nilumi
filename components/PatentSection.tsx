

import React from 'react';
import { motion } from 'framer-motion';

const PatentSection: React.FC = () => {
  return (
    <section id="patent" className="py-32 md:py-48 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="max-w-3xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight font-heading">
              United States Patents
            </h2>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-12 tracking-tight">
              US 11,852,306 & US 12,529,456
            </div>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              Issued utility patents protecting Nilumi’s magnetic-coupled modular switching architecture and cradle functionality.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          {/* Left Column: Protected Claims */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-slate-900 text-xs font-bold uppercase tracking-[0.2em] mb-12 flex items-center gap-4">
              Protected Claims
              <div className="flex-grow h-px bg-slate-100"></div>
            </h4>
            <ul className="space-y-12">
              {[
                { id: "01", text: "Proprietary magnetic-coupled modular switching" },
                { id: "02", text: "Dual-state cradle functionality during module absence" },
                { id: "03", text: "Code-compliant concealed charging pathways" }
              ].map((claim, idx) => (
                <li key={idx} className="flex gap-8 items-baseline">
                  <span className="text-slate-300 font-mono font-medium text-sm">{claim.id}</span>
                  <p className="text-slate-900 text-lg md:text-xl font-medium leading-snug">
                    {claim.text}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column: Technical & IP Brief */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-10 lg:p-14 rounded-sm border border-slate-100"
          >
            <h4 className="text-slate-900 text-xs font-bold uppercase tracking-[0.2em] mb-8">
              Technical & IP Brief
            </h4>
            <p className="text-slate-500 text-base leading-relaxed mb-12 font-medium">
              Download the full technical summary including protected claims, electrical architecture overview, and licensing structure.
            </p>
            <div className="space-y-6">
              <a 
                href="/docs/Nilumi_IP_Market_Brief.pdf" 
                download="Nilumi_IP_Market_Brief.pdf"
                className="inline-block bg-slate-900 text-white font-bold py-5 px-10 rounded-sm hover:bg-slate-800 transition-all text-[10px] uppercase tracking-[0.2em] w-full text-center"
              >
                Download Technical & IP Brief (PDF)
              </a>
              <p className="text-center text-[9px] text-slate-400 uppercase font-bold tracking-[0.2em]">
                PDF • 114KB • IP & TECHNICAL SUMMARY
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PatentSection;