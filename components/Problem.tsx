
import React, { useState } from 'react';
import { generateImage, editImage } from '../services/geminiService';
import { motion } from 'framer-motion';

import searchingForFlashlight from '../images/searching for flashlight.png';
import crawlingToLight from '../images/crawling to light.png';
import lowBattery from '../images/low battery.png';

interface ProblemItem {
  id: string;
  title: string;
  desc: string;
  img: string;
  prompt: string;
  isAiGenerated: boolean;
}

const RainEffect: React.FC = () => {
  // Generate stable random values for the drops
  const drops = React.useMemo(() => [...Array(80)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: 0.6 + Math.random() * 0.4,
    delay: Math.random() * 2,
    offset: (Math.random() * 8) - 4
  })), []);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-40">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ 
            left: drop.left, 
            top: -100 
          }}
          animate={{ 
            top: '120%',
            left: `calc(${drop.left} + ${drop.offset}%)`
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: "linear"
          }}
          className="absolute w-[1px] h-[60px] bg-gradient-to-b from-transparent via-white/30 to-transparent blur-[1px]"
        />
      ))}
    </div>
  );
};

const LightningEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <RainEffect />
      {/* Cinematic Flash 1 (Top Left) */}
      <motion.div
        animate={{ 
          opacity: [0, 0, 0.3, 0.05, 0.6, 0, 0],
          scale: [1, 1.2, 1.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          times: [0, 0.4, 0.45, 0.5, 0.55, 0.6, 1],
        }}
        className="absolute -top-24 -left-24 w-[60vw] h-[60vw] bg-nilumi-green/10 rounded-full blur-[120px]"
      />
      
      {/* Cinematic Flash 2 (Bottom Right) */}
      <motion.div
        animate={{ 
          opacity: [0, 0.4, 0, 0.2, 0, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 7,
          times: [0, 0.1, 0.2, 0.3, 0.4, 1],
        }}
        className="absolute -bottom-48 -right-24 w-[50vw] h-[50vw] bg-nilumi-teal/10 rounded-full blur-[100px]"
      />

      {/* Randomized "Sheet" Lightning (Quick, screen-wide pulses) */}
      <motion.div
        animate={{ 
          opacity: [0, 0.15, 0, 0.1, 0, 0, 0.05, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 2,
          times: [0, 0.02, 0.04, 0.06, 0.08, 0.5, 0.52, 1],
        }}
        className="absolute inset-0 bg-white/5"
      />

      {/* Moving Atmospheric Glow */}
      <motion.div
        animate={{ 
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '10%', '-10%'],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-nilumi-green/5 rounded-full blur-[150px]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nilumi-navy/20 to-nilumi-navy"></div>
    </div>
  );
};

const Problem: React.FC = () => {
  const points = [
    "• Standard wall switches provide no illumination.",
    "• Emergency systems require secondary activation.",
    "• Portable flashlights lack fixed placement.",
    "• Smartphones sacrifice communication for light."
  ];

  return (
    <section id="problem" className="py-32 bg-nilumi-navy relative overflow-hidden">
      <LightningEffect />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <span className="text-nilumi-green font-bold text-[10px] uppercase tracking-[0.4em] mb-6 block border-l-2 border-nilumi-green pl-4">The Licensing Gap</span>
            <h2 className="text-5xl md:text-8xl font-bold text-white mb-12 uppercase tracking-tighter leading-none font-heading">
              THE MARKET <br/>
              <span className="nilumi-text-gradient">FAILURE.</span>
            </h2>
            
            <div className="space-y-12">
              <p className="text-2xl md:text-3xl text-slate-300 font-medium-header tracking-tight">
                During power interruption:
              </p>
              
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                {points.map((point, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start border-l border-white/10 pl-6 group hover:border-nilumi-green/50 transition-colors"
                  >
                    <p className="text-xl md:text-2xl text-slate-400 group-hover:text-white transition-colors leading-snug">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="pt-16 mt-16 border-t border-white/5"
              >
                <p className="text-2xl md:text-4xl text-white font-medium-header tracking-tight leading-tight mb-12">
                  The wall switch — the most intuitive control point in the home — becomes non-functional during outage.
                </p>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="h-[2px] w-24 bg-nilumi-green/30"></div>
                  <p className="text-3xl md:text-5xl font-black text-nilumi-green uppercase tracking-tighter">
                    Nilumi resolves this structural failure.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
