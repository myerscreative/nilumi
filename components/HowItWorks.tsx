
import React from 'react';
import { motion } from 'framer-motion';

interface HowItWorksProps {
  onOpenAI: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenAI }) => {
  const steps = [
    {
      title: "Automatic Detection",
      step: "01",
      subtitle: "Grid Awareness",
      desc: "Inside Nilumi, a dedicated core monitors current flow 24/7. The moment it detects a drop, it bypasses the standard switch to activate the internal LED.",
      techSpec: "Instant-On Protection",
      icon: (
        <div className="relative flex items-center justify-center w-12 h-12">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-nilumi-green rounded-full blur-md"
          />
          <svg className="w-8 h-8 text-nilumi-green relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )
    },
    {
      title: "Everyday Readiness",
      step: "02",
      subtitle: "Habit in Action",
      desc: "The light switch is the first place your hand goes. Reach for Nilumi when you need light without the disruption—ideal for checking on a sleeping child or moving through the house without waking the household.",
      badge: "Intuitive Access",
      icon: (
        <div className="relative flex items-center justify-center w-12 h-12">
          <div className="absolute inset-0 bg-nilumi-teal/10 rounded-lg blur-sm" />
          <svg className="w-10 h-10 text-nilumi-teal relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="4" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )
    },
    {
      title: "Independent Power",
      step: "03",
      subtitle: "Lithium Core",
      desc: "Once removed, you have hours of high-intensity light. The internal battery trickle-charges daily, ensuring it's at 100% every single night.",
      techSpec: "Always Charged",
      icon: (
        <div className="relative flex items-center justify-center w-12 h-12">
          <svg className="w-10 h-10 text-nilumi-green" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3H15L17 7V21H7V7L9 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M7 11H17" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 7V3" stroke="currentColor" strokeWidth="2"/>
            <path d="M19 4L22 2M19 10L22 11M5 4L2 2M5 10L2 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
      {/* Structural Accent Background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#F1F5F9] to-white"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-12 bg-white border border-slate-100 rounded-[2.5rem] group hover:border-nilumi-green/30 transition-all duration-500 flex flex-col shadow-[0_20px_50px_rgba(15,23,42,0.04)] hover:shadow-[0_40px_80px_rgba(15,23,42,0.08)]"
            >
              {/* Massive subtle background number */}
              <div className="text-[120px] absolute -top-10 -right-4 select-none pointer-events-none text-slate-50 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity font-geometric-numbers">
                {s.step}
              </div>
              
              <div className="mb-10 relative z-10">
                <div className="inline-flex p-4 rounded-2xl bg-slate-50 group-hover:bg-nilumi-green/5 transition-colors">
                  {s.icon}
                </div>
              </div>
              
              <p className="text-nilumi-teal text-[10px] uppercase mb-4 font-medium-header tracking-premium">{s.subtitle}</p>
              <h3 className="text-2xl font-black text-[#0F172A] mb-6 tracking-tight leading-tight">{s.title}</h3>
              
              <p className="text-slate-600 text-base leading-relaxed mb-8 flex-1 font-medium">
                {s.desc}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-auto">
                {s.badge && (
                  <span className="bg-nilumi-green text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-nilumi-green/25">
                    {s.badge}
                  </span>
                )}
                {s.techSpec && (
                  <span className="bg-[#0F172A] text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-[#0F172A]/20">
                    {s.techSpec}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic CTA Card - Redesigned for High Contrast */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 max-w-5xl mx-auto bg-[#0F172A] rounded-[3rem] p-16 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-nilumi-green/10 blur-[80px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-nilumi-teal/10 blur-[80px] rounded-full"></div>

          <h3 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight relative z-10 leading-none uppercase">
            ENGINEERED <br/> <span className="nilumi-text-gradient">FOR CONTINUITY.</span>
          </h3>
          
          <div className="flex flex-col items-center gap-8 relative z-10">
            <button 
              onClick={onOpenAI}
              className="flex items-center gap-5 pr-10 pl-5 py-5 rounded-full bg-slate-950 border-2 border-nilumi-green/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group transition-all duration-500 hover:border-nilumi-green hover:shadow-[0_0_30px_rgba(163,198,68,0.3)] relative overflow-hidden"
            >
              {/* Animated Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-nilumi-green/10 to-nilumi-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* AI Icon Container (Circle) */}
              <div className="relative w-12 h-12 rounded-full nilumi-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                <svg 
                  className="w-7 h-7 text-nilumi-navy" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 3L10.5 8.5L5 10L10.5 11.5L12 17L13.5 11.5L19 10L13.5 8.5L12 3Z" />
                  <path d="M19 14L18.25 16.75L15.5 17.5L18.25 18.25L19 21L19.75 18.25L22.5 17.5L19.75 16.75L19 14Z" />
                  <path d="M6 14L5.25 16.75L2.5 17.5L5.25 18.25L6 21L6.75 18.25L9.5 17.5L6.75 16.75L6 14Z" />
                </svg>
                <div className="absolute inset-0 rounded-full border-2 border-nilumi-green animate-ping opacity-20"></div>
              </div>

              {/* Text Labeling */}
              <div className="flex flex-col items-start relative z-10 text-left">
                <span className="text-white text-base font-bold tracking-tight group-hover:text-nilumi-green transition-colors leading-none font-heading">
                  Ask Innovation AI
                </span>
                <span className="text-slate-500 text-[10px] uppercase mt-1.5 group-hover:text-slate-400 transition-colors font-medium-header tracking-premium">
                  Patent Expert
                </span>
              </div>
            </button>
            
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] max-w-lg leading-relaxed font-bold">
              Instantly query patent mechanics,<br/>
              safety protocols, and retrofit compatibility.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
