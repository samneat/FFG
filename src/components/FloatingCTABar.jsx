import React, { useState, useEffect } from 'react';
import JoinNetworkModal from './JoinNetworkModal';

export default function FloatingCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Observe the Hero component 
    const heroEl = document.querySelector('.hero-section-marker');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If hero is NOT intersecting (scrolled past), show the bar
          setIsVisible(!entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 hidden lg:flex items-center gap-3 p-2 rounded-full glass ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}>
        <button
          onClick={() => setModalOpen(true)}
          className="h-10 px-5 text-sm font-heading font-semibold rounded-full bg-[var(--color-ffg-green)] text-white hover:scale-105 transition-transform duration-300"
        >
          Join the Network
        </button>
        <button className="h-10 px-5 text-sm font-heading font-semibold rounded-full border border-white/40 text-[var(--color-ffg-navy)] hover:bg-white/10 hover:scale-105 transition-all duration-300">
          Fund a Cause
        </button>
        <button className="h-10 px-5 text-sm font-heading font-semibold rounded-full border border-white/40 text-[var(--color-ffg-navy)] bg-white hover:bg-white/90 hover:scale-105 transition-all duration-300">
          Get Validated
        </button>
      </div>

      <JoinNetworkModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
