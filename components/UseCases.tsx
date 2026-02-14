
import React from 'react';
import { motion } from 'framer-motion';

// @ts-ignore
import nurseryImage from '../images/mom checking on baby.png';

// @ts-ignore
import kitchenImage from '../images/woman checkin on child.png';

// @ts-ignore
import hallwayImage from '../images/hallway night light.png';

const useCases = [
  {
    title: "The Nursery Check",
    description: "Peek in on a sleeping child without the jarring 'click' or flood of ceiling lights. Nilumi gives you just enough light to see, and zero disruption to their rest.",
    image: nurseryImage
  },
  {
    title: "Midnight Kitchen",
    description: "Your hand already knows the light switch. Grab the Nilumi module for a quick glass of water without disturbing the rest of the household.",
    image: kitchenImage
  },
  {
    title: "Guided Hallways",
    description: "Power out? The hallway light you always reach for is already glowing. No searching in the dark; Nilumi leads the way from the moment you step out.",
    image: hallwayImage
  }
];

const UseCases: React.FC = () => {
  return (
    <section id="use-cases" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 text-nilumi-teal font-black text-[10px] uppercase tracking-[0.5em] mb-12 bg-slate-50 px-6 py-2.5 rounded-full border border-slate-100 shadow-sm"
          >
            Habit in Action
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tight leading-tight mb-8">
            Designed for <br/> <span className="nilumi-text-gradient">Every Dark Moment.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-default"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-2xl">
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent opacity-40"></div>
              </div>
              
              <h3 className="text-2xl font-black text-[#0F172A] mb-4 tracking-tight group-hover:text-nilumi-green transition-colors">{useCase.title}</h3>
              <p className="text-slate-500 text-base leading-relaxed font-medium">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
