import React, { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Check, X } from 'lucide-react';

export default function BeneficiaryTransform() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(60); // percentage
  const [isDragging, setIsDragging] = useState(false);

  // Animate the section entrance
  useScrollAnimation(sectionRef);

  const startDrag = () => setIsDragging(true);
  const stopDrag = () => setIsDragging(false);

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let xPos = clientX - rect.left;
      
      // Clamp between 0 and width
      if (xPos < 0) xPos = 0;
      if (xPos > rect.width) xPos = rect.width;
      
      const posPercent = (xPos / rect.width) * 100;
      setSliderPos(posPercent);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', stopDrag);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging]);

  return (
    <section ref={sectionRef} className="w-full bg-[#FDFDFD] py-24 lg:py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="font-heading font-bold text-4xl lg:text-5xl text-[var(--color-ffg-navy)] mb-4">
          Real-world - Validation of the distributed fundraiser model
        </h2>
        <p className="font-body text-xl lg:text-2xl text-[var(--color-ffg-green)] mt-2">
          A community sports association in Portugal
        </p>
      </div>

      <div 
        ref={containerRef}
        className="w-full max-w-7xl lg:max-w-[1400px] mx-auto relative h-[600px] lg:h-[700px] rounded-[24px] overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        {/* BEFORE PANEL (Bottom Layer) */}
        <div 
          className="absolute inset-0 w-full h-full bg-neutral-900 border border-white/10 flex flex-col justify-start p-8 lg:p-12 pt-20 lg:pt-28 transform-gpu"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)`, willChange: 'clip-path' }}
        >
          {/* Background Image (Desaturated) */}
          <img 
            src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=2600"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col justify-start pointer-events-none sm:pr-8 pr-4 w-[50%]">
            <div>
              <span className="inline-block font-mono text-sm tracking-widest text-white/70 mb-2 uppercase">
                Objective
              </span>
            </div>
            <div className="font-body text-2xl text-white mb-6 leading-tight">
              Acquire a transport vehicle for youth athletes
            </div>
            
            <div className="font-mono text-sm tracking-widest text-white/70 mb-3 uppercase">
              Funding Structure
            </div>
            <ul className="space-y-3 font-body text-sm lg:text-base text-white/90 mb-6">
              {['50% Municipal Institutional support', '50% Distributed fundraiser network + online donations'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="font-mono text-sm tracking-widest text-white/70 mb-3 uppercase">
              Execution model
            </div>
            <ul className="space-y-3 font-body text-sm lg:text-base text-white/90">
              {['Senior members mobilised as fundraisers', 'Local SMEs contacted directly', 'Complementary digital crowdfunding'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AFTER PANEL (Top Layer, clipped) */}
        <div 
          className="absolute inset-0 w-full h-full bg-[var(--color-ffg-navy)] flex flex-col justify-start p-8 lg:p-12 pt-20 lg:pt-28 border-l-[var(--color-ffg-green)] transform-gpu"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)`, willChange: 'clip-path' }}
        >
          {/* Background Image (Full Color + Green Overlay) */}
          <img 
            src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=2600"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-[var(--color-ffg-forest)]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ffg-navy)]/90 to-[var(--color-ffg-navy)]/40 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col justify-start pointer-events-none sm:pl-8 pl-4 w-1/2 ml-auto">
            <div>
              <span className="inline-block font-mono text-sm tracking-widest text-[var(--color-ffg-green)] mb-6 uppercase">
                The Outcome
              </span>
              <ul className="space-y-3 font-body text-sm lg:text-base text-white">
                {['Fully Funded', 'Asset Delivered', 'Majority of Private Funds Mobilised via SME Network', 'Community Ownership Strengthened'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-[var(--color-ffg-green)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SLIDER HANDLE */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-[var(--color-ffg-green)] cursor-ew-resize shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--color-ffg-navy)] rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--color-ffg-green)] text-[var(--color-ffg-green)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" className="opacity-0 w-0 h-0" />
            </svg>
            <div className="absolute flex justify-between w-6 text-[var(--color-ffg-green)] opacity-80">
              <span className="text-[10px] font-bold">&lt;</span>
              <span className="text-[10px] font-bold">&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
