import React, { useRef, useEffect } from 'react';
import { gsap } from '../utils/gsapConfig';

export default function MarketSizing() {
  const containerRef = useRef(null);
  const dataRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate concentric rings
      gsap.to('.market-ring', {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%'
        }
      });

      // Animate text layers on rings
      gsap.fromTo('.market-label', 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3, delay: 0.5,
          scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
        }
      );

      // Animate data blocks
      gsap.from(dataRef.current, {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { label: "Private philanthropic funding in Europe", value: "€80–100B / year", highlight: false },
    { label: "Digitally intermediated fundraising", value: "€8–10B / year", highlight: false },
    { label: "At 10% platform fee", value: "~€19M / year", highlight: true },
    { label: "Projected platform revenue", value: "€75–80M", highlight: true }
  ];

  return (
    <section ref={containerRef} className="w-full bg-white py-24 lg:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col xl:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left - Visual Rings */}
        <div className="w-full max-w-[500px] aspect-square relative flex items-center justify-center -ml-4 lg:-ml-0 shrink-0">
          <svg className="w-full h-full absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            {/* TAM */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-ffg-border)" strokeWidth="1" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-ffg-navy)" strokeWidth="1" strokeDasharray="300" strokeDashoffset="300" className="market-ring opacity-0" />
            
            {/* SAM */}
            <circle cx="50" cy="50" r="30" fill="var(--color-ffg-forest)" fillOpacity="0.2" stroke="none" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="var(--color-ffg-green)" strokeWidth="1.5" strokeDasharray="200" strokeDashoffset="200" className="market-ring opacity-0" />
            
            {/* SOM */}
            <circle cx="50" cy="50" r="15" fill="var(--color-ffg-green)" stroke="var(--color-ffg-green)" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" className="market-ring opacity-0" />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center font-display text-[var(--color-ffg-navy)] italic opacity-0 market-label">
            <span className="text-sm absolute top-[10%] drop-shadow-sm">TAM €80–100B/yr</span>
            <span className="text-base absolute top-[28%] text-[var(--color-ffg-green)] font-display italic font-bold drop-shadow-md">SAM €8–10B/yr</span>
            <span className="text-lg absolute top-[47%] font-bold text-[var(--color-ffg-navy)]">SOM</span>
            <span className="text-xs absolute top-[55%] font-medium text-[var(--color-ffg-navy)]">€50M–€500M</span>
          </div>
        </div>

        {/* Right - Data Blocks */}
        <div className="w-full flex justify-center xl:justify-start">
          <div className="flex flex-col gap-8 w-full max-w-lg">
            {metrics.map((item, idx) => (
              <div 
                key={idx} 
                ref={el => dataRef.current[idx] = el}
                className="flex flex-col border-b border-[var(--color-ffg-border)] pb-6 last:border-0"
              >
                <div className={`font-heading font-bold text-3xl lg:text-[40px] leading-tight mb-2 ${item.highlight ? 'text-[var(--color-ffg-green)]' : 'text-[var(--color-ffg-navy)]'}`}>
                  {item.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-ffg-muted)]">
                  {idx === 0 ? 'TAM' : idx === 1 ? 'SAM' : idx === 2 ? 'YR 10 REVENUE' : '10-YR CUMULATIVE'} — <span className="text-[var(--color-ffg-navy)] opacity-80 normal-case tracking-normal">{item.label}</span>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-[var(--color-ffg-green)]/30">
              <span className="font-mono text-[12px] text-[var(--color-ffg-muted)]">
                Global causes enabled from launch — upside not modelled.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
