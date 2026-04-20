import React, { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Shield, FileCheck, Link2, Flag } from 'lucide-react';
import bgImage from '../assets/Boardroom.jpg';

export default function TeamGovernance() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, { start: 'top 80%', stagger: 0.1 });

  const team = [
    { name: "Rui Borralho", initials: "RB", role: "Chief Executive Officer", roleAbbr: "CEO", creds: "PhD Wildlife Management | 30+ yrs impact leadership", prev: "Former: Executive Director, BirdLife PT", badge: true },
    { name: "Miguel Bastos Araújo", initials: "MA", role: "Chief Strategy Officer", roleAbbr: "CSO", creds: "World-renowned scientist | Research Professor", prev: "Notable: Global credibility & institutional networks" },
    { name: "Raúl Coutinho Garrido", initials: "RG", role: "Chief Technology Officer", roleAbbr: "CTO", creds: "Digital platform expert | DLT & distributed systems", prev: "Former: Startup Exec EU/UK/ME" },
    { name: "Luís Costa", initials: "LC", role: "Co-Founder", roleAbbr: "Co-Founder", creds: "Biologist & Entrepreneur | CEO Nature Returns", prev: "Experience: 15+ yrs conservation NGOs" },
    { name: "Paul Huibers", initials: "PH", role: "Co-Founder", roleAbbr: "Co-Founder", creds: "Economist & Senior Executive", prev: "Experience: Decades as CEO/President, Governance & strategy" }
  ];

  return (
    <section id="team" ref={sectionRef} className="relative w-full py-24 lg:py-32 px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20 team-reveal">
          <h2 className="font-heading font-bold text-3xl lg:text-[40px] text-white drop-shadow-md mb-4">
            The Team That Will Make It Happen
          </h2>
          <p className="font-body text-[17px] text-white/80 max-w-2xl mx-auto">
            Founded by impact leaders, technologists, and scientists with a combined 80+ years of real-world experience.
          </p>
        </div>

        {/* Desktop Grid / Mobile horizontal scroll */}
        <div className="flex overflow-x-auto pb-8 lg:pb-0 lg:grid lg:grid-cols-5 gap-4 lg:gap-6 snap-x snap-mandatory team-reveal no-scrollbar">
          {team.map((member, idx) => (
            <div key={idx} className="min-w-[280px] lg:min-w-0 snap-center bg-[var(--color-ffg-navy)] rounded-[20px] p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center font-body font-medium text-[var(--color-ffg-navy)] text-2xl mb-5 group-hover:bg-[var(--color-ffg-green)] group-hover:text-white transition-colors duration-300">
                {member.initials}
              </div>
              
              <h3 className="font-heading font-semibold text-lg text-white mb-1">
                {member.name} — {member.roleAbbr}
              </h3>
              
              {member.badge ? (
                <span className="font-mono text-[10px] tracking-wider bg-[var(--color-ffg-green)] text-white px-2 py-0.5 rounded uppercase mb-4">
                  {member.role}
                </span>
              ) : (
                <span className="font-mono text-[10px] tracking-wider text-white/70 uppercase mb-4 border border-white/20 px-2 py-0.5 rounded">
                  {member.role}
                </span>
              )}
              
              <p className="font-body text-[13px] text-white/80 mb-2 leading-tight">
                {member.creds}
              </p>
              
              <p className="font-body text-[12px] text-white/50 italic mt-auto">
                {member.prev}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Signals Row */}
        <div className="mt-16 pt-8 border-t border-white/20 w-full overflow-x-auto no-scrollbar team-reveal">
          <div className="flex items-center justify-between min-w-[700px] lg:min-w-0">
            {[{icon: Shield, label: "Independent Advisory Board"}, 
              {icon: FileCheck, label: "Statutory Auditor"}, 
              {icon: Link2, label: "DLT-Ready Architecture"}, 
              {icon: Flag, label: "Registered in Ireland"}].map((signal, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-2 text-white/70 group">
                  <signal.icon size={16} className="group-hover:text-[var(--color-ffg-green)] transition-colors" />
                  <span className="font-mono text-xs tracking-wide">{signal.label}</span>
                </div>
                {idx < 3 && <div className="h-4 w-[1px] bg-white/20" />}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
