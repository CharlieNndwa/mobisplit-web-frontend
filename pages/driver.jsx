// pages/driver.jsx
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import gsap from "gsap";

// Core UI Layout Parts
import Navbar from "../container/Navbar"; 
import FooterView from "../container/FooterView"; 

export default function EarnAsDriver() {
  const containerRef = useRef(null);
  const [showApps, setShowApps] = useState(false);

  useEffect(() => {
    // High-Performance, Low-Memory animation initialization sequence
    const ctx = gsap.context(() => {
      gsap.from(".driver-fade-up", {
        opacity: 0,
        y: 25,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const clearSteps = [
    {
      num: "1",
      title: "Download the App",
      desc: "Get the official MobiSplit app on your iOS or Android device entirely for free to unlock your earning dashboard."
    },
    {
      num: "2",
      title: "Register as a Driver",
      desc: "Submit your core profile, set up your typical daily routes or inter-provincial trips, and configure your payment wallet."
    },
    {
      num: "3",
      title: "Get Swiftly Verified",
      desc: "Upload a photo of your driving licence and vehicle details right inside the secure portal for quick verification."
    },
    {
      num: "4",
      title: "Drive & Earn Cash",
      desc: "Accept matched commuters heading your way, share the trip costs, and take home earnings directly with zero high corporate cuts."
    }
  ];

  return (
    <div ref={containerRef} className="bg-white text-zinc-900 min-h-screen font-sans overflow-x-hidden antialiased">
      <Head>
        <title>Drive & Earn Money with MobiSplit | Become a Driver Partner</title>
        <meta name="description" content="Turn your extra seats into extra cash. Download the app, register as a verified driver, and start earning on your daily commutes across South Africa." />
      </Head>

      {/* Styled to contrast smoothly against a premium white background layout */}
      <Navbar />

      <main className="relative z-10">
        
        {/* PREMIUM HERO SECTION - High Contrast White Bolt-Style Layout */}
        <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 bg-gradient-to-b from-zinc-50 via-white to-white overflow-hidden">
          
          {/* Subtle geometric background overlay for minimalist visual Polish */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none">
            <div className="absolute top-12 right-[-10%] w-[600px] h-[600px] rounded-full border-[32px] border-emerald-500" />
            <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full border-[16px] border-blue-500" />
          </div>

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left flex flex-col items-start">
              
              {/* Premium Badge Identifier */}
              <div className="inline-flex items-center gap-2 border border-zinc-200 bg-white shadow-sm px-3.5 py-1.5 mb-6 rounded-full driver-fade-up">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 font-bold">
                  MobiSplit Driver Portal • Earn On Your Own Terms
                </p>
              </div>

              {/* Bold Title Matrix */}
              <h1 className="font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.0] text-zinc-950 mb-6 driver-fade-up">
                Drive more. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600">
                  Earn extra money.
                </span>
              </h1>

              {/* Action Narrative */}
              <p className="text-base sm:text-lg text-zinc-600 font-normal max-w-[580px] leading-relaxed mb-8 driver-fade-up">
                Why commute alone when your empty seats can pay your bills? Download the MobiSplit app, register as an independent driver partner, get verified, and pocket straightforward revenue matching with passengers along your path.
              </p>

              {/* Action Button Controls */}
              <div className="relative w-full sm:w-auto block z-30 driver-fade-up">
                <button 
                  onClick={() => setShowApps(!showApps)}
                  className="w-full sm:w-auto flex items-center justify-center gap-4 bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs sm:text-sm px-8 py-4 hover:bg-emerald-700 transition active:scale-[0.98] rounded-none shadow-md shadow-emerald-600/10"
                >
                  <span>Get App & Start Earning</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${showApps ? 'rotate-90' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu Container */}
                <div 
                  className={`absolute left-0 right-0 sm:right-auto mt-2 w-full sm:w-72 bg-white border border-zinc-200 p-2 transition-all duration-200 flex flex-col gap-1.5 shadow-xl ${
                    showApps ? "opacity-100 translate-y-0 pointer-events-auto scale-100" : "opacity-0 -translate-y-2 pointer-events-none scale-[0.97]"
                  }`}
                >
                  <a href="#" className="flex items-center justify-between p-3 border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300 transition text-xs font-bold uppercase tracking-wider text-zinc-800">
                    <span>App Store (iOS)</span>
                    <span>➔</span>
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300 transition text-xs font-bold uppercase tracking-wider text-zinc-800">
                    <span>Google Play (Android)</span>
                    <span>➔</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Asset Column: Your Brand Identity Frame */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end driver-fade-up">
              <div className="relative bg-zinc-50 border border-zinc-200 p-6 sm:p-8 max-w-[380px] w-full shadow-2xl shadow-zinc-200/50 relative">
                <div className="absolute top-0 left-12 right-12 h-[3px] bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500" />
                
                <div className="w-16 h-16 mx-auto mb-6 bg-white border border-zinc-200 p-3 flex items-center justify-center shadow-sm">
                  <img 
                    src="/images/IMG-20260505-WA0016.png" 
                    alt="MobiSplit Logo Asset" 
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-center text-sm font-mono uppercase font-black tracking-widest text-zinc-400 mb-4">Registration Requirements</h3>
                <ul className="text-xs text-zinc-600 space-y-3 font-medium">
                  <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> Valid SA Driver&apos;s Licence</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> Registered Operational Vehicle</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> Smartphone with Active GPS Capabilities</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> Verified In-App Account Status</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* DRIVER ONBOARDING FLOW STEPS */}
        <section className="bg-zinc-50 border-t border-b border-zinc-200 py-20 sm:py-24">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 xl:px-12">
            
            {/* Context Summary Header */}
            <div className="text-left mb-16 max-w-xl">
              <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold mb-2">// Swift Setup Process</p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
                Onboarding is quick & straightforward
              </h2>
              <p className="text-zinc-500 text-sm mt-2 font-normal">
                Follow these simple layout tracks to open up your dashboard parameters and start receiving payouts.
              </p>
            </div>

            {/* Steps Track Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {clearSteps.map((step, index) => (
                <div 
                  key={index}
                  className="border border-zinc-200 bg-white p-6 flex flex-col justify-between transition hover:shadow-lg hover:border-zinc-300"
                >
                  <div>
                    <div className="w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center text-xs font-mono font-bold mb-6">
                      {step.num}
                    </div>
                    <h3 className="text-base font-bold uppercase tracking-tight text-zinc-950 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-3 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-400 font-bold">
                    <span>ACTION TRACK</span>
                    <span className="text-emerald-600 font-extrabold">MANDATORY</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* REVENUE MODEL DETAILS */}
        <section className="py-20 sm:py-24 bg-white relative">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 xl:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <p className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">// True Independence</p>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-950 leading-none">
                Why drivers choose our system
              </h2>
              <div className="space-y-4 pt-2">
                <div className="flex gap-3">
                  <div className="text-emerald-600 font-black text-lg">✓</div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 uppercase">Maximize Empty Commutes</h4>
                    <p className="text-zinc-600 text-xs sm:text-sm">Turn regular point-A to point-B routine routes into instant direct earnings.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-emerald-600 font-black text-lg">✓</div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 uppercase">Safety & Full Verification</h4>
                    <p className="text-zinc-600 text-xs sm:text-sm">We maintain community safety protocols. Ride matches only occur with completely identified, verified accounts.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-emerald-600 font-black text-lg">✓</div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 uppercase">Zero Surprise Fees</h4>
                    <p className="text-zinc-600 text-xs sm:text-sm">What you split or earn inside your vehicle is fully clear right inside your transparent digital wallet wallet ledger.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Matrix Card Layout */}
            <div className="bg-zinc-50 border border-zinc-200 p-8 text-left space-y-6">
              <h3 className="text-lg font-bold uppercase text-zinc-950 tracking-tight">Earnings Example Overview</h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                By taking commuters along your standard long-distance or daily inter-city paths, you offset vehicle upkeep, cover escalating toll parameters, and transform fixed travel costs into positive cash balance returns.
              </p>
              <div className="border-t border-zinc-200 pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-xs font-mono"><span className="text-zinc-500">Platform Split Efficiency:</span> <span className="text-zinc-950 font-bold">100% Shared</span></div>
                <div className="flex justify-between text-xs font-mono"><span className="text-zinc-500">Registration Status:</span> <span className="text-emerald-600 font-bold">Open via App</span></div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <FooterView />
    </div>
  );
}