import React, { useRef, useEffect } from 'react';
import { gsap } from '../utils/gsapConfig';

import needBg from '../assets/Rubbish_colleting.jpg';
import gapBg from '../assets/Rubbish_boat.jpg';
import momentBg from '../assets/Cityscape.jpg';

export default function TimingArgument() {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  const bgsRef = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      // Unpinned stacked layout for mobile/tablet
      const ctx = gsap.context(() => {
        // Init backgrounds
        gsap.set(bgsRef.current.slice(1), { opacity: 0 });
        
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

        // Fading backgrounds when scrolling through panels on mobile
        panelsRef.current.forEach((panel, i) => {
          if (i === 0) return;
          gsap.to(bgsRef.current[i], {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: panel,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          });
          gsap.to(bgsRef.current[i - 1], {
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: panel,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          });
        });

      }, containerRef);
      return () => ctx.revert();
    }

    // Pinned scrubbing timeline for desktop
    const ctx = gsap.context(() => {
      // Start with first background visible and subsequent ones hidden
      gsap.set(bgsRef.current.slice(1), { opacity: 0 });
      gsap.set(panelsRef.current.slice(1), { opacity: 0, visibility: 'hidden' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      });

      // Panel 1 -> Panel 2
      tl.to(panelsRef.current[0], { opacity: 0, scale: 0.95, duration: 1 })
        .to(bgsRef.current[0], { opacity: 0, duration: 1 }, '<')
        .set(panelsRef.current[1], { visibility: 'visible' })
        .to(bgsRef.current[1], { opacity: 1, duration: 1 }, '<')
        .fromTo(panelsRef.current[1], { opacity: 0, scale: 1.05, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, '<')
      // Panel 2 -> Panel 3
        .to(panelsRef.current[1], { opacity: 0, scale: 0.95, duration: 1 }, '+=0.5')
        .to(bgsRef.current[1], { opacity: 0, duration: 1 }, '<')
        .set(panelsRef.current[2], { visibility: 'visible' })
        .to(bgsRef.current[2], { opacity: 1, duration: 1 }, '<')
        .fromTo(panelsRef.current[2], { opacity: 0, scale: 1.05, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, '<');
        
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const panels = [
    {
      eyebrow: "THE NEED",
      eyebrowClass: "text-[var(--color-ffg-green)] drop-shadow-md",
      line1: "EU regulatory pressure forces companies to prove social impact —",
      line2: "creating unprecedented demand for verified giving channels.",
      line2Class: "text-white drop-shadow-md",
      bgImage: needBg
    },
    {
      eyebrow: "THE GAP",
      eyebrowClass: "text-[var(--color-ffg-green)] drop-shadow-md",
      line1: "Digital fundraising penetration remains below 10% of philanthropy —",
      line2: "a massive adoption runway.",
      line2Class: "text-white drop-shadow-md",
      bgImage: gapBg
    },
    {
      eyebrow: "THE MOMENT",
      eyebrowClass: "text-[var(--color-ffg-green)] drop-shadow-md",
      line1: "No one has built the professional network layer for fundraisers.",
      line2: "This role is unserved. Globally.",
      line2Class: "text-[var(--color-ffg-green)] drop-shadow-md",
      bgImage: momentBg
    }
  ];

  return (
    <div className="w-full">
      <section ref={containerRef} className="w-full bg-[var(--color-ffg-navy)] py-24 lg:py-0 lg:h-screen relative overflow-hidden flex items-center justify-center">
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-0 w-full h-full z-0">
          {panels.map((panel, idx) => (
            <div
              key={`bg-${idx}`}
              ref={el => bgsRef.current[idx] = el}
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${panel.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            >
              {/* Same filter over the images as TwoEngines */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-0"></div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 w-full lg:relative lg:h-full flex flex-col lg:block gap-16 lg:gap-0 z-10">
          {panels.map((panel, idx) => (
            <div 
              key={idx} 
              ref={el => panelsRef.current[idx] = el}
              className={`w-full flex-col justify-center lg:items-center lg:text-center lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-full flex items-start text-left`}
            >
              <span className={`font-mono text-5xl lg:text-[64px] tracking-[0.2em] mb-6 lg:mb-10 font-bold leading-none ${panel.eyebrowClass}`}>
                {panel.eyebrow}
              </span>
              <p className="font-body text-xl lg:text-[24px] text-white/90 drop-shadow-sm font-medium mb-2 max-w-2xl mx-auto">
                {panel.line1}
              </p>
              <p className={`font-display italic text-4xl lg:text-[56px] leading-tight max-w-3xl mx-auto ${panel.line2Class}`}>
                {panel.line2}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
