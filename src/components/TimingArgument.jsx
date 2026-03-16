import React, { useRef, useEffect } from 'react';
import { gsap } from '../utils/gsapConfig';

export default function TimingArgument() {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      // Unpinned stacked layout for mobile/tablet
      const ctx = gsap.context(() => {
        gsap.from(panelsRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        });
      }, containerRef);
      return () => ctx.revert();
    }

    // Pinned scrubbing timeline for desktop
    const ctx = gsap.context(() => {
      // Start with first panel visible and subsequent ones hidden
      gsap.set(panelsRef.current.slice(1), { opacity: 0, visibility: 'hidden' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      });

      // Panel 1 -> Panel 2
      tl.to(panelsRef.current[0], { opacity: 0, scale: 0.95, duration: 1 })
        .set(panelsRef.current[1], { visibility: 'visible' })
        .fromTo(panelsRef.current[1], { opacity: 0, scale: 1.05, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, '<')
      // Panel 2 -> Panel 3
        .to(panelsRef.current[1], { opacity: 0, scale: 0.95, duration: 1 }, '+=0.5')
        .set(panelsRef.current[2], { visibility: 'visible' })
        .fromTo(panelsRef.current[2], { opacity: 0, scale: 1.05, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, '<');
        
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const panels = [
    {
      eyebrow: "THE NEED",
      eyebrowClass: "text-[var(--color-ffg-green)]",
      line1: "EU regulatory pressure forces companies to prove social impact —",
      line2: "creating unprecedented demand for verified giving channels.",
      line2Class: "text-white"
    },
    {
      eyebrow: "THE GAP",
      eyebrowClass: "text-[var(--color-ffg-muted)]",
      line1: "Digital fundraising penetration remains below 10% of philanthropy —",
      line2: "a massive adoption runway.",
      line2Class: "text-white"
    },
    {
      eyebrow: "THE MOMENT",
      eyebrowClass: "text-[var(--color-ffg-muted)]",
      line1: "No one has built the professional network layer for fundraisers.",
      line2: "This role is unserved. Globally.",
      line2Class: "text-[var(--color-ffg-green)]"
    }
  ];

  return (
    <section ref={containerRef} className="w-full bg-[var(--color-ffg-navy)] py-24 lg:py-0 lg:h-screen relative overflow-hidden flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 w-full lg:relative lg:h-full flex flex-col lg:block gap-16 lg:gap-0">
        {panels.map((panel, idx) => (
          <div 
            key={idx} 
            ref={el => panelsRef.current[idx] = el}
            className={`w-full flex-col justify-center lg:items-center lg:text-center lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-full flex items-start text-left`}
          >
            <span className={`font-mono text-xs lg:text-sm tracking-[0.2em] mb-6 font-bold ${panel.eyebrowClass}`}>
              {panel.eyebrow}
            </span>
            <p className="font-body text-xl lg:text-[24px] text-white/70 mb-2 max-w-2xl mx-auto">
              {panel.line1}
            </p>
            <p className={`font-display italic text-4xl lg:text-[56px] leading-tight max-w-3xl mx-auto ${panel.line2Class}`}>
              {panel.line2}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
