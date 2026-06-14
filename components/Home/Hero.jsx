import React, { useEffect, useState } from "react";
import Image from "next/image";
import eventEmitter from "utils/eventEmitter";
import heroAnimation from "animations/hero";

export default function Hero() {
  const [showApps, setShowApps] = useState(false);

  useEffect(() => {
    // Retaining your existing structural preloader handshake safely
    if (eventEmitter && typeof eventEmitter.once === "function") {
      eventEmitter.once("preloading-complete", () => {
        if (typeof heroAnimation === "function") heroAnimation();
      });
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#000000] text-white overflow-hidden flex flex-col justify-between pt-24 pb-12">
      
      {/* CINEMATIC BACKGROUND VIDEO - Pure Apple Canvas */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-35 select-none pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="https://www.pexels.com/download/video/18616136/"
        />
        {/* Soft atmospheric gradient vignette to maximize text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

     

      {/* CORE VALUE BLOCK - Inspired by Uber & Bolt Layout Frameworks */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 xl:px-12 my-auto flex flex-col items-start text-left">
        
        {/* Pitch Deck Core Tagline Block */}
        <div className="inline-block border border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 mb-6 hero_text">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-yellow-500">
            Same Direction • Shared Fare • Smart Savings
          </p>
        </div>

        {/* High-Impact Heading Matrix */}
        <h1 className="font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95] text-white hero_text mb-6 max-w-[900px]">
          Let&apos;s change how <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-zinc-400">
            South Africa commutes.
          </span>
        </h1>

        {/* Problem/Solution Narrative From Pitch Deck */}
        <p className="text-base sm:text-xl text-zinc-300 font-normal max-w-[620px] leading-relaxed hero_text_description mb-10">
          Daily commuting is broken with petrol soaring over R25 per litre. MobiSplit connects 
          drivers with commuters traveling the exact same route to split fuel costs 50/50. 
          No heavy corporate commissions—just real savings.
        </p>

     {/* DYNAMIC CALL TO ACTION - Unified Store Dropdown Wrapper */}
<div className="relative hero_buttons z-30 w-full sm:w-auto">
<button 
  onClick={() => setShowApps(!showApps)}
  onMouseEnter={() => setShowApps(true)}
  className="group flex items-center justify-between gap-6 border border-blue-500/40 bg-gradient-to-r from-blue-950 via-[#0a122c] to-zinc-950 text-white font-bold uppercase tracking-wider text-xs sm:text-sm px-6 py-4 transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.98] w-full sm:w-auto rounded-none"
>
  {/* Flex row pairing the logo mark and text with balanced separation */}
  <span className="flex items-center gap-3 tracking-[0.1em]">
    <img 
      src="/images/IMG-20260505-WA0016.png" 
      alt="MobiSplit Logo" 
      className="w-5 h-5 object-contain"
    />
    <span>Get MobiSplit App</span>
  </span>
  <svg 
    className={`w-4 h-4 transition-transform duration-300 text-blue-400 ${showApps ? 'rotate-90 text-blue-300' : 'group-hover:translate-x-1.5'}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</button>


  {/* Clean App Store Links Dropdown Panel - Midnight Blue Edition Effects */}
<div 
  onMouseLeave={() => setShowApps(false)}
  className={`absolute left-0 sm:left-0 right-0 sm:right-auto mt-3 w-full sm:w-80 bg-[#040814]/95 border border-blue-900/50 p-3 transition-all duration-300 flex flex-col gap-2.5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(29,78,216,0.15)] ${
    showApps ? "opacity-100 translate-y-0 pointer-events-auto scale-100" : "opacity-0 -translate-y-2 pointer-events-none scale-[0.97]"
  }`}
  style={{ transformOrigin: 'top left' }}
>
  {/* Subtle internal atmospheric neon bar */}
  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

  {/* iOS App Store */}
  <a 
    href="#" 
    target="_blank" 
    rel="noreferrer"
    className="group/item flex items-center gap-4 p-3 border border-blue-950/40 bg-[#070d20]/60 hover:bg-[#0c1635]/80 hover:border-blue-700/50 transition-all duration-200 rounded-none relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/[0.03] to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
    {/* 🧊 Fixed size constraint: Upgraded container to a spacious, balanced w-10 h-10 with clean display bounds */}
    <div className="relative w-10 h-10 flex-shrink-0 rounded-md overflow-hidden transition-transform duration-200 group-hover/item:scale-105">
      <img 
        src="https://img.icons8.com/color/1200/apple-app-store--v1.jpg" 
        alt="Apple iOS Icon"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="text-left relative z-10">
      <p className="text-[9px] text-blue-400/70 uppercase tracking-widest font-semibold leading-none mb-1">Download on the</p>
      <p className="text-base font-bold text-white font-sans tracking-wide leading-tight group-hover/item:text-blue-200 transition-colors">App Store</p>
    </div>
  </a>

  {/* Google Play */}
  <a 
    href="#" 
    target="_blank" 
    rel="noreferrer"
    className="group/item flex items-center gap-4 p-3 border border-blue-950/40 bg-[#070d20]/60 hover:bg-[#0c1635]/80 hover:border-blue-700/50 transition-all duration-200 rounded-none relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/[0.03] to-blue-500/0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
    {/* 🧊 Fixed size constraint: Matched container sizing & utilized crisp background presentation */}
    <div className="relative w-10 h-10 flex-shrink-0 bg-[#0c122c] rounded-md overflow-hidden p-1 transition-transform duration-200 group-hover/item:scale-105">
      <img 
        src="https://www.citypng.com/public/uploads/preview/hd-google-play-playstore-logo-symbol-png-701751694777134cuw3jc7voo.png?v=2026040411" 
        alt="Google Play Icon"
        className="w-full h-full object-contain"
      />
    </div>
    <div className="text-left relative z-10">
      <p className="text-[9px] text-blue-400/70 uppercase tracking-widest font-semibold leading-none mb-1">Get it on</p>
      <p className="text-base font-bold text-white font-sans tracking-wide leading-tight group-hover/item:text-blue-200 transition-colors">Google Play</p>
    </div>
  </a>
</div>
</div>

      </div>

      {/* METRIC BOTTOM BAR - High Contrast Comparative Ticker */}
      {/* <div className="relative z-10 w-full border-t border-zinc-900/60 bg-zinc-950/30 backdrop-blur-sm pt-8">
        <div className="w-full max-w-[1200px] mx-auto px-6 xl:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Booking Fee</p>
            <p className="text-xl font-mono font-bold text-white">R2.50 / trip</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Driver Access</p>
            <p className="text-xl font-mono font-bold text-yellow-400">R5.00 / day</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Driver Revenue</p>
            <p className="text-xl font-mono font-bold text-white">Keep 100%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Safety Framework</p>
            <p className="text-xl font-mono font-bold text-zinc-300">Biometric ID</p>
          </div>
        </div>
      </div> */}

    </div>
  );
}