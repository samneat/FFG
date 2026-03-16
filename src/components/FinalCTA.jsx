import React, { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Users, HeartHandshake, Building2, ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, { start: 'top 75%' });

  return (
    <section ref={sectionRef} className="w-full bg-[var(--color-ffg-navy)] py-24 lg:py-32 px-6 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_top,rgba(43,89,162,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h2 className="font-display italic text-[56px] lg:text-[80px] xl:text-[96px] text-white leading-none mb-6">
          Join the Movement.
        </h2>
        <p className="font-body text-[18px] text-white/65 max-w-[560px] mx-auto mb-16 lg:mb-24">
          Whether you raise, give, or receive — there is a place for you in the FFG network.
        </p>

        {/* 3 Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20 text-left">
          
          <div className="glass rounded-[24px] p-8 lg:p-10 flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
            <Users size={32} className="text-white mb-6" strokeWidth={1.5} />
            <h3 className="font-heading font-semibold text-[22px] text-white mb-3">
              I want to raise funds for a cause I believe in
            </h3>
            <p className="font-body text-[15px] text-white/70 mb-10">
              Access professional tools to mobilise your network and track your impact.
            </p>
            <button className="mt-auto w-full h-12 flex justify-center items-center text-sm font-heading font-semibold rounded-full bg-[var(--color-ffg-green)] text-white hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
              Join the Network
            </button>
          </div>

          <div className="glass rounded-[24px] p-8 lg:p-10 flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
            <HeartHandshake size={32} className="text-white mb-6" strokeWidth={1.5} />
            <h3 className="font-heading font-semibold text-[22px] text-white mb-3">
              I want to give with confidence and full transparency
            </h3>
            <p className="font-body text-[15px] text-white/70 mb-10">
              Direct your capital to validated projects with institutional-grade reporting.
            </p>
            <button className="mt-auto w-full h-12 flex justify-center items-center text-sm font-heading font-semibold rounded-full bg-white text-[var(--color-ffg-navy)] hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
              Fund a Cause
            </button>
          </div>

          <div className="glass rounded-[24px] p-8 lg:p-10 flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
            <Building2 size={32} className="text-white mb-6" strokeWidth={1.5} />
            <h3 className="font-heading font-semibold text-[22px] text-white mb-3">
              My organisation needs professional fundraising support
            </h3>
            <p className="font-body text-[15px] text-white/70 mb-10">
              Transform your project's funding pipeline through our verified network.
            </p>
            <button className="mt-auto w-full h-12 flex justify-center items-center text-sm font-heading font-semibold rounded-full bg-white text-[var(--color-ffg-navy)] hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
              Get Validated
            </button>
          </div>

        </div>

        {/* Email Capture & Investor Link */}
        <div className="flex flex-col items-center border-t border-white/10 pt-16">
          <label className="font-mono text-[13px] text-white/60 mb-4 uppercase tracking-widest">
            Get early access updates:
          </label>
          <form className="flex items-center gap-4 mb-12 w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-transparent border-b border-white/30 text-white pb-2 focus:outline-none focus:border-[var(--color-ffg-green)] transition-colors rounded-none placeholder:text-white/30 font-body text-base"
              required
            />
            <button type="submit" className="text-[var(--color-ffg-green)] hover:text-white transition-colors pb-2">
              <ArrowRight size={24} strokeWidth={1.5} />
            </button>
          </form>

          <a href="#investors" className="font-mono text-xs text-white/40 hover:text-[var(--color-ffg-green)] transition-colors tracking-widest uppercase">
            For Investors
          </a>
        </div>

      </div>
    </section>
  );
}
