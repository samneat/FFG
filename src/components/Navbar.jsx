import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ffgLogo from '../assets/ffg-logo-full.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navContainerClasses = `fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 rounded-full px-6 py-3 flex items-center justify-between bg-[var(--color-ffg-bg)]/75 backdrop-blur-2xl border border-[var(--color-ffg-navy)]/10 text-[var(--color-ffg-navy)] shadow-sm`;

  return (
    <>
      <nav className={navContainerClasses}>
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src={ffgLogo} alt="Fundraisers for Good" className="h-16 md:h-20 w-auto" />
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-8 font-body text-base font-medium">
          <a href="#how" className="hover:-translate-y-[1px] hover:text-[var(--color-ffg-green)] transition-all">How It Works</a>
          <a href="#model" className="hover:-translate-y-[1px] hover:text-[var(--color-ffg-green)] transition-all">The Model</a>
          <a href="#team" className="hover:-translate-y-[1px] hover:text-[var(--color-ffg-green)] transition-all">Team</a>
          <a href="#investors" className="hover:-translate-y-[1px] hover:text-[var(--color-ffg-green)] transition-all">For Investors</a>
        </div>

        {/* DESKTOP CTAS */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="h-11 px-6 text-base font-heading font-semibold rounded-full bg-[var(--color-ffg-green)] text-white hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
            Join the Network
          </button>
          <button className="h-11 px-6 text-base font-heading font-semibold rounded-full border border-[var(--color-ffg-navy)]/30 text-[var(--color-ffg-navy)] hover:bg-[var(--color-ffg-navy)]/5 hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
            Fund a Cause
          </button>
          <button className="h-11 px-6 text-base font-heading font-semibold rounded-full border border-[var(--color-ffg-navy)]/30 text-[var(--color-ffg-navy)] hover:bg-[var(--color-ffg-navy)]/5 hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
            Get Validated
          </button>
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
