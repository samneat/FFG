import React, { useRef, useEffect } from 'react';
import { gsap } from '../utils/gsapConfig';

export default function TwoEngines() {
  const containerRef = useRef(null);
  const leftCardRef = useRef(null);
  const middleCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftCardRef.current, {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      });
      
      gsap.from(middleCardRef.current, {
        y: 48,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      });

      gsap.from(rightCardRef.current, {
        y: 48,
        opacity: 0,
        duration: 0.9,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-24 lg:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl lg:text-[40px] text-[var(--color-ffg-navy)] mb-16 lg:mb-20 text-center">
          Three Engines That Scale Trust Into Capital
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Engine A: Relational Fundraising */}
          <div ref={leftCardRef} className="bg-[var(--color-ffg-navy)] rounded-3xl p-10 lg:p-14 flex flex-col relative overflow-hidden group">
            {/* Visual Abstract bg */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full text-white">
                <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="30" cy="50" r="15" strokeWidth="2" />
                <circle cx="70" cy="50" r="15" strokeWidth="2" />
                <path d="M45 50 L55 50" strokeWidth="2" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--color-ffg-green)] mb-6">ENGINE A</span>
              <h3 className="font-heading font-semibold text-2xl lg:text-[28px] text-white mb-8">
                Relational Fundraising
              </h3>
              
              <ul className="space-y-4 font-body text-[15px] text-white/80 mt-auto">
                <li className="flex gap-3"><span className="text-[var(--color-ffg-green)]">•</span> Companies, foundations & philanthropists</li>
                <li className="flex gap-3"><span className="text-[var(--color-ffg-green)]">•</span> High-ticket multi-year pledges</li>
                <li className="flex gap-3"><span className="text-[var(--color-ffg-green)]">•</span> Partnership design & donor stewardship</li>
                <li className="flex gap-3"><span className="text-[var(--color-ffg-green)]">•</span> Corporate ESG/CSRD alignment</li>
              </ul>
            </div>
          </div>

          {/* Engine B: Digital Fundraising */}
          <div ref={middleCardRef} className="bg-[var(--color-ffg-bg)] rounded-3xl p-10 lg:p-14 flex flex-col relative overflow-hidden group border border-[var(--color-ffg-border)]">
            {/* Visual Abstract bg */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full text-[var(--color-ffg-navy)]">
                <circle cx="20" cy="20" r="8" strokeWidth="2" />
                <circle cx="80" cy="20" r="8" strokeWidth="2" />
                <circle cx="50" cy="80" r="12" strokeWidth="2" />
                <path d="M25 25 L45 70" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M75 25 L55 70" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--color-ffg-blue)] mb-6">ENGINE B</span>
              <h3 className="font-heading font-semibold text-2xl lg:text-[28px] text-[var(--color-ffg-navy)] mb-8">
                Digital Fundraising
              </h3>
              
              <ul className="space-y-4 font-body text-[15px] text-[var(--color-ffg-navy)]/80 mt-auto">
                <li className="flex gap-3"><span className="text-[var(--color-ffg-blue)]">•</span> Personal attribution links per fundraiser</li>
                <li className="flex gap-3"><span className="text-[var(--color-ffg-blue)]">•</span> Influencers & institutions as multipliers</li>
                <li className="flex gap-3"><span className="text-[var(--color-ffg-blue)]">•</span> Social, YouTube, podcasts, newsletters</li>
                <li className="flex gap-3"><span className="text-[var(--color-ffg-blue)]">•</span> Scalable community-driven mobilisation</li>
              </ul>
            </div>
          </div>

          {/* Engine C: Relational Fundraising */}
          <div ref={rightCardRef} className="bg-[var(--color-ffg-navy)] rounded-3xl p-10 lg:p-14 flex flex-col relative overflow-hidden group">
            {/* Visual Abstract bg */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full text-white">
                <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="30" cy="50" r="15" strokeWidth="2" />
                <circle cx="70" cy="50" r="15" strokeWidth="2" />
                <path d="M45 50 L55 50" strokeWidth="2" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--color-ffg-green)] mb-6">ENGINE C</span>
              <h3 className="font-heading font-semibold text-2xl lg:text-[28px] text-white mb-8">
                Relational Fundraising
              </h3>
              
              <ul className="space-y-4 font-body text-[15px] text-white/80 mt-auto">
                <li className="flex gap-3"><span className="text-[var(--color-ffg-green)]">•</span> Companies, foundations & philanthropists</li>
                <li className="flex gap-3"><span className="text-[var(--color-ffg-green)]">•</span> High-ticket multi-year pledges</li>
                <li className="flex gap-3"><span className="text-[var(--color-ffg-green)]">•</span> Partnership design & donor stewardship</li>
                <li className="flex gap-3"><span className="text-[var(--color-ffg-green)]">•</span> Corporate ESG/CSRD alignment</li>
              </ul>
            </div>
          </div>

        </div>

        <p className="font-mono text-[13px] text-[var(--color-ffg-muted)] text-center mt-12">
          Direct platform donations also available from launch.
        </p>
      </div>
    </section>
  );
}
