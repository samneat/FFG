import React, { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function MoneyFlow() {
  const sectionRef = useRef(null);
  const [amount, setAmount] = useState(1000);
  const [animatedAmount, setAnimatedAmount] = useState(1000);

  useScrollAnimation(sectionRef);

  useEffect(() => {
    // simple animated count for the slider value
    const dist = amount - animatedAmount;
    if (Math.abs(dist) < 1) return;
    
    const timeout = setTimeout(() => {
      setAnimatedAmount(prev => prev + dist * 0.2);
    }, 16);
    return () => clearTimeout(timeout);
  }, [amount, animatedAmount]);

  const displayAmount = Math.round(animatedAmount);
  const beneficiaryCut = Math.round(displayAmount * 0.85);
  const platformCut = Math.round(displayAmount * 0.10);
  const fundraiserCut = Math.round(displayAmount * 0.05);

  return (
    <section ref={sectionRef} className="w-full bg-[#FDFDFD] py-12 lg:py-16 px-6 overflow-hidden text-center relative">
      <div className="max-w-4xl mx-auto mb-6 relative z-10">
        <h2 className="leading-tight mb-2">
          <span className="block font-heading font-bold text-3xl lg:text-[40px] text-[#12245B]">
            Radical Transparency
          </span>
          <span className="block font-display italic text-4xl lg:text-[52px] text-[var(--color-ffg-green)] py-1">
            by Design.
          </span>
        </h2>
        <p className="font-body text-[15px] lg:text-[17px] text-[#12245B]/65 max-w-2xl mx-auto">
          Every euro's journey is visible. Every allocation is by design.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Dynamic Canvas / SVG Flow Area */}
        <div className="relative h-[320px] lg:h-[360px] w-full mt-6 mb-4 flex flex-col items-center">
          
          {/* Top Coin Incoming */}
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/5 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center font-display text-xl lg:text-2xl text-white mb-2 z-20 relative">
            €
          </div>
          
          {/* SVG Beams */}
          <svg className="absolute top-12 lg:top-16 left-0 w-full h-[180px] lg:h-[200px] pointer-events-none z-0" viewBox="0 0 1000 250" preserveAspectRatio="none">
            {/* Beneficiary Beam (85%) */}
            <path d="M500,0 C500,100 200,150 200,250" fill="none" stroke="rgba(76, 175, 80, 0.8)" strokeWidth={15 + (displayAmount / 10000) * 20} strokeDasharray="10 10" className="animate-[dash_1s_linear_infinite]" />
            <path d="M500,0 C500,100 200,150 200,250" fill="none" stroke="rgba(76, 175, 80, 0.3)" strokeWidth={30 + (displayAmount / 10000) * 40} style={{ filter: 'blur(8px)' }} />
            
            {/* Platform Beam (10%) */}
            <path d="M500,0 C500,100 500,150 500,250" fill="none" stroke="rgba(255, 255, 255, 0.8)" strokeWidth={4 + (displayAmount / 10000) * 5} strokeDasharray="10 10" className="animate-[dash_1.5s_linear_infinite]" />
            <path d="M500,0 C500,100 500,150 500,250" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth={10 + (displayAmount / 10000) * 10} style={{ filter: 'blur(6px)' }} />

            {/* Fundraiser Beam (5%) */}
            <path d="M500,0 C500,100 800,150 800,250" fill="none" stroke="rgba(43, 89, 162, 0.8)" strokeWidth={2 + (displayAmount / 10000) * 3} strokeDasharray="10 10" className="animate-[dash_2s_linear_infinite]" />
            <path d="M500,0 C500,100 800,150 800,250" fill="none" stroke="rgba(43, 89, 162, 0.4)" strokeWidth={6 + (displayAmount / 10000) * 6} style={{ filter: 'blur(4px)' }} />
          </svg>

          {/* Prism / Split Hub */}
          <div className="absolute top-[80px] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-white/50 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] z-20"></div>

          {/* Terminal Cards */}
          <div className="absolute bottom-0 w-full flex justify-between px-4 lg:px-12 items-end z-20">
            {/* Beneficiary */}
            <div className="bg-[#12245B] text-white w-[30%] lg:w-[28%] p-6 rounded-2xl flex flex-col items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-white mb-2">Beneficiary</span>
              <div className="font-display text-4xl lg:text-5xl text-white leading-none mb-1">€{beneficiaryCut.toLocaleString()}</div>
              <span className="font-mono text-[10px] text-white/80">85% Minimum Guarantee</span>
            </div>
            
            {/* Platform */}
            <div className="bg-[#12245B] text-white w-[26%] lg:w-[24%] p-5 rounded-2xl flex flex-col items-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white mb-2">FFG Platform</span>
              <div className="font-display text-3xl lg:text-4xl text-white leading-none mb-1">€{platformCut.toLocaleString()}</div>
              <span className="font-mono text-[10px] text-white/80">10% Operational Base</span>
            </div>

            {/* Fundraiser */}
            <div className="bg-[#12245B] text-white w-[30%] lg:w-[28%] p-6 rounded-2xl flex flex-col items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-white mb-2">Fundraiser</span>
              <div className="font-display text-3xl lg:text-4xl text-white leading-none mb-1">€{fundraiserCut.toLocaleString()}</div>
              <span className="font-mono text-[10px] text-white/80">0–5% Variable Incentive</span>
            </div>
          </div>
        </div>

        {/* Amount Slider */}
        <div className="max-w-lg mx-auto bg-[#12245B] p-6 rounded-[24px] mt-6 shadow-lg">
          <label className="block font-mono text-xs lg:text-sm text-white/80 mb-4 uppercase tracking-widest">
            Adjust donation amount:
          </label>
          <div className="font-display text-4xl lg:text-5xl text-white mb-6 transition-all">
            €{displayAmount.toLocaleString()}
          </div>
          <input 
            type="range" 
            min="100" 
            max="10000" 
            step="100" 
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white focus:outline-none"
          />
        </div>

        <p className="font-body text-[12px] lg:text-[13px] text-[#12245B]/80 mt-6 max-w-2xl mx-auto">
          When donated directly without a fundraiser, the beneficiary receives 90%. Fundraisers select their own incentive rate (0–5%), visible to all donors.
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}} />
    </section>
  );
}
