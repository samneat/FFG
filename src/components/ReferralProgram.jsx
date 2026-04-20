import React, { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function ReferralProgram() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef);

  return (
    <section id="referral-program" ref={sectionRef} className="w-full bg-[#F3F5F9] py-16 lg:py-24 px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="leading-tight mb-6">
            <span className="block font-heading font-bold text-3xl lg:text-[40px] text-[#12245B]">
              Network Growth Incentive
            </span>
            <span className="block font-display italic text-4xl lg:text-[52px] text-[var(--color-ffg-green)] py-1">
              The Referral Layer.
            </span>
          </h2>
          <p className="font-body text-[16px] lg:text-[18px] text-[#12245B]/80 max-w-2xl mx-auto">
            Fundraisers can introduce new fundraisers and receive a share of the funding they generate <strong className="font-semibold">without affecting the beneficiary revenue.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Stats & Features */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-ffg-border)] transition-transform hover:-translate-y-1 duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-ffg-green)]/10 flex items-center justify-center text-[var(--color-ffg-green)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#12245B]">1-Level Only</h3>
              </div>
              <p className="font-body text-sm text-[#12245B]/70">
                Simple, transparent, and direct. No complex multi-level marketing structures.
              </p>
            </div>

            <div className="bg-[#12245B] p-8 rounded-3xl shadow-md text-white transition-transform hover:-translate-y-1 duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-ffg-green)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-white">+2% From Platform Share</h3>
              </div>
              <p className="font-body text-sm text-white/80">
                Fundraisers earn a bonus directly from the platform's cut, ensuring the core 85% to beneficiaries is never touched.
              </p>
            </div>
          </div>

          {/* Right Column: The "Super-Fundraiser" Concept */}
          <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-xl border-t-4 border-[var(--color-ffg-blue)] relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            {/* Abstract Graphic */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[var(--color-ffg-blue)]/5 rounded-full blur-2xl group-hover:bg-[var(--color-ffg-green)]/10 transition-colors duration-700"></div>

            <h3 className="font-heading font-bold text-2xl lg:text-3xl text-[#12245B] mb-6">
              Become a <span className="text-[var(--color-ffg-blue)]">"Super-Fundraiser"</span>
            </h3>

            <p className="font-body text-[15px] text-[#12245B]/70 mb-8">
              This creates a powerful incentive to grow global fundraising networks. Revenue grows not only with your audience, but with network expansion.
            </p>

            <ul className="space-y-5 font-body text-[15px] text-[#12245B]">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-ffg-green)]/20 text-[var(--color-ffg-green)] flex items-center justify-center font-bold text-xs mt-0.5">1</span>
                <span>Earn <strong className="font-semibold text-[#12245B]">5%</strong> on all donations you generate directly.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-ffg-blue)]/20 text-[var(--color-ffg-blue)] flex items-center justify-center font-bold text-xs mt-0.5">2</span>
                <span>Additional upside through your referral network.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#12245B]/10 text-[#12245B] flex items-center justify-center font-bold text-xs mt-0.5">3</span>
                <span>Multiply your impact exponentially.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
