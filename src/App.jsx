import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StructuralGap from './components/StructuralGap';
import BeneficiaryTransform from './components/BeneficiaryTransform';
import ThreePillars from './components/ThreePillars';
import MoneyFlow from './components/MoneyFlow';
import TwoEngines from './components/TwoEngines';
import TimingArgument from './components/TimingArgument';
import TeamGovernance from './components/TeamGovernance';
import MarketSizing from './components/MarketSizing';
import GovernancePillars from './components/GovernancePillars';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingCTABar from './components/FloatingCTABar';

function App() {
  return (
    <div className="relative w-full overflow-hidden font-body text-[var(--color-ffg-text)] bg-[var(--color-ffg-bg)]">
      <Navbar />
      <FloatingCTABar />
      <main>
        <Hero />
        <StructuralGap />
        <BeneficiaryTransform />
        <ThreePillars />
        <MoneyFlow />
        <TwoEngines />
        <TimingArgument />
        <TeamGovernance />
        <MarketSizing />
        <GovernancePillars />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
