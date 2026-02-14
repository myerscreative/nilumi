

import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isVideoModalOpen]);

  return (
    <section className="relative min-h-[100dvh] w-full flex items-start pt-32 pb-12 md:items-end md:pb-32 md:pt-0 overflow-hidden bg-nilumi-navy">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-nilumi-navy">
        <iframe
          src="https://customer-emrwm711leustqqq.cloudflarestream.com/ac89cfff1d3794eb6caca090eea6987b/iframe?muted=true&preload=true&loop=true&autoplay=true&controls=false&playsinline=true&poster=https%3A%2F%2Fcustomer-emrwm711leustqqq.cloudflarestream.com%2Fac89cfff1d3794eb6caca090eea6987b%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
          loading="lazy"
          style={{ 
            border: 'none', 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            height: '100%', 
            width: '177.78vh',
            minWidth: '100%',
            minHeight: '100%'
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          className="opacity-50 grayscale-[0.3] scale-105"
        ></iframe>
        
        {/* Brand Anchor: Safety Glow (Green/Teal) */}
        <div className="absolute bottom-[25%] right-[15%] w-[45vw] h-[45vw] bg-nilumi-green/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute top-[10%] left-[5%] w-[35vw] h-[35vw] bg-nilumi-teal/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Minimal Gradient Overlays - Reduced further to maximize clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-nilumi-navy/25 via-nilumi-navy/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-nilumi-navy/20 via-nilumi-navy/5 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-nilumi-green/30 bg-nilumi-green/10 backdrop-blur-md text-nilumi-green text-[10px] uppercase mb-8 rounded-full font-medium-header tracking-premium">
            <span className="w-1.5 h-1.5 bg-nilumi-green rounded-full animate-pulse shadow-[0_0_8px_#A3C644]"></span>
            Innovation Hub • Patents US 11,852,306 & 12,529,456
          </div>
          
          <h1 className="text-[2.7rem] md:text-8xl font-bold text-white mb-6 md:mb-8 tracking-tighter leading-[1.1] md:leading-[0.85] uppercase font-heading">
            The Light Switch <br className="md:hidden" />
            That <br className="hidden md:block" />
            Works <br className="md:hidden" />
            When the Power <br className="md:hidden" />
            <span className="nilumi-text-gradient">Doesn’t.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-12 leading-[1.7] md:leading-relaxed font-medium tracking-wide max-w-2xl opacity-90 border-l-2 border-nilumi-green/40 pl-6">
            Nilumi is a patented, code-compliant wall switch with a removable, auto-charging flashlight — engineered for licensing integration.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-6">
            {/* Primary CTA: Nilumi Gradient */}
            <a 
              href="#contact"
              className="w-full sm:w-auto px-10 py-5 nilumi-gradient text-nilumi-navy text-[10px] font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all flex items-center justify-center shadow-[0_10px_40px_rgba(163,198,68,0.2)] active:scale-95"
            >
              Request Licensing Brief
            </a>

            {/* Secondary CTA: Ghost Style with Green Border */}
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto px-10 py-5 bg-transparent border border-nilumi-green/40 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-nilumi-green/5 transition-all flex items-center justify-center gap-3 backdrop-blur-sm active:scale-95 group"
            >
              <svg className="w-4 h-4 text-nilumi-green group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch 90-Second Overview
            </button>
          </div>
        </div>
      </div>

      {/* Side Branding */}
      <div className="absolute right-12 bottom-32 hidden lg:block">
        <span className="text-[10px] font-black text-white/5 uppercase tracking-[1.5em] [writing-mode:vertical-rl] rotate-180">
          TRANSFORMING BLACKOUTS • 2026 NILUMI
        </span>
      </div>

      {/* Video Modal Overlay */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <div 
            className="absolute inset-0 bg-nilumi-navy/95 backdrop-blur-3xl animate-fade-in"
            onClick={() => setIsVideoModalOpen(false)}
          ></div>
          
          <button 
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-8 right-8 text-white/40 hover:text-white z-[110] transition-colors"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full max-w-6xl aspect-video bg-black shadow-[0_0_120px_rgba(163,198,68,0.15)] rounded-2xl overflow-hidden z-[105] animate-modal-zoom border border-white/5">
            <iframe
              src="https://customer-emrwm711leustqqq.cloudflarestream.com/ac89cfff1d3794eb6caca090eea6987b/iframe?preload=true&loop=false&autoplay=false&poster=https%3A%2F%2Fcustomer-emrwm711leustqqq.cloudflarestream.com%2Fac89cfff1d3794eb6caca090eea6987b%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=true"
              style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen={true}
            ></iframe>
            
            {/* Logo Overlay */}
            <div className="absolute bottom-6 right-6 z-10 w-24 md:w-32 opacity-80 hover:opacity-100 transition-opacity pointer-events-none">
              <img src="/images/nilumi-logo.png" alt="Nilumi" className="w-full h-auto drop-shadow-lg" />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-modal-zoom {
          animation: modalZoom 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-pulse-slow {
          animation: pulseSlow 10s infinite ease-in-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(80px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalZoom {
          from { opacity: 0; transform: scale(0.85) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.15); }
        }
      `}</style>
    </section>
  );
};

export default Hero;

