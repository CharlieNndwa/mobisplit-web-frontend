import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../container/Navbar";
import FooterView from "../container/FooterView";

export default function SafetyForPassengers() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-cyan-500 selection:text-black">
      <Head>
        <title>Passenger Safety Protocols | MobiSplit Lift Club</title>
        <meta name="description" content="Explore MobiSplit's passenger protection standards, real-time trip monitoring, and verified community guidelines." />
      </Head>

      {/* CORE TOP NAVIGATION */}
      <Navbar />

      <main>
        {/* ─── CLIPART VISUAL HERO SECTION ─── */}
        <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 border-b border-zinc-900">
          {/* Decorative Clipart Vector-style Background Glow Circles */}
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded-full px-4 py-1 text-[11px] font-mono tracking-wider font-bold uppercase">
                Commuter Safety Matrix
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight text-white">
                Your Safety Is Our <br />
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Shared Responsibility
                </span>
              </h1>
              <p className="text-zinc-400 max-w-2xl text-sm sm:text-base font-medium leading-relaxed">
                MobiSplit is committed to establishing a safe, transparent, and respectful ride-sharing community. From rigorous screening parameters to continuous trip monitoring, we protect you every step of the way.
              </p>
              <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="bg-white hover:bg-zinc-200 text-black font-bold px-6 py-3 rounded-xl transition text-xs uppercase tracking-wider shadow-lg active:scale-95">
                  Review Guidelines
                </button>
                <Link href="/support" passHref>
                  <button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold px-6 py-3 rounded-xl transition text-xs uppercase tracking-wider active:scale-95">
                    Emergency Help Desk
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Interactive Clipart Image Framework Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4 relative">
              {/* Image Card 1 - Carsharing Clipart representation */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl transform rotate-1 group hover:rotate-0 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src="https://img.magnific.com/premium-vector/carsharing-service-smartphone-people-rent-car-automobile-sharing-rental-booking-phone-app-route-road-auto-map-city-transport-flat-isolated-vector-illustration-white-background_633472-3643.jpg?semt=ais_hybrid&w=740&q=80" 
                  alt="MobiSplit Digital Carsharing smartphone vector graphics map environment" 
                  className="w-full h-[180px] sm:h-[220px] object-cover filter brightness-95 contrast-105"
                />
                <div className="p-4 absolute bottom-0 left-0 z-20">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/40 px-2 py-0.5 rounded">COMMUNITY UTILITY</span>
                </div>
              </div>

              {/* Image Card 2 - Rideshare Featured Representation */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl transform -rotate-1 group hover:rotate-0 transition-all duration-300 -mt-2">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src="https://www.accurate.com/wp-content/uploads/2023/09/rideshare_featured_image.jpg" 
                  alt="MobiSplit Verification Checkpoint Screening Graphic" 
                  className="w-full h-[180px] sm:h-[220px] object-cover filter brightness-90 contrast-100"
                />
                <div className="p-4 absolute bottom-0 left-0 z-20">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/40 px-2 py-0.5 rounded">VERIFIED PROTOCOLS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CARD STRUCTURES: THE 4 PILLARS OF PASSENGER SAFETY ─── */}
        <section className="py-20 bg-zinc-950">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 space-y-16">
            
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">Core Safety Infrastructures</h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm font-medium">
                Four dedicated operational frameworks optimized to make every shared trip completely predictable and secure.
              </p>
              {/* Structural Break Line */}
              <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4 hover:border-zinc-700 transition duration-200 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">1. Verified Drivers Only</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    Every community lift club driver must pass strict documentation screenings, uploading clear driver licenses and vehicle roadworthy certificates before being matched.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-tight">Active Checkpoint Protocol</div>
              </div>

              {/* Card 2 */}
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4 hover:border-zinc-700 transition duration-200 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">2. Real-Time Tracking</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    All lift club matched trips are continuously monitored using real-time GPS tracking data structures to ensure detours or anomalies are easily flagged.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-tight">Active Telematics Stream</div>
              </div>

              {/* Card 3 */}
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4 hover:border-zinc-700 transition duration-200 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">3. Share Trip Details</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    Passengers can instantly broadcast live route tracking updates, vehicle license credentials, and expected arrival targets directly to trusted external contacts.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-tight">External Synchronization</div>
              </div>

              {/* Card 4 */}
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4 hover:border-zinc-700 transition duration-200 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">4. Secure In-App Wallets</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    No physical cash exchange is required. Cost contributions are processed strictly using secure automated digital wallet infrastructure interfaces.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-tight">Paystack Secured System</div>
              </div>
            </div>

            {/* Break Line Separator */}
            <div className="w-full h-px bg-zinc-900" />

            {/* ─── STEP BY STEP COMMUTER SAFETIP CHECKPOINTS ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">// Procedural Protocol</span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">Your Pre-Trip Inspection Routine</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
                  We highly encourage passengers to execute these threshold verification checkpoints before physically boarding any matched community lift club vehicle.
                </p>
              </div>

              <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 text-cyan-400">01</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Verify License Plate Matrix</h4>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">Always verify that the oncoming physical registration plates correspond perfectly with the digital record display elements on your mobile app dashboard.</p>
                  </div>
                </div>

                <div className="w-full h-px bg-zinc-800/60" />

                <div className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 text-cyan-400">02</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Confirm Driver Profile Matches</h4>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">Visually crosscheck the individual operating the vehicle against the system profile photo before entering or sitting inside the cabin space.</p>
                  </div>
                </div>

                <div className="w-full h-px bg-zinc-800/60" />

                <div className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 text-cyan-400">03</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Maintain Seatbelt Compliance</h4>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">Ensure structural safety boundaries are fully maintained by buckling up immediately for the complete duration of the shared route track.</p>
                  </div>
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