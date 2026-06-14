import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Premium Container Core Components
import Navbar from "../container/Navbar"; 
import FooterView from "../container/FooterView"; 

gsap.registerPlugin(ScrollTrigger);

export default function EarnAsDriver() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const infoSectionRef = useRef(null);
  const stepsRef = useRef(null);
  const detailsRef = useRef(null);
  const faqRef = useRef(null);

  // Active state tracker for the interactive FAQ ledger
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    // --- High-Performance GSAP Animation Context (Optimized for Low-Memory Footprints) ---
    const ctx = gsap.context(() => {
      // 1. Initial Hero Stagger Entry
      gsap.from(".hero-text-node", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      });

      // 2. Premium Grid Staggered Entry on Scroll
      gsap.from(".perk-card-node", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".perks-trigger-zone",
          start: "top bottom-=100px",
          toggleActions: "play none none none"
        }
      });

      // 3. Step-by-Step Guideline Blocks Tracking Trigger
      gsap.from(".guideline-step-card", {
        opacity: 0,
        scale: 0.98,
        y: 35,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".guideline-trigger-zone",
          start: "top bottom-=120px",
          toggleActions: "play none none none"
        }
      });

      // 4. Structural Feature Grid Reveal
      gsap.from(".feature-fade-node", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".features-trigger-zone",
          start: "top bottom-=80px"
        }
      });
    }, containerRef);

    return () => ctx.revert(); // Prevent active resource memory leaks during state recalculations
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const driverPerks = [
    {
      title: "Hedge and Recover Fuel Cost",
      desc: "Turn empty passenger volume along your regular workplace route into instant cost-sharing balances. Recover up to 100% of weekly petrol overheads cleanly.",
      // Custom Inline SVG Path implementations to eliminate SSR crashes
      icon: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-cyan-500",
      bg: "bg-cyan-50/50"
    },
    {
      title: "Fixed Platform Microtransaction Fees",
      desc: "Say goodbye to punishing 25% corporate ride-hailing cuts. Benefit from our sustainable R5 platform ledger model designed directly for commuter communities.",
      icon: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 00-2 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "text-blue-500",
      bg: "bg-blue-50/50"
    },
    {
      title: "Set Your Scheduling Rules",
      desc: "No minimum hours or rigid targets. Simply switch on active visibility whenever your daily journey goes live, matching with commuters along your lane.",
      icon: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-indigo-500",
      bg: "bg-indigo-50/50"
    }
  ];

  const safetyFeatures = [
    "Full cryptographic ID validation check for all club passengers before platform boarding permission.",
    "Real-time GEOGRAPHY tracking modules systematically log spatial coordinates from start to final drop.",
    "Pre-routed corridor selection constraints shield operations from volatile unverified pick-up calls.",
    "Dual integrated panic parameters provide immediate priority telemetry transmission loops to response hubs."
  ];

  const faqs = [
    {
      question: "How is MobiSplit different from traditional commercial e-hailing services?",
      answer: "Unlike commercial entities that operate on aggressive for-profit frameworks with high platform commissions, MobiSplit is a community-focused lift club initiative. Drivers share seats along paths they are already commuting, split costs under localized microtransaction models, and enjoy fixed fees rather than variable revenue cuts."
    },
    {
      question: "What legal vehicle credentials are required for verification status?",
      answer: "To ensure full community safety protocols, driver candidates upload a valid South African Driver's License, valid vehicle registration documentation showing compliance checks, and a clear profile identity frame. Cryptographic workflows validate these parameters instantly."
    },
    {
      question: "How do transaction payouts settle into my personal banking configuration?",
      answer: "All cost-sharing metrics are securely logged via automated ledger entries. Passenger contributions settle automatically onto your verified digital dashboard, ready for manual processing transfers directly to your South African banking account without clearing delays."
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white selection:bg-zinc-900 selection:text-white">
      <Head>
        <title>Become a Verified Driver Partner | MobiSplit Lift Club</title>
        <meta name="description" content="Turn your daily commutes into an earning opportunity. Secure cost-sharing metrics with South Africa's premium lift club network." />
      </Head>

      {/* CORE FRAMEWORK INTERFACE HEADER */}
      <Navbar />

      <main className="text-zinc-950 font-sans tracking-tight pt-[64px]">
        
        {/* ─── HERO BANNER SECTION (FLUID COMPACT GRAPHIC ASSEMBLY) ─── */}
        <section ref={heroRef} className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-start overflow-hidden bg-black">
          <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
            <img 
              src="https://img.freepik.com/free-photo/close-up-mobile-with-map-directions_23-2148906400.jpg?semt=ais_hybrid&w=740&q=80" 
              alt="MobiSplit Operational Map Vector Banner"
              className="w-full h-full object-cover opacity-70 object-center scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/20 to-transparent" />
          </div>

          <div className="mx-auto max-w-[1300px] w-full px-6 xl:px-16 relative z-10 text-white">
            <div className="max-w-2xl space-y-6">
              <span className="hero-text-node inline-block font-mono text-[10px] font-black tracking-widest text-cyan-400 bg-zinc-900/90 border border-zinc-800 px-3 py-1 rounded-md uppercase">
                // Platform Optimization Engine
              </span>
              <h1 className="hero-text-node text-4xl sm:text-6xl font-black tracking-tighter leading-[1.05]">
                Your Car. Your Route. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
                  Shared Expenses.
                </span>
              </h1>
              <p className="hero-text-node text-sm sm:text-base text-zinc-300 max-w-lg leading-relaxed font-normal">
                Join the MobiSplit cost-sharing lift club initiative. Optimize empty passenger seats, mitigate fuel price fluctuations, and connect with verified community members along your daily commute.
              </p>
              <div className="hero-text-node pt-2">
                <Link href="/auth/register" passHref>
                  <button className="bg-zinc-50 hover:bg-white text-zinc-950 text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition duration-150 shadow-xl transform active:scale-98 flex items-center gap-2 group">
                    <span>Register as Driver Partner</span>
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* ─── VALUE INSIGHT SECTION: METRIC ADVANTAGES ─── */}
        <section ref={infoSectionRef} className="py-24 bg-white relative border-b border-zinc-100">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 perks-trigger-zone">
            
            <div className="max-w-3xl mb-16 space-y-3">
              <p className="text-xs font-mono tracking-widest uppercase font-black text-cyan-600">
                // Redefining Commuter Logistics
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                Designed to Maximize Everyday Efficiency
              </h2>
              <p className="text-zinc-500 text-sm font-medium max-w-xl">
                We've re-engineered cost recovery parameters to prioritize individual drivers, avoiding the restrictive corporate overrides found in traditional ride-hailing networks.
              </p>
            </div>

            {/* Grid Framework Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-8">
              {driverPerks.map((perk, index) => {
                return (
                  <div key={index} className="perk-card-node flex flex-col justify-between p-6 rounded-2xl border border-zinc-200/70 bg-stone-50/40 hover:bg-white hover:border-zinc-300 transition-all duration-200 group">
                    <div className="space-y-4">
                      <div className={`w-10 h-10 rounded-xl ${perk.bg} border border-zinc-200/50 flex items-center justify-center`}>
                        {perk.icon(`w-5 h-5 ${perk.color}`)}
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 tracking-tight group-hover:text-cyan-600 transition-colors">{perk.title}</h3>
                      <p className="text-xs text-zinc-600 leading-relaxed font-medium">{perk.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* ─── STEP-BY-STEP GUIDELINE ONBOARDING ROADMAP ─── */}
        <section ref={stepsRef} className="py-24 bg-zinc-50/50 border-b border-zinc-100">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 guideline-trigger-zone">
            
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
              <span className="text-xs font-mono font-black tracking-widest text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-md">
                Driver Guideline Framework
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                Get Verified and Start Sharing in 4 Simple Steps
              </h2>
              <p className="text-xs font-medium text-zinc-500">
                A seamless verification pipeline designed to get you moving without administrative friction.
              </p>
            </div>

            {/* Structured Step Cards Map */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Step 1 */}
              <div className="guideline-step-card bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition duration-200">
                <div className="space-y-6">
                  <div className="w-12 h-12 relative flex items-center justify-center bg-zinc-50 rounded-xl border border-zinc-100">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/128/3012/3012075.png" 
                      alt="Download Application Asset" 
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">01</span>
                      <span>Download the App</span>
                    </h4>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                      Download the ecosystem suite directly onto your smartphone via the Android Google Play Store or Apple App Store Connect.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="guideline-step-card bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition duration-200">
                <div className="space-y-6">
                  <div className="w-12 h-12 relative flex items-center justify-center bg-zinc-50 rounded-xl border border-zinc-100">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/128/6470/6470993.png" 
                      alt="Profile Configuration Variable Icon" 
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">02</span>
                      <span>Complete Driver Setup</span>
                    </h4>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                      Enter your core profile fields, select your commuter path preferences, and log your vehicle parameters within the onboarding system dashboard.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="guideline-step-card bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition duration-200">
                <div className="space-y-6">
                  <div className="w-12 h-12 relative flex items-center justify-center bg-zinc-50 rounded-xl border border-zinc-100">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/128/6784/6784655.png" 
                      alt="Instant Verification Vector Matrix" 
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">03</span>
                      <span>Instant Verification</span>
                    </h4>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                      Our automated ledger matching service reviews your credentials instantly against validation parameters for secure clearance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="guideline-step-card bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition duration-200">
                <div className="space-y-6">
                  <div className="w-12 h-12 relative flex items-center justify-center bg-zinc-50 rounded-xl border border-zinc-100 text-cyan-500">
                    <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.07 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">04</span>
                      <span>Go Live Online</span>
                    </h4>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                      Activate availability toggles on your dashboard engine. Render yourself visible to trusted community members and begin sharing travel overhead costs.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ─── COMPETITIVE PLATFORM COMPARISON GRID ─── */}
        <section ref={detailsRef} className="py-24 bg-white border-b border-zinc-100">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 features-trigger-zone">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column Structural Content Layout */}
              <div className="lg:col-span-5 space-y-6 sticky top-28">
                <span className="text-[11px] font-mono font-bold tracking-widest text-indigo-600 uppercase border border-indigo-200 bg-indigo-50/50 px-2.5 py-1 rounded-md">
                  Competitive Matrix Ledger
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  How MobiSplit Compares to E-Hailing Platforms
                </h3>
                <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                  Traditional rideshare ecosystems extract steep commissions from every trip. MobiSplit functions strictly as a peer-to-peer communal lift club infrastructure, keeping transaction dynamics simple and transparent.
                </p>
                
                <div className="space-y-3 pt-2">
                  {safetyFeatures.map((text, idx) => (
                    <div key={idx} className="feature-fade-node flex items-start gap-2.5 text-xs text-zinc-700 font-medium">
                      <svg className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Structural Content Layout - Table Matrix */}
              <div className="lg:col-span-7 w-full border border-zinc-200 rounded-2xl overflow-hidden shadow-sm bg-zinc-50/40">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 text-white text-[10px] uppercase font-mono tracking-wider">
                      <th className="p-4 sm:p-5">Platform Core Rules</th>
                      <th className="p-4 sm:p-5">Traditional E-Hailing</th>
                      <th className="p-4 sm:p-5 text-cyan-400">MobiSplit Club</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-medium divide-y divide-zinc-200/80 text-zinc-800">
                    <tr>
                      <td className="p-4 sm:p-5 font-bold bg-white text-zinc-900">Platform Commission Split</td>
                      <td className="p-4 sm:p-5 text-zinc-500">20% to 25% Per Ride</td>
                      <td className="p-4 sm:p-5 text-cyan-600 font-bold bg-cyan-50/20">R5 Fixed Transaction Fee</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold bg-white text-zinc-900">Target Operational Purpose</td>
                      <td className="p-4 sm:p-5 text-zinc-500">Full-Time Commercial Taxi</td>
                      <td className="p-4 sm:p-5 text-zinc-900 bg-cyan-50/20">Commute Expense Recovery</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold bg-white text-zinc-900">Route Determinations</td>
                      <td className="p-4 sm:p-5 text-zinc-500">Variable / On-Demand Requests</td>
                      <td className="p-4 sm:p-5 text-zinc-900 bg-cyan-50/20">Fixed Corridor Lane Matches</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-bold bg-white text-zinc-900">Passenger Accountability</td>
                      <td className="p-4 sm:p-5 text-zinc-500">Anonymous / Unverified profiles</td>
                      <td className="p-4 sm:p-5 text-zinc-900 bg-cyan-50/20 font-semibold">100% Cryptographic ID Verification</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </section>


        {/* ─── INTERACTIVE FAQ SECTION ─── */}
        <section ref={faqRef} className="py-24 bg-zinc-50/50 border-b border-zinc-100">
          <div className="mx-auto max-w-[900px] px-6">
            
            <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-mono font-black tracking-widest text-zinc-500 uppercase">// Knowledge Base System</span>
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">Frequently Asked Driver Inquiries</h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className="border border-zinc-200 bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-xs sm:text-sm text-zinc-900 hover:bg-zinc-50/80 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <span className="text-zinc-400 ml-4 flex-shrink-0">
                        {isOpen ? (
                          <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </span>
                    </button>
                    
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[300px] border-t border-zinc-100" : "max-h-0"
                      }`}
                    >
                      <p className="p-5 text-xs text-zinc-600 leading-relaxed font-medium bg-zinc-50/30">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* ─── CONVERSION ACCELERATOR ACTION CALL ─── */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
          
          <div className="mx-auto max-w-[1000px] px-6 text-center space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tighter">
              Ready to Control Your Commute Economy?
            </h2>
            <p className="text-zinc-600 max-w-xl mx-auto font-medium text-xs sm:text-sm leading-relaxed">
              Sign up as a verified partner driver today. Experience the difference of a cost-sharing platform built around community efficiency and fixed transaction safety models.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link href="/auth/register" passHref>
                <button className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-900 text-white font-bold px-8 py-4 rounded-xl transition duration-150 transform active:scale-98 text-xs uppercase tracking-wider shadow-md">
                  Create Driver Account
                </button>
              </Link>
              <Link href="/support" passHref>
                <button className="w-full sm:w-auto bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-bold px-8 py-4 rounded-xl transition duration-150 transform active:scale-98 text-xs uppercase tracking-wider">
                  Contact Support System
                </button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* CORE FRAMEWORK INTERFACE FOOTER */}
      <FooterView />
    </div>
  );
}