import React, { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function ThreePillars() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, { start: 'top 75%' });

  return (
    <section ref={sectionRef} className="w-full bg-[var(--color-ffg-bg)] py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="leading-tight">
            <span className="block font-heading font-bold text-4xl lg:text-[48px] text-[var(--color-ffg-navy)] mb-2">
              Trust Is Designed,
            </span>
            <span className="block font-display italic text-5xl lg:text-[64px] text-[var(--color-ffg-green)]">
              Not Promised.
            </span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card A: Credibility */}
          <div className="group relative bg-white rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300 ease-out flex flex-col items-start border-t-4 border-[var(--color-ffg-navy)] hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-[var(--color-ffg-bg)] flex items-center justify-center text-[var(--color-ffg-navy)] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className="font-heading font-bold text-2xl text-[var(--color-ffg-navy)] mb-3">Credibility</h3>
            <p className="font-body text-sm text-[var(--color-ffg-muted)]">
              Rigorous external validation and anti-fraud protocols at every layer.
            </p>
            
            <div className="overflow-hidden max-h-0 group-hover:max-h-[400px] transition-[max-height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-full">
              <div className="pt-8 flex flex-col gap-4 border-t border-[var(--color-ffg-border)] mt-6">
                <ul className="space-y-3 font-body text-sm text-[var(--color-ffg-navy)]">
                  <li>• Independent Advisory Board</li>
                  <li>• Anti-fraud & AML controls</li>
                  <li>• KYC/KYB onboarding</li>
                  <li>• Statutory Auditor review</li>
                </ul>
                <div className="mt-4 flex items-center gap-2 bg-[var(--color-ffg-forest)]/10 text-[var(--color-ffg-forest)] px-3 py-2 rounded-lg w-fit group-hover:animate-[pulse-verified_0.5s_ease-out]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Transparency (Inverted) */}
          <div className="group relative bg-[var(--color-ffg-navy)] rounded-2xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out flex flex-col items-start hover:-translate-y-1 transform scale-[1.02] lg:scale-105 z-10">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-ffg-green)] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                <line x1="12" y1="22" x2="12" y2="12"/>
                <line x1="22" y1="8.5" x2="12" y2="12"/>
                <line x1="2" y1="8.5" x2="12" y2="12"/>
              </svg>
            </div>
            <h3 className="font-heading font-bold text-2xl text-white mb-3">Transparency</h3>
            <p className="font-body text-sm text-white/70">
              The 85/10/5 split is visible on every transaction, backed by immutable records.
            </p>
            
            <div className="overflow-hidden max-h-0 group-hover:max-h-[400px] transition-[max-height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-full">
              <div className="pt-8 flex flex-col gap-4 border-t border-white/10 mt-6">
                <ul className="space-y-3 font-body text-sm text-white">
                  <li>• DLT-ready architecture</li>
                  <li>• Real-time fund flow dashboards</li>
                  <li>• CSRD/ESG reporting layers</li>
                  <li>• Immutable audit trails</li>
                </ul>
                <div className="mt-4 p-4 glass rounded-xl relative overflow-hidden">
                  <div className="flex justify-between text-[10px] font-mono mb-2 text-white/80">
                    <span>Beneficiary</span>
                    <span>Platform</span>
                    <span>Fundraiser</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden flex">
                    <div className="h-full bg-[var(--color-ffg-green)] w-0 group-hover:w-[85%] transition-all duration-1000 delay-100"></div>
                    <div className="h-full bg-white w-0 group-hover:w-[10%] transition-all duration-1000 delay-300"></div>
                    <div className="h-full bg-[var(--color-ffg-blue)] w-0 group-hover:w-[5%] transition-all duration-1000 delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card C: Communication */}
          <div className="group relative bg-white rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300 ease-out flex flex-col items-start border-t-4 border-[var(--color-ffg-navy)] hover:-translate-y-1">
             <div className="w-12 h-12 rounded-full bg-[var(--color-ffg-bg)] flex items-center justify-center text-[var(--color-ffg-navy)] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3 className="font-heading font-bold text-2xl text-[var(--color-ffg-navy)] mb-3">Communication</h3>
            <p className="font-body text-sm text-[var(--color-ffg-muted)]">
              Professional storytelling kits that equip fundraisers to mobilise networks.
            </p>
            
            <div className="overflow-hidden max-h-0 group-hover:max-h-[400px] transition-[max-height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-full">
              <div className="pt-8 flex flex-col gap-4 border-t border-[var(--color-ffg-border)] mt-6">
                <ul className="space-y-3 font-body text-sm text-[var(--color-ffg-navy)]">
                  <li>• Attribution links per fundraiser</li>
                  <li>• Professional storytelling tools</li>
                  <li>• Campaign templates</li>
                  <li>• Community amplification</li>
                </ul>
                <div className="mt-4 relative h-16 w-full flex items-center justify-center">
                  <div className="absolute w-24 h-12 bg-[var(--color-ffg-bg)] border border-[var(--color-ffg-border)] rounded-md shadow-sm group-hover:-translate-x-6 group-hover:-rotate-6 transition-all duration-500 z-10 flex items-center justify-center text-[8px] font-mono text-neutral-400">Social Pitch</div>
                  <div className="absolute w-24 h-12 bg-white border border-[var(--color-ffg-border)] rounded-md shadow-md z-20 flex items-center justify-center text-[8px] font-mono text-[var(--color-ffg-navy)]">Press Kit</div>
                  <div className="absolute w-24 h-12 bg-[var(--color-ffg-bg)] border border-[var(--color-ffg-border)] rounded-md shadow-sm group-hover:translate-x-6 group-hover:rotate-6 transition-all duration-500 z-10 flex items-center justify-center text-[8px] font-mono text-neutral-400">Email Draft</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
