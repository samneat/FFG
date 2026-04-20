import React from 'react';
import ffgLogo from '../assets/ffg-logo-full.png';

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-ffg-navy)] pt-20 pb-8 px-6 lg:px-12 text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Col 1 */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src={ffgLogo} alt="Fundraisers for Good" className="h-20 w-auto" />
            </div>
            <p className="font-body text-[14px] text-white/70 max-w-[200px]">
              The Trust Platform for Global Impact Funding.
            </p>
            <p className="font-mono text-[11px] text-white/50 mt-auto">
              Fundraisers for Good Limited<br />Registered in Ireland
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-[15px] mb-2 tracking-wide">Platform</h4>
            {[
              { label: 'How It Works', href: '#three-engines' },
              { label: 'The 85/10/5 Model', href: '#model' }
            ].map(link => (
              <a key={link.label} href={link.href} className="font-body text-[14px] text-white/80 hover:text-[var(--color-ffg-green)] hover:opacity-100 transition-colors">{link.label}</a>
            ))}
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-[15px] mb-2 tracking-wide">Company</h4>
            {[
              { label: 'Team', href: '#team' },
              { label: 'Governance', href: '#trust-is-design' },
              { label: 'Investors', href: '#investors' },
              { label: 'Contact', href: '#contact' }
            ].map(link => (
              <a key={link.label} href={link.href} className="font-body text-[14px] text-white/80 hover:text-[var(--color-ffg-green)] hover:opacity-100 transition-colors">{link.label}</a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/20">
          <p className="font-body text-[13px] text-white/50">
            © {new Date().getFullYear()} Fundraisers for Good Ltd. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-ffg-green)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-ffg-green)]"></span>
            </div>
            <span className="font-mono text-[11px] text-[var(--color-ffg-green)] tracking-wider uppercase">
              System Operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
