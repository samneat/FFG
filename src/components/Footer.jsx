import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-ffg-navy)] pt-20 pb-8 px-6 lg:px-12 rounded-t-[40px] text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Col 1 */}
          <div className="flex flex-col gap-6">
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
              <span className="font-heading font-semibold text-lg tracking-tight">
                Fundraisers for Good
              </span>
            </div>
            <p className="font-body text-[14px] text-white/50 max-w-[200px]">
              The Trust Platform for Global Impact Funding.
            </p>
            <p className="font-mono text-[11px] text-white/35 mt-auto">
              Fundraisers for Good Limited<br />Registered in Ireland
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-[15px] mb-2 tracking-wide">Platform</h4>
            {['How It Works', 'The 85/10/5 Model', 'For Fundraisers', 'For Donors', 'For Beneficiaries'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="font-body text-[14px] text-white/70 hover:text-[var(--color-ffg-green)] transition-colors">{link}</a>
            ))}
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-[15px] mb-2 tracking-wide">Company</h4>
            {['Team', 'Governance', 'Investors', 'Contact', 'Privacy Policy'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="font-body text-[14px] text-white/70 hover:text-[var(--color-ffg-green)] transition-colors">{link}</a>
            ))}
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-4">
             <h4 className="font-heading font-semibold text-[15px] mb-2 tracking-wide">Region</h4>
             <select className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 font-mono text-xs focus:outline-none focus:border-[var(--color-ffg-green)] w-fit cursor-pointer">
              <option value="EN">EN — English</option>
              <option value="PT">PT — Português</option>
              <option value="ES">ES — Español</option>
              <option value="DE">DE — Deutsch</option>
              <option value="FR">FR — Français</option>
             </select>

             <div className="flex items-center gap-4 mt-8">
               <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[var(--color-ffg-green)] flex items-center justify-center cursor-pointer transition-colors text-white/70 hover:text-white font-heading font-bold text-sm">
                 in
               </a>
               <a href="https://x.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[var(--color-ffg-green)] flex items-center justify-center cursor-pointer transition-colors text-white/70 hover:text-white font-heading font-bold text-sm">
                 x
               </a>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <p className="font-body text-[13px] text-white/40">
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
