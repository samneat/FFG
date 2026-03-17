import React, { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Check, X } from 'lucide-react';

export default function BeneficiaryTransform() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(45); // percentage
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
    <section ref={sectionRef} className="w-full bg-[var(--color-ffg-navy)] py-24 lg:py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-4">
          We turn world-class science into world-class funded projects.
        </h2>
        <p className="font-body text-[16px] text-[var(--color-ffg-green)]">
          The Azores Marine Conservation case study.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="max-w-[900px] mx-auto relative h-[600px] rounded-[24px] overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        {/* BEFORE PANEL (Bottom Layer) */}
        <div 
          className="absolute inset-0 w-full h-full bg-neutral-900 border border-white/10 flex flex-col justify-end p-8 lg:p-12 transform-gpu"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)`, willChange: 'clip-path' }}
        >
          {/* Background Image (Desaturated) */}
          <img 
            src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=2600"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col pointer-events-none sm:pl-8 pl-4 w-1/2 ml-auto">
            <div>
              <span className="inline-block font-mono text-xs tracking-widest text-[#FF5252] bg-[#FF5252]/10 border border-[#FF5252]/30 px-3 py-1 rounded-sm mb-4 uppercase">
                Without FFG
              </span>
            </div>
            <div className="font-mono text-4xl lg:text-5xl text-white mb-6 leading-tight">€2M<br/><span className="text-xl text-white/70">annual need</span></div>
            
            <ul className="space-y-3 font-body text-sm text-white/80">
              {['Zero fundraising staff', 'Volunteer-only outreach', 'No donor pipeline', 'Underfunded despite world-class science'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X size={16} className="text-[#FF5252] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AFTER PANEL (Top Layer, clipped) */}
        <div 
          className="absolute inset-0 w-full h-full bg-[var(--color-ffg-navy)] flex flex-col justify-end p-8 lg:p-12 border-r-[var(--color-ffg-green)] transform-gpu"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)`, willChange: 'clip-path' }}
        >
          {/* Background Image (Full Color + Green Overlay) */}
          <img 
            src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=2600"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-[var(--color-ffg-forest)]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ffg-navy)]/90 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col pointer-events-none sm:pr-8 pr-4 w-[45%]">
            <div>
              <span className="inline-block font-mono text-xs tracking-widest text-[var(--color-ffg-green)] bg-[var(--color-ffg-green)]/10 border border-[var(--color-ffg-green)]/30 px-3 py-1 rounded-sm mb-4 uppercase">
                With FFG
              </span>
            </div>
            <div className="font-mono text-4xl lg:text-5xl text-[var(--color-ffg-green)] mb-6 leading-tight">€450K<br/><span className="text-xl text-white">mobilised in 12 mo.</span></div>
            
            <ul className="space-y-3 font-body text-sm text-white">
              {['8 impact fundraisers assigned', 'Corporate ESG partner: 3-year pledge', 'Full transparency dashboard', 'Access to institutional capital'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={16} className="text-[var(--color-ffg-green)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SLIDER HANDLE */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--color-ffg-white)] rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--color-ffg-navy)] text-[var(--color-ffg-navy)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" className="opacity-0 w-0 h-0" />
            </svg>
            <div className="absolute flex justify-between w-6 text-[var(--color-ffg-navy)] opacity-60">
              <span className="text-[10px] font-bold">&lt;</span>
              <span className="text-[10px] font-bold">&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
