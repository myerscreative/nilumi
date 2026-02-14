
import React from 'react';
import { motion } from 'framer-motion';

// @ts-ignore
import nurseryImage from '../images/mom checking on baby.png';
// @ts-ignore
import kitchenImage from '../images/woman checkin on child.png';
// @ts-ignore
import hallwayImage from '../images/hallway night light.png';

const UseCases: React.FC = () => {
  const columns = [
    {
      title: "Low-Lumen Task Lighting",
      description: "Silent, removable illumination for nighttime movement without activating ceiling circuits. Ideal for nurseries, hallways, or bedside use.",
      image: nurseryImage
    },
    {
      title: "Portable Everyday Utility",
      description: "A rechargeable, high-output flashlight accessible at the most intuitive point in the home — the wall switch.",
      image: kitchenImage
    },
    {
      title: "Automatic Blackout Activation",
      description: "During grid interruption, Nilumi activates instantly at the switch location users naturally reach first.",
      image: hallwayImage
    }
  ];

  return (
    <section id="use-cases" className="py-40 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-8 font-heading"
          >
            Designed for Daily Use. <br/> 
            <span className="text-slate-400">Ready for Power Loss.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl"
          >
            Nilumi integrates into everyday lighting behavior while providing automatic blackout protection. This is not a single-use emergency device — it is a daily interaction product.
          </motion.p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-32">
          {columns.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-sm group">
                <img 
                  src={col.image} 
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/5"></div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight uppercase">
                {col.title}
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                {col.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Licensing Framing Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl p-12 bg-slate-50 border border-slate-100 rounded-[2.5rem]"
        >
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
            <div className="w-12 h-1 overflow-hidden bg-slate-200"></div>
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed italic">
              Unlike traditional emergency lighting products that sit unused, Nilumi becomes part of daily household behavior — increasing perceived value, user engagement, and premium product positioning.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
