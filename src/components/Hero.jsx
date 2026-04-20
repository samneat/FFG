import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapConfig';
import { ChevronDown } from 'lucide-react';
import heroVideo from '../assets/hero_section_video.webm';

export default function Hero() {
  const textContainerRef = useRef(null);
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowIndicator(false);
      else setShowIndicator(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial entrance animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-text-line', {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1
      });
      
      gsap.from('.hero-cta', {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.4
      });
    }, textContainerRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <section id="hero" className="hero-section-marker relative w-full h-[100dvh] overflow-hidden text-[#FDFDFD] pt-24 bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={heroVideo} type="video/webm" />
      </video>

      {/* Radial Gradient Overlay removed for light background */}

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24 lg:pb-32 pointer-events-none">
        
        <div ref={textContainerRef} className="max-w-2xl">
          <p className="hero-text-line font-heading text-base md:text-lg tracking-[0.15em] text-[var(--color-ffg-green)] uppercase mb-4 font-semibold inline-block">
            The Trust Platform for Global
          </p>
          
          <h1 className="hero-text-line text-6xl md:text-7xl lg:text-[104px] leading-[0.9] mb-6">
            <span className="font-display italic block text-[var(--color-ffg-blue)]">Impact</span>
            <span className="font-heading font-bold mt-2 block">Funding.</span>
          </h1>
          
          <p className="hero-text-line font-body text-[17px] text-[var(--color-ffg-blue)] max-w-[520px] mb-10 leading-relaxed">
            We enable fundraisers to mobilise private capital for good — through a platform where trust is designed in, not promised.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
            <button className="hero-cta h-12 px-8 flex justify-center items-center text-sm font-heading font-semibold rounded-full bg-[var(--color-ffg-green)] text-white hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
              Join the Network
            </button>
            <button className="hero-cta h-12 px-8 flex justify-center items-center text-sm font-heading font-semibold rounded-full border border-[var(--color-ffg-blue)] text-[var(--color-ffg-blue)] hover:bg-[var(--color-ffg-blue)]/10 hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
              Fund a Cause
            </button>
            <button className="hero-cta h-12 px-8 flex justify-center items-center text-sm font-heading font-semibold rounded-full border border-[var(--color-ffg-blue)] text-[var(--color-ffg-blue)] hover:bg-[var(--color-ffg-blue)]/10 hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
              Get Validated
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 pointer-events-none ${showIndicator ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-mono text-xs tracking-widest text-[var(--color-ffg-navy)]/50 uppercase">Scroll to explore</span>
        <ChevronDown size={16} className="text-[var(--color-ffg-navy)]/50 animate-bounce" />
      </div>
    </section>
  );
}
