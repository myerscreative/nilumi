
import React from 'react';
import { motion } from 'framer-motion';

// @ts-ignore
import switchHovering from '../images/switch-hovering.png';

interface Props {
  theme?: 'dark' | 'light';
}

const FeatureDeepDive: React.FC<Props> = () => {
  const pillars = [
    {
      title: "Recessed Charging Pins",
      desc: "Hidden, gravity-protected contacts located at the top of the cradle. They remain inaccessible to fingers and protected from dust, ensuring a perfect electrical connection that is invisible to the eye.",
      id: "pins"
    },
    {
      title: "Magnetic Auto-Alignment",
      desc: "Integrated Neodymium magnets guide the flashlight into the cradle, ensuring 100% pin-to-contact seating without the user needing to 'aim' or 'fumble' in the dark.",
      id: "magnets"
    },
    {
      title: "The Functional Bridge",
      desc: "The cradle serves as a zero-utility-loss bridge. Your wall switch remains 100% operational for your room's primary lighting, even when the flashlight is removed.",
      id: "bridge"
    }
  ];

  return (
    <section id="features" className="py-32 bg-[#F1F5F9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          {/* Left Side: Technical Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] leading-tight tracking-tight mb-6">
                Invisible Innovation. <br/> 
                <span className="nilumi-text-gradient">Patented Reliability.</span>
              </h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">
                We’ve hidden the complexity to prioritize safety and intuition.
              </p>
            </div>

            <div className="space-y-12">
              {pillars.map((pillar, i) => (
                <div key={pillar.id} className="relative group">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl nilumi-gradient flex items-center justify-center shadow-lg shadow-nilumi-green/20">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#0F172A] font-black text-xl mb-3 tracking-tight group-hover:text-nilumi-teal transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Visual Breakdown with Leader Lines */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 bg-white rounded-[3.5rem] shadow-2xl border border-white overflow-hidden"
            >
              <img 
                src={switchHovering} 
                alt="Nilumi Switch with Flashlight Hovering" 
                className="w-full h-auto rounded-[2.5rem]"
              />

              {/* Leader Lines & Dots */}
              {/* Pins Callout */}
              <div className="absolute top-[35%] left-[25%] group pointer-events-none">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 rounded-full bg-nilumi-teal shadow-[0_0_15px_#2DD4BF]" 
                  />
                  {/* Line toward left side pillars */}
                  <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-l from-nilumi-teal to-transparent -translate-x-full opacity-40"></div>
                </div>
              </div>

              {/* Magnets Callout */}
              <div className="absolute bottom-[40%] right-[30%] group pointer-events-none">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="w-4 h-4 rounded-full bg-nilumi-green shadow-[0_0_15px_#A3C644]" 
                  />
                  {/* Decorative Line */}
                  <div className="absolute top-1/2 right-0 w-24 h-px bg-gradient-to-r from-nilumi-green to-transparent translate-x-full opacity-40"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Authority Footer */}
        <div className="mt-32 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 py-4 px-10 bg-white rounded-2xl shadow-sm border border-slate-100"
          >
            <svg className="w-5 h-5 text-nilumi-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.9L10 1.154l7.834 3.746v5.203c0 5.06-3.342 9.401-7.834 10.647-4.492-1.246-7.834-5.587-7.834-10.647V4.9z" clipRule="evenodd" />
            </svg>
            <span className="text-[#0F172A] font-bold text-lg uppercase tracking-widest font-serif italic">
              Protected by US Patents 11,852,306 & 12,529,456
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureDeepDive;
