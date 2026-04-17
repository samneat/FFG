import React, { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ShieldAlert, FileSearch, Fingerprint, Activity } from 'lucide-react';
import bgImage from '../assets/Camp.jpg';

export default function GovernancePillars() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, { start: 'top 80%', stagger: 0.1 });

  const pillars = [
    { icon: ShieldAlert, title: "Independent Advisory Board", desc: "Reputational safeguarding, validation criteria, strategic guidance." },
    { icon: FileSearch, title: "Statutory Auditor", desc: "Annual external financial reviews for full accountability." },
    { icon: Fingerprint, title: "DLT-Ready Traceability", desc: "Immutable fund trails for end-to-end auditability." },
    { icon: Activity, title: "Beneficiary Review Protocol", desc: "Tiered validation with anti-fraud and escalation protocols." }
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-0"></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="leading-tight">
            <span className="block font-heading font-semibold text-3xl lg:text-[32px] text-white drop-shadow-md mb-2">
              FFG is not just a payment gateway —
            </span>
            <span className="block font-display italic text-4xl lg:text-[40px] text-[var(--color-ffg-green)] drop-shadow-md">
              it is the curator of credible impact.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="bg-[var(--color-ffg-navy)] rounded-[16px] p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <pillar.icon size={24} className="text-white mb-6" strokeWidth={1.5} />
              <h3 className="font-heading font-semibold text-lg text-white mb-3">
                {pillar.title}
              </h3>
              <p className="font-body text-[14px] text-white/70 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
