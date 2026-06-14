import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// Premium Structural Containers
import Navbar from "../container/Navbar";
import FooterView from "../container/FooterView";

export default function PassengerProtectionPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");

  const policyMenu = [
    { id: "introduction", label: "1. Introduction" },
    { id: "scope", label: "2. Scope of Coverage" },
    { id: "compliance", label: "3. Compliance Guidelines" },
    { id: "exclusions", label: "4. Exclusions" },
    { id: "claims", label: "5. Claims Process" },
    { id: "tax", label: "6. Tax Considerations" },
    { id: "commitment", label: "7. Commitment Statement" },
    { id: "insurance-framework", label: "8. Platform Insurance Ledger" }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Accounts for sticky top navigation bar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans tracking-tight antialiased selection:bg-zinc-950 selection:text-white">
      <Head>
        <title>Lift Club Passenger Protection Policy | MobiSplit</title>
        <meta name="description" content="Official MobiSplit lift club regulatory frameworks, passenger protection clauses, and vehicle insurance compliance rules." />
      </Head>

      {/* CORE TOP NAVIGATION */}
      <Navbar />

      <main>
        
        {/* ─── PREMIUM CUSTOM HERO SECTION ─── */}
        <section className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center overflow-hidden border-b border-zinc-200 bg-zinc-950">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://static.vecteezy.com/system/resources/thumbnails/074/109/171/small/a-businessman-touching-a-digital-interface-with-the-word-policy-and-legal-icons-symbolizing-corporate-regulation-compliance-governance-business-management-and-global-law-in-the-digital-era-free-photo.jpg" 
              alt="MobiSplit Compliance Governance and Corporate Law Digital Interface" 
              className="w-full h-full object-cover object-center brightness-[0.35] contrast-[1.05]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-[900px] w-full px-6 text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1 text-[10px] font-mono tracking-widest text-zinc-300 font-bold uppercase">
              Regulatory Framework Ledger
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-none">
              Lift Club Passenger <br className="hidden sm:inline" /> Protection Policy
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm font-medium leading-relaxed">
              Effective Date: June 2026 • Establishing structural protection standards, mutual accountability rules, and community cost-sharing clarity.
            </p>
          </div>
        </section>


        {/* ─── DUAL COLUMN INTERACTIVE SPLIT SCREEN LAYOUT ─── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Dynamic Sidebar Menu: Sticky Apple Style Indicator */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6 hidden lg:block">
              <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl">
                <p className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-wider mb-4">// Document Architecture</p>
                <nav className="space-y-1">
                  {policyMenu.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2.5 text-xs font-bold rounded-xl transition duration-150 tracking-tight block focus:outline-none ${
                        activeSection === item.id 
                          ? "bg-zinc-950 text-white shadow-sm" 
                          : "text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Secure Download Anchor Callout */}
              <div className="bg-zinc-950 text-zinc-400 p-5 rounded-2xl border border-zinc-900 text-xs font-medium flex items-center justify-between">
                <span>Looking for a offline hardcopy?</span>
                <button onClick={() => window.print()} className="text-white hover:text-blue-400 font-bold transition flex items-center gap-1">
                  <span>Print PDF</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </button>
              </div>
            </div>

            {/* Right Main Column: Structured Content Card Framework */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Section 1: Introduction Card */}
              <div id="introduction" className="space-y-4 scroll-mt-32">
                <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold text-zinc-600">
                  Section 1.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">1. Introduction</h2>
                <div className="bg-zinc-50/50 border border-zinc-200/80 p-6 rounded-2xl leading-relaxed text-zinc-600 text-xs sm:text-sm font-medium space-y-3">
                  <p>
                    MobiSplit operates as a community-based lift club platform, connecting individuals who share rides to reduce travel costs and environmental impact. Unlike commercial taxi services, MobiSplit facilitates cost-sharing among members rather than providing for-profit transport.
                  </p>
                  <p>
                    This Passenger Protection Policy outlines the safety and protection measures in place to ensure that all participants—drivers and passengers—are supported in the event of unforeseen incidents during shared rides.
                  </p>
                </div>
              </div>

              {/* Section 2: Scope of Coverage (Card Grid) */}
              <div id="scope" className="space-y-6 scroll-mt-32">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold text-zinc-600">
                    Section 2.0
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">2. Scope of Coverage</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-zinc-200 p-5 rounded-xl space-y-2 shadow-sm hover:border-zinc-300 transition duration-150">
                    <h3 className="text-xs font-bold uppercase text-zinc-900 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Injury & Disability
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">Covers reasonable medical expenses and compensation in the event of injury or permanent disability during a shared ride.</p>
                  </div>

                  <div className="bg-white border border-zinc-200 p-5 rounded-xl space-y-2 shadow-sm hover:border-zinc-300 transition duration-150">
                    <h3 className="text-xs font-bold uppercase text-zinc-900 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Death Support
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">Provides immediate support structures to the family or next of kin in the unfortunate event of a transit fatality.</p>
                  </div>

                  <div className="bg-white border border-zinc-200 p-5 rounded-xl space-y-2 shadow-sm hover:border-zinc-300 transition duration-150">
                    <h3 className="text-xs font-bold uppercase text-zinc-900 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Emotional Trauma
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">Covers psychological recovery sessions for passengers heavily affected by traumatic road incidents during a matched commute.</p>
                  </div>

                  <div className="bg-white border border-zinc-200 p-5 rounded-xl space-y-2 shadow-sm hover:border-zinc-300 transition duration-150">
                    <h3 className="text-xs font-bold uppercase text-zinc-900 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Third-Party Damage
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">Covers liability for claims arising from verified damage caused to third-party property or external persons during a shared ride.</p>
                  </div>
                </div>
              </div>

              {/* Section 3: Compliance Guidelines */}
              <div id="compliance" className="space-y-4 scroll-mt-32">
                <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold text-zinc-600">
                  Section 3.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">3. Compliance Guidelines</h2>
                <div className="bg-zinc-50/70 border border-zinc-200 p-6 rounded-2xl space-y-5">
                  <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed">
                    To ensure the safety and protection of all participants, MobiSplit strictly mandates that all drivers fulfill these threshold checkpoints:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex gap-3 items-center bg-white border border-zinc-200/60 px-4 py-3 rounded-xl shadow-sm">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-xs font-bold text-zinc-800">Maintain a valid, unexpired national driver’s license.</span>
                    </div>
                    <div className="flex gap-3 items-center bg-white border border-zinc-200/60 px-4 py-3 rounded-xl shadow-sm">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-xs font-bold text-zinc-800">Hold a valid roadworthy certificate for their registered vehicle asset.</span>
                    </div>
                    <div className="flex gap-3 items-center bg-white border border-zinc-200/60 px-4 py-3 rounded-xl shadow-sm">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-xs font-bold text-zinc-800">Maintain personal or comprehensive vehicle insurance that includes passenger protection.</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 font-mono italic leading-relaxed pt-2 border-t border-zinc-200">
                    Legal Status: Drivers participating in MobiSplit are not classified as taxi operators or commercial drivers. They are private individuals voluntarily sharing rides and fuel costs with fellow community members.
                  </p>
                </div>
              </div>

              {/* Section 4: Exclusions (High-Contrast Red Warning Style) */}
              <div id="exclusions" className="space-y-4 scroll-mt-32">
                <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold text-zinc-600">
                  Section 4.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">4. Exclusions</h2>
                <div className="bg-zinc-950 text-white p-6 rounded-2xl space-y-4 border border-zinc-900 shadow-xl">
                  <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                    Passenger protection coverage framework is completely invalidated and does not apply under the following parameters:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                    <li className="flex items-center gap-2 text-zinc-200 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" /> Personal vehicle use without passengers.
                    </li>
                    <li className="flex items-center gap-2 text-zinc-200 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" /> Engagement in illegal transit activities.
                    </li>
                    <li className="flex items-center gap-2 text-zinc-200 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" /> Operating vehicle without a license.
                    </li>
                    <li className="flex items-center gap-2 text-zinc-200 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" /> Vehicles lacking valid insurance matrices.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 5: Claims Process Steps */}
              <div id="claims" className="space-y-4 scroll-mt-32">
                <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold text-zinc-600">
                  Section 5.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">5. Claims Process</h2>
                
                <div className="relative border-l border-zinc-200 ml-3 pl-6 space-y-8 pt-2">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-4 h-4 bg-white border-2 border-zinc-900 rounded-full flex items-center justify-center text-[8px] font-mono font-bold">1</span>
                    <h4 className="text-xs font-bold uppercase text-zinc-900 tracking-wider">Report Timeline Window</h4>
                    <p className="text-xs text-zinc-500 font-medium mt-1">The passenger must report the incident to MobiSplit support networks within 7 consecutive days.</p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-4 h-4 bg-white border-2 border-zinc-900 rounded-full flex items-center justify-center text-[8px] font-mono font-bold">2</span>
                    <h4 className="text-xs font-bold uppercase text-zinc-900 tracking-wider">Documentation Submission</h4>
                    <p className="text-xs text-zinc-500 font-medium mt-1">Submit supporting documentation, including ride details, formal medical/psychological records, and an official police case report if applicable.</p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-4 h-4 bg-white border-2 border-zinc-900 rounded-full flex items-center justify-center text-[8px] font-mono font-bold">3</span>
                    <h4 className="text-xs font-bold uppercase text-zinc-900 tracking-wider">Underwriter Evaluation</h4>
                    <p className="text-xs text-zinc-500 font-medium mt-1">The claim files will be evaluated strictly by the relevant insurance provider underwriters. Clear payouts are typically processed inside a 30–60 day track.</p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-4 h-4 bg-white border-2 border-zinc-900 rounded-full flex items-center justify-center text-[8px] font-mono font-bold">4</span>
                    <h4 className="text-xs font-bold uppercase text-zinc-900 tracking-wider">Dispute Resolution</h4>
                    <p className="text-xs text-zinc-500 font-medium mt-1">If necessary, appeals or procedural disagreements can be formalised through the insurer’s specified dispute resolution framework.</p>
                  </div>
                </div>
              </div>

              {/* Section 6: Tax Considerations */}
              <div id="tax" className="space-y-4 scroll-mt-32">
                <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold text-zinc-600">
                  Section 6.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">6. Tax Considerations</h2>
                <div className="bg-zinc-50 border border-zinc-200/80 p-5 rounded-xl text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
                  All monetary contributions made by passengers are considered petrol-sharing support and not corporate or personal income. As such, MobiSplit drivers are not classified as business operators for tax purposes. Drivers are encouraged to maintain accurate records of shared costs for personal reference.
                </div>
              </div>

              {/* Section 7: Commitment Statement */}
              <div id="commitment" className="space-y-4 scroll-mt-32">
                <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold text-zinc-600">
                  Section 7.0
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">7. Commitment Statement</h2>
                <div className="bg-gradient-to-r from-blue-50/40 via-indigo-50/20 to-transparent border-l-4 border-blue-600 p-6 rounded-r-2xl space-y-2">
                  <p className="text-xs sm:text-sm text-zinc-700 italic font-medium leading-relaxed">
                    "MobiSplit is committed to fostering a safe, reliable, and community-driven transport network. Our Lift Club Passenger Protection Policy reflects our dedication to the well-being of all members. By promoting shared responsibility and mutual respect, we aim to create a trusted environment where everyone can travel with confidence."
                  </p>
                </div>
              </div>

              {/* ─── MANDATORY EXTENDED MOBISPLIT INSURANCE FRAMEWORK SECTION ─── */}
              <div id="insurance-framework" className="space-y-4 scroll-mt-32 pt-6 border-t border-zinc-100">
                <div className="inline-flex items-center gap-2 bg-zinc-950 text-white px-3 py-1 rounded-md text-[10px] font-mono uppercase font-black">
                  Section 8.0 • Structural Amendment
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">8. MobiSplit Core Insurance Integration</h2>
                
                <div className="bg-zinc-50 border-2 border-zinc-900/10 p-6 rounded-2xl space-y-4">
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                    To maintain absolute compliance within the legislative frameworks of South Africa and completely insulate our network infrastructure from litigious claims, MobiSplit operates under a multi-layered insurance verification architecture. Because MobiSplit is fundamentally a matching utility platform rather than a transportation entity, the following risk parameters are strictly enforced:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-sm">
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Independent Indemnification</h4>
                      <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">All vehicle owners and fleet syndicates must explicitly declare that their primary auto policy allows peer-to-peer cost contribution sharing models.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-sm">
                      <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Liability Firewall Limits</h4>
                      <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">The platform maintains structured secondary blanket protection parameters that trigger strictly for verified digital matched trips reported within active system boundaries.</p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 font-mono italic leading-relaxed pt-2">
                    Notice: By executing a matched route profile status, all platform commuters implicitly accept that liability for immediate automotive incidents rests squarely with the personal or comprehensive indemnity bounds verified during driver validation cycles.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* CORE BOTTOM NAVIGATION */}
      <FooterView />
    </div>
  );
}