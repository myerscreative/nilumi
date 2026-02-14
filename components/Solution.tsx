
import React from 'react';

interface SolutionProps {
  theme?: 'dark' | 'light';
}

const Solution: React.FC<SolutionProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <section id="solution" className={`py-24 transition-colors duration-700 ${isLight ? 'bg-transparent' : 'bg-nilumi-navy'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <div className="w-16 h-1 nilumi-gradient mb-8"></div>
            <h2 className={`text-4xl md:text-6xl font-bold mb-8 leading-tight transition-colors ${isLight ? 'text-nilumi-navy' : 'text-white'}`}>
              A Functional Cradle <br/> 
              <span className="nilumi-text-gradient">for Zero Utility Loss.</span>
            </h2>
            <div className="space-y-8">
              {[
                { title: "The Flashlight Rocker", desc: "A high-lumen, rechargeable LED unit that functions as the primary rocker interface." },
                { title: "The Functional Cradle", desc: "When removed, the cradle remains. It still pivots. It still controls the circuit. No broken utility." },
                { title: "Magnetic Docking", desc: "High-strength internal magnets guide the light back into place for a seamless 'Stealth' fit." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black border transition-all ${isLight ? 'bg-white border-slate-200 text-nilumi-teal shadow-md' : 'bg-nilumi-green/10 text-nilumi-green border-nilumi-green/20 group-hover:nilumi-gradient group-hover:text-nilumi-navy'}`}>{i + 1}</div>
                  <div>
                    <h4 className={`font-bold mb-2 tracking-wide uppercase text-sm transition-colors ${isLight ? 'text-nilumi-navy' : 'text-white'}`}>{item.title}</h4>
                    <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className={`${isLight ? 'bg-white border-slate-100 shadow-2xl' : 'bg-gradient-to-br from-nilumi-green/10 to-slate-900 border-slate-800'} border p-8 rounded-[3rem] relative transition-all`}>
               <div className={`aspect-square rounded-[2rem] flex items-center justify-center text-center p-2 overflow-hidden border ${isLight ? 'bg-slate-50 border-slate-100' : 'bg-slate-950 border-white/5'}`}>
                 <img src="https://images.unsplash.com/photo-1594818378824-706599723cf8?auto=format&fit=crop&q=80&w=800" alt="Technical Layout" className={`w-full h-full object-cover mix-blend-multiply ${isLight ? 'opacity-80' : 'opacity-60 grayscale'}`} />
               </div>
               
               <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                 <div className={`p-5 rounded-2xl border backdrop-blur-md ${isLight ? 'bg-white/80 border-slate-200 shadow-sm' : 'bg-slate-950/80 border-white/5'}`}>
                    <p className="text-[9px] text-nilumi-green uppercase font-black tracking-widest mb-1">Charging</p>
                    <p className={`font-bold text-sm ${isLight ? 'text-nilumi-navy' : 'text-white'}`}>Wireless (No Pins)</p>
                 </div>
                 <div className={`p-5 rounded-2xl border backdrop-blur-md ${isLight ? 'bg-white/80 border-slate-200 shadow-sm' : 'bg-slate-950/80 border-white/5'}`}>
                    <p className="text-[9px] text-nilumi-teal uppercase font-black tracking-widest mb-1">Compatibility</p>
                    <p className={`font-bold text-sm ${isLight ? 'text-nilumi-navy' : 'text-white'}`}>Standard Gang Box</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
