import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Premium Container Layout Components
import Navbar from "../container/Navbar";
import FooterView from "../container/FooterView";
// 1. Drop this import line right at the top layout of your ambassador page
import ProgramObjectivesGrid from "../components/ProgramObjectivesGrid";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function YouthAmbassadorProgram() {
  const containerRef = useRef(null);

  useEffect(() => {
    // --- High-Performance GSAP Animation Context (Optimized for 4GB RAM Footprints) ---
    const ctx = gsap.context(() => {
      // 1. Smooth Fade Entry for Hero Typography Matrix
      gsap.from(".hero-fade-node", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      });

      // 2. Metrics Card Panel Stagger Reveal
      gsap.from(".metric-card-node", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".metrics-trigger-zone",
          start: "top bottom-=80px",
          toggleActions: "play none none none"
        }
      });

      // 3. Objectives Glowing Card Grid Stagger Reveal
      gsap.from(".glow-card-node", {
        opacity: 0,
        scale: 0.97,
        y: 35,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".objectives-trigger-zone",
          start: "top bottom-=100px",
          toggleActions: "play none none none"
        }
      });

      // 4. Feature Image and Text Row Slide
      gsap.from(".split-row-node", {
        opacity: 0,
        x: (i) => (i === 0 ? -30 : 30),
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".split-row-trigger-zone",
          start: "top bottom-=120px"
        }
      });
    }, containerRef);

    return () => ctx.revert(); // Prevent browser memory leaks during state recalculations
  }, []);

  const challengeMetrics = [
    { value: "5.8M+", label: "Unemployed Youth", desc: "Over 5.8 million young South Africans are currently looking for stable paths to economic inclusion." },
    { value: "62%", label: "Youth Unemployment (15-24)", desc: "The unemployment rate for ages 15–24 ranks among the highest globally." },
    { value: "46.1%", label: "Broader Youth Group (15-34)", desc: "Sustained economic exclusion impacts critical professional compounding years." }
  ];

  const objectives = [
    {
      title: "Job Creation",
      desc: "Provide unemployed youth with impactful ambassador roles to proactively advocate and scale MobiSplit in local communities.",
      icon: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:border-cyan-500/30"
    },
    {
      title: "Skills Development",
      desc: "Deliver practical, standardized training workshops covering digital marketing channels, local community engagement, and entrepreneurship.",
      icon: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group-hover:border-blue-500/30"
    },
    {
      title: "Income Opportunities",
      desc: "Earn consistent, commission-based balances by validating and onboarding active drivers and community passengers onto the platform ecosystem.",
      icon: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/30"
    },
    {
      title: "Community Impact",
      desc: "Position young leaders at the front lines of transit innovation, advocating for safe, highly affordable, and unified community cost-sharing.",
      icon: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      glowColor: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] group-hover:border-indigo-500/30"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white selection:bg-zinc-900 selection:text-white overflow-hidden font-sans antialiased text-zinc-900">
      <Head>
        <title>MobiSplit Ambassador Youth Program | Empowering Communities</title>
        <meta name="description" content="Tackling youth unemployment in South Africa through entrepreneurial skills, digital marketing tools, and community-driven lift club adoption." />
      </Head>

      {/* CORE NAVIGATION CONTAINER INTERFACE */}
      <Navbar />

      <main className="pt-[85px]">
        
        {/* ─── HERO SPLIT HERO INTERFACE (APPLE TEXT ARCHITECTURE) ─── */}
        <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-50 border-b border-zinc-200/60 py-16 sm:py-24">
          <div className="mx-auto max-w-[1300px] w-full px-6 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column Text Matrix */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="hero-fade-node inline-flex items-center gap-1.5 bg-white border border-zinc-200 shadow-sm rounded-full px-3.5 py-1 text-[11px] font-mono tracking-widest text-blue-600 font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                National Youth Initiative
              </span>
              <h1 className="hero-fade-node text-4xl sm:text-[56px] font-black tracking-tighter leading-[1.05] text-zinc-900">
                MobiSplit Ambassador <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                  Youth Program
                </span>
              </h1>
              <p className="hero-fade-node text-base sm:text-lg text-zinc-500 max-w-xl leading-relaxed font-normal">
                Empowering a generation of local leaders. MobiSplit is addressing South Africa's youth unemployment challenge by creating structured income frameworks, digital skills development pathways, and entrepreneurial capabilities.
              </p>
              
              <div className="hero-fade-node pt-4 flex flex-col sm:flex-row gap-4">
                <a href="#download-engine" className="inline-flex justify-center items-center bg-zinc-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition duration-150 shadow-md active:scale-98">
                  Get Started Today
                </a>
                <a href="#program-structure" className="inline-flex justify-center items-center bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition duration-150 active:scale-98">
                  Explore Structure
                </a>
              </div>
            </div>

            {/* Right Column Fluid Visual Graphic Node */}
            <div className="lg:col-span-6 hero-fade-node relative w-full h-[350px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-white/40">
              <img 
                src="https://static.vecteezy.com/system/resources/thumbnails/035/847/070/small/ai-generated-four-friends-are-driving-in-a-car-smiling-free-photo.jpg" 
                alt="Young South African friends sharing a commute inside a car"
                className="w-full h-full object-cover object-center transform scale-[1.02] transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>
        </section>




            {/* ─── NEW RE-LINKED EMBEDDED BLOCK INTERFACE ─── */}
<ProgramObjectivesGrid />


        {/* ─── DYNAMIC SPLIT SECTION USING VISUAL FILE REFRENCED VIEW: COVER.JPG ─── */}
        <section id="program-structure" className="py-24 bg-white border-b border-zinc-100 split-row-trigger-zone">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Side Content Layer: Cover.jpg Media Embed */}
              <div className="lg:col-span-6 split-row-node relative rounded-3xl overflow-hidden shadow-xl border border-zinc-200 bg-zinc-50 aspect-[16/9] lg:aspect-square max-h-[500px]">
                <img 
                  src="/images/cover.jpg" 
                  alt="MobiSplit ecosystem user showcasing community software interface frame layout details"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Right Side Content Layer: Program Architecture Details */}
              <div className="lg:col-span-6 split-row-node space-y-8">
                <div className="space-y-3">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-md">
                    Execution Blueprints
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                    Program Structural Operations
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed">
                    Designed to identify talent and establish immediate localized ownership. Youth gain verifiable commercial skills while driving shared-infrastructure transport adoption.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex gap-4 items-start pb-4 border-b border-zinc-100">
                    <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">01</span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">Targeted Recruitment Framework</h4>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">Onboarding unemployed individuals aged 18–30 systematically across active urban corridors and township commuter areas.</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-4 items-start pb-4 border-b border-zinc-100">
                    <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">02</span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">Professional Development Workshops</h4>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">Interactive instruction modules focused on digital outreach systems, scalable brand asset rules, and community logistics management.</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex gap-4 items-start">
                    <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">03</span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">Incentives & Progression Matrices</h4>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">Performance-linked milestone structures delivering continuous commission streams alongside formal career verification profiles.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ─── EXPECTED OUTCOMES INSIGHT MATRIX ─── */}
        <section className="py-24 bg-zinc-50/30 border-b border-zinc-100">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32">
                <span className="text-[10px] font-mono font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                  // Intended Deliverables
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">Expected Operational Outcomes</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                  Measuring success through social impact parameters, verified software distribution, and sustainable local community resource integration.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="bg-white border border-zinc-200 p-6 rounded-2xl space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold uppercase text-zinc-900 tracking-wider">Employment Pathways</h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">Thousands of proactive young people systematically integrated into decentralized field coordinator networks across major operational corridors.</p>
                </div>

                <div className="bg-white border border-zinc-200 p-6 rounded-2xl space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold uppercase text-zinc-900 tracking-wider">Community Awareness</h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">Accelerating the mass adoption of MobiSplit as a dependable, highly trusted lift club option across complex municipal layouts.</p>
                </div>

                <div className="bg-white border border-zinc-200 p-6 rounded-2xl space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold uppercase text-zinc-900 tracking-wider">Economic Inclusion</h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">Securing direct individual revenue allocations while helping young workers compile critical, highly transferable professional field competencies.</p>
                </div>

                <div className="bg-white border border-zinc-200 p-6 rounded-2xl space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold uppercase text-zinc-900 tracking-wider">Social Impact Lifecycle</h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">Mitigating unemployment pressures, fortifying regional neighborhood safety parameters, and creating accessible transit infrastructure paths.</p>
                </div>

              </div>
            </div>

          </div>
        </section>

   


        {/* ─── MANDATORY APP CONVERSION DOWNLOAD BLOCK (INTEGRATED SPECIFICATION) ─── */}
        <section id="download-engine" className="py-24 bg-zinc-950 text-white relative overflow-hidden">
          {/* Subtle design geometry layout accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
          
          <div className="mx-auto max-w-[1000px] px-6 text-center space-y-8 relative z-10">
            <span className="inline-block text-[11px] font-mono font-black text-cyan-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-md uppercase tracking-widest">
              Mandatory Network Access Code
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter max-w-2xl mx-auto leading-[1.1]">
              Download the Platform Application Engine First
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto font-medium text-xs sm:text-sm leading-relaxed">
              To participate in the program validation network, all prospective ambassadors must maintain an active verified profile setup inside our live passenger and driver app ecosystem.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              
              {/* Apple Store Anchor Button Setup */}
              <div className="w-full sm:w-[170px] h-[52px] bg-black border border-zinc-800 hover:border-zinc-700 rounded-xl flex items-center px-4 gap-3 cursor-pointer transition-all duration-200 active:scale-98">
                <svg className="w-6 h-6 text-white shrink-0 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                </svg>
                <div className="leading-tight text-left">
                  <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium">Download on the</p>
                  <p className="text-xs font-bold text-zinc-200">App Store</p>
                </div>
              </div>

              {/* Google Play Store Anchor Button Setup */}
              <div className="w-full sm:w-[170px] h-[52px] bg-black border border-zinc-800 hover:border-zinc-700 rounded-xl flex items-center px-4 gap-3 cursor-pointer transition-all duration-200 active:scale-98">
                <svg className="w-[22px] h-[22px] text-white shrink-0 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.609 1.814L13.783 12 3.609 22.186A2.22 2.22 0 0 1 3 20.575V3.423c0-.655.226-1.22.609-1.609zm11.233 9.124l3.614-2.087a1.44 1.44 0 0 1 0 2.493l-3.614-2.087-.001.001zm-1.066-1.066L4.747 4.135l9.029 5.737zm0 4.256l-9.029 5.737 9.029-5.737z" />
                </svg>
                <div className="leading-tight text-left">
                  <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium">Get it on</p>
                  <p className="text-xs font-bold text-zinc-200">Google Play</p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ─── COMMITMENT MANIFESTO STATEMENT ─── */}
        <section className="py-24 bg-white relative">
          <div className="mx-auto max-w-[800px] px-6 text-center space-y-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400 block">// Corporate Mandate</span>
            <blockquote className="text-lg sm:text-2xl font-medium tracking-tight text-zinc-800 italic leading-relaxed">
              "MobiSplit is committed to tackling South Africa’s youth unemployment crisis by creating meaningful opportunities through the Ambassador Youth Program. By empowering young people to become community leaders, MobiSplit contributes to both economic inclusion and social transformation."
            </blockquote>
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-900">The MobiSplit Executive Steering Committee</p>
              <p className="text-[11px] font-mono text-zinc-400">La Fab Trading and Projects Initiative</p>
            </div>
          </div>
        </section>

      </main>

      {/* CORE FOOTER CONTAINER INTERFACE */}
      <FooterView />
    </div>
  );
}