import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navContainerClasses = `fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 rounded-full px-6 py-3 flex items-center justify-between ${
    scrolled
      ? 'bg-[var(--color-ffg-bg)]/75 backdrop-blur-2xl border border-[var(--color-ffg-navy)]/10 text-[var(--color-ffg-navy)] shadow-sm'
      : 'bg-transparent border border-transparent text-white'
  }`;

  return (
    <>
      <nav className={navContainerClasses}>
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 4" />
            <path d="M24 35C24 35 15 26 15 19C15 14.5817 18.5817 11 23 11C25.467 11 27.6748 12.1158 29.1465 13.8447C30.4079 11.9678 32.5593 11 35 11C39.4183 11 43 14.5817 43 19C43 26 34 35 34 35L24 45L14 35Z" fill="var(--color-ffg-green)" />
            <circle cx="12" cy="19" r="2.5" fill="currentColor" />
            <circle cx="36" cy="19" r="2.5" fill="currentColor" />
            <circle cx="24" cy="10" r="2.5" fill="currentColor" />
            <circle cx="24" cy="45" r="2.5" fill="currentColor" />
            <path d="M12 19L24 10L36 19L24 45Z" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
          <span className="font-heading font-semibold text-lg tracking-tight hidden sm:block">
            Fundraisers for Good
          </span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-8 font-body text-sm font-medium">
          <a href="#how" className="hover:-translate-y-[1px] hover:text-[var(--color-ffg-green)] transition-all">How It Works</a>
          <a href="#model" className="hover:-translate-y-[1px] hover:text-[var(--color-ffg-green)] transition-all">The Model</a>
          <a href="#team" className="hover:-translate-y-[1px] hover:text-[var(--color-ffg-green)] transition-all">Team</a>
          <a href="#investors" className="hover:-translate-y-[1px] hover:text-[var(--color-ffg-green)] transition-all">For Investors</a>
        </div>

        {/* DESKTOP CTAS */}
        <div className="hidden lg:flex items-center gap-3">
          {scrolled ? (
            <button className="h-10 px-5 text-sm font-heading font-semibold rounded-full bg-[var(--color-ffg-green)] text-white hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
              Get Started
            </button>
          ) : (
            <>
              <button className="h-10 px-5 text-sm font-heading font-semibold rounded-full bg-[var(--color-ffg-green)] text-white hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                Join the Network
              </button>
              <button className="h-10 px-5 text-sm font-heading font-semibold rounded-full border border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                Fund a Cause
              </button>
              <button className="h-10 px-5 text-sm font-heading font-semibold rounded-full border border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                Get Validated
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--color-ffg-navy)] flex flex-col items-center justify-center p-6 lg:hidden">
          <div className="flex flex-col items-center gap-8 text-white font-heading text-xl">
            <a href="#how" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#model" onClick={() => setMobileMenuOpen(false)}>The Model</a>
            <a href="#team" onClick={() => setMobileMenuOpen(false)}>Team</a>
            <a href="#investors" onClick={() => setMobileMenuOpen(false)}>For Investors</a>
          </div>
          <div className="flex flex-col gap-4 mt-12 w-full max-w-xs">
            <button className="w-full h-14 rounded-full bg-[var(--color-ffg-green)] text-white font-heading font-semibold text-lg">
              Join the Network
            </button>
            <button className="w-full h-14 rounded-full border border-white/30 text-white font-heading font-semibold text-lg">
              Fund a Cause
            </button>
            <button className="w-full h-14 rounded-full border border-white/30 text-white font-heading font-semibold text-lg">
              Get Validated
            </button>
          </div>
        </div>
      )}
    </>
  );
}
