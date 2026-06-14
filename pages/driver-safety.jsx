import React from "react";
import Head from "next/head";
import Link from "next/head";
import Navbar from "../container/Navbar";
import FooterView from "../container/FooterView";

export default function SafetyForDrivers() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased selection:bg-zinc-950 selection:text-white">
      <Head>
        <title>Driver Protection & Safety Guidelines | MobiSplit</title>
        <meta name="description" content="Discover MobiSplit's driver shielding parameters, vehicle compliance checklists, and secure peer-to-peer cost contribution guidelines." />
      </Head>

      {/* CORE TOP NAVIGATION */}
      <Navbar />

      <main>
        {/* ─── DYNAMIC HERO SECTION WITH REQUESTED AUTO SAFETY BANNER ─── */}
        <section className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center overflow-hidden bg-zinc-950 border-b border-zinc-200">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://plus.unsplash.com/premium_photo-1664360971083-3ac22f8d7cc8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwc2FmZXR5fGVufDB8fDB8fHww" 
              alt="MobiSplit Driver Safety premium automotive road tracking protection graphics" 
              className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.02]"
            />
          </div>
          {/* Subtle Ambient Vignette Wrap */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-[900px] w-full px-6 text-center space-y-4">
            <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1 text-[10px] font-mono tracking-widest text-zinc-300 font-bold uppercase">
              Partner Driver Security Ledger
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-none">
              Empowering Drivers with <br /> Complete Peace of Mind
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm font-medium leading-relaxed">
              MobiSplit is intentionally structured to protect our partner drivers. We build modern toolsets, strict passenger matching frameworks, and direct security guardrails.
            </p>
          </div>
        </section>

        {/* ─── CORE CARD LAYOUTS: DRIVER PROTECTION FRAMEWORKS ─── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 space-y-16">
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-900">Driver Shielding Systems</h2>
              <p className="text-zinc-500 max-w-xl mx-auto text-xs sm:text-sm font-medium">
                Our infrastructure guarantees transparency, eliminating payment friction and ensuring anonymous communication channels.
              </p>
              {/* Structural Line Break */}
              <div className="w-12 h-1 bg-zinc-900 mx-auto rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl space-y-4 shadow-sm hover:border-zinc-300 transition duration-150 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Verified Passenger Matrices</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                    Passengers linked to your lift club match must maintain verified payment accounts and authentic contact records profile layers, significantly mitigating transit risk variables.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-200 text-[9px] font-mono text-zinc-400 uppercase font-bold tracking-tight">Identity Guard Mechanism</div>
              </div>

              {/* Card 2 */}
              <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl space-y-4 shadow-sm hover:border-zinc-300 transition duration-150 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  </div>
                  <h3 className="                  text-xs font-bold uppercase tracking-wider text-zinc-900">Masked Contact Routines</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                    Your personal mobile number remains completely confidential. Our internal platform layout masks communication channels dynamically to shield privacy.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-200 text-[9px] font-mono text-zinc-400 uppercase font-bold tracking-tight">Privacy Shield Routing</div>
              </div>

              {/* Card 3 */}
              <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl space-y-4 shadow-sm hover:border-zinc-300 transition duration-150 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Guaranteed Cost Splitting</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                    Say goodbye to uncomfortable fare negotiations. Passenger cost contributions are automatically updated, stored, and disbursed securely to your backend wallet.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-200 text-[9px] font-mono text-zinc-400 uppercase font-bold tracking-tight">Automated Ledger Settled</div>
              </div>
            </div>

            {/* Break Line Separator */}
            <div className="w-full h-px bg-zinc-100" />

            {/* ─── ROADWORTHY & LEGAL RESPONSIBILITY CALLOUTS ─── */}
            <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">// Vehicle Assets Rulebook</span>
                <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
                  Maintaining Vehicle Excellence and <br /> Roadworthy Compliance Checkpoints
                </h3>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-2xl">
                  MobiSplit operates strictly as a community cost-sharing hub. To preserve the safety parameters of all participants, partner drivers are expected to keep vehicles in optimal physical and mechanical condition. Regular testing of brakes, tire threads, clean fluid thresholds, and functional indicator instrumentation metrics is mandatory.
                </p>
              </div>
              <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-200">Threshold Requirements:</h4>
                <ul className="text-xs text-zinc-400 space-y-2 font-medium">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Valid Driver's License Matrix</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Valid Roadworthy Certification</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active Comprehensive Auto Insurance</li>
                </ul>
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