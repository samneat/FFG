import React, { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';

export default function StructuralGap() {
  const containerRef = useRef(null);
  const statRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in left panel
      gsap.from('.gap-left-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      });
      
      // Animate right items
      gsap.from(itemsRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%'
        }
      });

      // Stat count up
      ScrollTrigger.create({
        trigger: statRef.current,
        start: 'top 60%',
        onEnter: () => animateStat()
      });
      
      // Shattering clip-path entrance for the stat
      gsap.fromTo(statRef.current, 
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.5, ease: 'power4.inOut', scrollTrigger: { trigger: statRef.current, start: 'top 65%' } }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [statText, setStatText] = useState('0%');

  const animateStat = () => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setStatText(`${current}%`);
      if (current >= 6) {
        clearInterval(interval);
        setStatText('4–6%');
      }
    }, 250);
  };

  return (
    <section ref={containerRef} className="w-full bg-[var(--color-ffg-bg)] py-24 lg:py-32 border-t border-[var(--color-ffg-border)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Panel - The Stat */}
        <div className="flex flex-col gap-left-reveal">
          <div className="relative group overflow-hidden">
            <h2 ref={statRef} className="text-8xl lg:text-[160px] leading-none mb-6 text-[var(--color-ffg-navy)] transition-colors duration-500 font-display">
              {statText}
            </h2>
          </div>
          <p className="font-body text-[16px] text-[var(--color-ffg-navy)] font-semibold mb-1">
            of GDP — the third sector's economic footprint
          </p>
          <p className="font-body italic text-[15px] text-[var(--color-ffg-muted)]">
            Larger than agriculture or automotive — yet without modern fundraising infrastructure.
          </p>
        </div>

        {/* Right Panel - Three Failures */}
        <div className="flex flex-col gap-8 lg:gap-10">
          {[
            { title: "Chronic Underfunding", desc: "Scientific and social breakthroughs stall waiting for sporadic grants." },
            { title: "Fragmented Systems", desc: "Charities rely on disjointed, unverified platforms with hidden fees." },
            { title: "No Professional Path", desc: "Fundraisers lack institutional-grade tools to scale their impact safely." }
          ].map((item, idx) => (
            <div 
              key={idx} 
              ref={el => itemsRef.current[idx] = el}
              className="flex items-start gap-6 border-b border-[var(--color-ffg-navy)]/10 pb-8 last:border-0 last:pb-0"
            >
              <div className="w-[2px] h-8 bg-[var(--color-ffg-green)] mt-1 shrink-0" />
              <div>
                <h3 className="font-heading font-semibold text-xl text-[var(--color-ffg-navy)] mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-[14px] text-[var(--color-ffg-muted)]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
