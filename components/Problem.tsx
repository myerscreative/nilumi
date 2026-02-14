
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
  const [items, setItems] = useState<ProblemItem[]>([
    {
      id: 'panic',
      title: "The Panic Search",
      desc: "In emergencies, locating a flashlight is a multi-step hurdle. You're left fumbling in the dark while minutes—and safety—slip away.",
      img: searchingForFlashlight,
      prompt: "A cinematic, dramatic wide shot of a person fumbling through a dark, cluttered kitchen drawer in near total darkness, illuminated only by a faint, cold blue moonlight through a window. High tension, emergency atmosphere, professional photography style, 8k resolution.",
      isAiGenerated: false
    },
    {
      id: 'battery',
      title: "The Dangerous Crawl",
      desc: "Standard emergency lights are often tucked away. You're forced to crawl behind furniture or reach into dead-zones where batteries have already failed.",
      img: crawlingToLight,
      prompt: "A person crawling on the floor in a dark hallway, reaching under a console table for a flashlight. Shadows are long and oppressive. Cinematic emergency lighting, 8k resolution.",
      isAiGenerated: false
    },
    {
      id: 'smartphone',
      title: "The Smartphone Trap",
      desc: "Your phone is a lifeline, not a lantern. Using it as a flashlight drains critical battery power, leaving you isolated when you need to call for help. Nilumi keeps your phone charged for its real purpose: communication.",
      img: lowBattery,
      prompt: "A dramatic, atmospheric close-up of a hand holding a smartphone in a pitch-black environment. The screen shows a 'Low Battery 2%' warning in a harsh red font. The background is pitch black with sharp shadows. 8k, photorealistic, cinematic lighting, emergency vibe.",
      isAiGenerated: false
    }
  ]);

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPromptInput, setEditPromptInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (id: string, prompt: string) => {
    setLoadingId(id);
    setErrorMsg(null);
    try {
      const newImg = await generateImage(prompt);
      if (newImg) {
        setItems(prev => prev.map(item => item.id === id ? { ...item, img: newImg, isAiGenerated: true } : item));
      }
    } catch (err: any) {
      if (err.message === "QUOTA_EXHAUSTED") {
        setErrorMsg("API Quota Exhausted. Please try again in a moment.");
      } else {
        setErrorMsg("Failed to generate image. Please try again.");
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleEditSubmit = async (item: ProblemItem) => {
    if (!editPromptInput.trim()) return;
    setLoadingId(item.id);
    setEditingId(null);
    setErrorMsg(null);
    
    let currentImg = item.img;
    try {
      if (!item.isAiGenerated) {
        const baseImg = await generateImage(item.prompt);
        if (baseImg) currentImg = baseImg;
        else { setLoadingId(null); return; }
      }

      const editedImg = await editImage(currentImg, editPromptInput);
      if (editedImg) {
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, img: editedImg, isAiGenerated: true } : i));
      }
      setEditPromptInput('');
    } catch (err: any) {
      if (err.message === "QUOTA_EXHAUSTED") {
        setErrorMsg("API Quota Exhausted. Please try again later.");
      } else {
        setErrorMsg("Failed to edit image.");
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section id="problem" className="py-24 bg-nilumi-navy relative overflow-hidden">
      <LightningEffect />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-nilumi-green font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Homeowners are looking for something better</span>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight leading-none">
            Current solutions fail <br/>
            <span className="text-slate-600 font-black">when people most need them.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto italic font-light leading-relaxed">
            When the power goes out, you're stuck fumbling in the dark. Flashlights are hidden in drawers or behind furniture. Precious cell phone battery must be conserved.
          </p>
          
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 inline-flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-bold uppercase tracking-widest"
            >
              {errorMsg}
            </motion.div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-nilumi-green/30 transition-all duration-300 flex flex-col shadow-2xl"
            >
              <div className="h-48 overflow-hidden relative bg-slate-950">
                {loadingId === item.id && (
                  <div className="absolute inset-0 bg-nilumi-navy/80 backdrop-blur-sm flex items-center justify-center z-40">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-nilumi-green border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-[10px] text-nilumi-green font-black uppercase tracking-[0.2em]">Visualizing...</span>
                    </div>
                  </div>
                )}
                {editingId === item.id && (
                  <div className="absolute inset-0 bg-nilumi-navy/95 backdrop-blur-xl z-50 p-6 flex flex-col justify-center animate-in fade-in zoom-in duration-300">
                    <p className="text-[10px] font-black text-nilumi-green uppercase tracking-[0.3em] mb-4">Edit Vision</p>
                    <textarea 
                      autoFocus
                      value={editPromptInput}
                      onChange={(e) => setEditPromptInput(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white h-24 mb-4 focus:border-nilumi-green outline-none"
                    />
                    <div className="flex gap-3">
                      <button onClick={() => handleEditSubmit(item)} className="flex-1 nilumi-gradient text-nilumi-navy py-3 rounded-lg text-[10px] font-black uppercase tracking-widest">Apply</button>
                      <button onClick={() => setEditingId(null)} className="px-6 bg-slate-800 text-white py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest">Cancel</button>
                    </div>
                  </div>
                )}
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className={`w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-[0.5]`} 
                />
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleGenerate(item.id, item.prompt)} 
                    disabled={loadingId !== null}
                    className="bg-slate-950/80 p-2.5 rounded-full hover:text-nilumi-green transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  </button>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm flex-1">{item.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Failure Stake: Power Loss
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
