import React from "react";
import Head from "next/head";
import Link from "next/link";

// Premium Structural Component Layouts
import Navbar from "../container/Navbar";
import FooterView from "../container/FooterView";

export default function FleetGuidelinePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans tracking-tight antialiased selection:bg-emerald-500 selection:text-white">
      <Head>
        <title>Fleet Integration & Vehicle Hire Guidelines | MobiSplit</title>
        <meta name="description" content="Step-by-step guideline framework to register logistics fleets, bakkies, and commercial vehicles for hire on the MobiSplit application." />
      </Head>

      {/* CORE TOP NAVIGATION */}
      <Navbar />

      <main>
        
        {/* ─── PREMIUM HERO SCREEN (IMAGE 1) ─── */}
        <section className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center overflow-hidden border-b border-zinc-100 bg-zinc-950">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://img.magnific.com/premium-photo/vehicles-parking-lot-are-shining-from-recent-repair-as-fleet-manager-uses-tablet-talk-logistics-with-driver_28914-85993.jpg?semt=ais_hybrid&w=740&q=80" 
              alt="MobiSplit Fleet Manager tracking logistics fleet vehicles in parking lot using a tablet interface" 
              className="w-full h-full object-cover object-center brightness-[0.32] contrast-[1.05]"
            />
          </div>
          {/* Pure Visual Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none z-10" />
          
          <div className="relative z-20 max-w-[1000px] w-full px-6 text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 rounded-full px-4 py-1 text-[10px] font-mono tracking-widest text-emerald-400 font-black uppercase">
              Logistics Network Manifest
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none">
              Turn Your Fleet Assets <br /> Into Consistent Revenue
            </h1>
            <p className="text-zinc-300 max-w-xl mx-auto text-xs sm:text-sm font-medium leading-relaxed">
              A comprehensive operational blueprint for owners looking to register bakkies, trucks, and commercial transport vehicles for hire on the MobiSplit platform ecosystem.
            </p>
          </div>
        </section>


        {/* ─── THREE-STEP APP REGISTRATION GUIDELINE (GLOW HOVER EFFECTS) ─── */}
        <section className="py-24 bg-white relative">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 space-y-16">
            
            <div className="text-center space-y-3">
              <span className="text-[10px] font-mono font-black text-emerald-600 uppercase tracking-widest">// Quick Onboarding Pipeline</span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">The Path to Fleet Integration</h2>
              <p className="text-zinc-500 max-w-lg mx-auto text-xs sm:text-sm font-medium leading-relaxed">
                Review the structural phases required to complete your registration sequence via the mobile application.
              </p>
              {/* Structural Line Break Separator */}
              <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full mt-4" />
            </div>

            {/* Glowing Hover Cards Grid Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Step 1 Card */}
              <div className="group relative bg-white border border-zinc-200/80 p-8 rounded-3xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition duration-200">
                    {/* react-icons/hi: HiOutlineDownload */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-zinc-400">Phase 01</span>
                    <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900">Download MobiSplit</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    Locate the official MobiSplit utility executable via the Apple App Store or Google Play Store environment. Ensure your terminal configuration matches our minimum mobile build matrices.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-tight border-t border-zinc-100 pt-3">
                  Available for iOS & Android
                </div>
              </div>

              {/* Step 2 Card */}
              <div className="group relative bg-white border border-zinc-200/80 p-8 rounded-3xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition duration-200">
                    {/* react-icons/hi: HiOutlineUserAdd */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-zinc-400">Phase 02</span>
                    <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900">Profile Authentication</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    Launch the app profile deployment interface. Register your standard commercial data streams and configure your verified secure backend payout credentials seamlessly.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-tight border-t border-zinc-100 pt-3">
                  Secure User Verification
                </div>
              </div>

              {/* Step 3 Card */}
              <div className="group relative bg-white border border-zinc-200/80 p-8 rounded-3xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition duration-200">
                    {/* react-icons/hi: HiOutlineTruck */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-zinc-400">Phase 03</span>
                    <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900">List Fleet Assets</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    Navigate to the specialized 'Hire Sections' module. Upload vehicle identification documents, asset classifications, and customized active bidding rates.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-tight border-t border-zinc-100 pt-3">
                  Live Market Bidding System
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ─── VISUAL SPLIT SCREEN: CARGO LOGISTICS DETAILS (IMAGE 2) ─── */}
        <section className="py-20 bg-zinc-50 border-t border-b border-zinc-100">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Clipart Style Image Representation */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative border border-zinc-200 bg-white p-4 rounded-3xl shadow-xl max-w-md transform -rotate-1 hover:rotate-0 transition duration-300">
                <img 
                  src="https://img.freepik.com/free-vector/transportation-cargo-merchandise-logistic-cartoon_18591-52474.jpg?semt=ais_hybrid&w=740&q=80" 
                  alt="MobiSplit Cargo transportation logistic cartoon flat vector illustration framework" 
                  className="w-full h-auto rounded-2xl object-cover mix-blend-multiply"
                />
              </div>
            </div>

            {/* Right Column Compliance Mapping */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1 bg-zinc-200 text-zinc-800 border border-zinc-300/80 rounded-md px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase">
                Asset Allocation Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                Optimized For Multi-Category <br /> Commercial Freight Logistics
              </h2>
              <p className="text-zinc-600 text-xs sm:text-sm font-medium leading-relaxed">
                MobiSplit matches diverse client demands with available supply. By categorizing your hardware assets perfectly on the app interface, you allow localized dispatch algorithms to prioritize your entries.
              </p>
              
              {/* Structural Bullet Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3 items-start">
                  {/* react-icons/fi: FiCheckCircle */}
                  <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-xs text-zinc-500 font-medium"><strong className="text-zinc-800 font-bold block mb-0.5">Automated Bidding Engine:</strong> Receive real-time load requests and submit competitive quotes immediately through our transparent bidding matrices.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-xs text-zinc-500 font-medium"><strong className="text-zinc-800 font-bold block mb-0.5">Geofenced Tracking Framework:</strong> Monitor precisely where your field assets are routing via native React Native Expo location data maps.</p>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ─── BAKKIE HIRE MATRIX SECTION (IMAGE 3) ─── */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 ordered-2 lg:order-1">
              <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest">// Localized Capacity Vehicles</span>
              <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                Bakkie & Light Delivery Utility Fleet Verification
              </h2>
              {/* Structural Line Break */}
              <div className="w-16 h-0.5 bg-zinc-200" />
              
              <p className="text-zinc-600 text-xs sm:text-sm font-medium leading-relaxed">
                Whether you manage an independent single-bakkie logistics setup or control a comprehensive corporate transport network, our application structure scales to your hardware constraints. Setting clear vehicle attributes helps matching frameworks point users in your direction.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white border border-zinc-200/80 p-4 rounded-2xl shadow-sm">
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Upload Threshold Checklist</h4>
                  <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Requires valid national registration certificates, proof of active comprehensive vehicle insurance portfolios, and current driver licensing profiles.</p>
                </div>
                <div className="bg-white border border-zinc-200/80 p-4 rounded-2xl shadow-sm">
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Paystack Disbursal System</h4>
                  <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">All hire transactional funds settle cleanly into your built-in digital application wallet, featuring simple clearing protocols directly into your linked corporate banking accounts.</p>
                </div>
              </div>
            </div>

            {/* Right Column Image Container Display */}
            <div className="lg:col-span-5 ordered-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-sm bg-zinc-50 border border-zinc-200 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-emerald-500/30">
                <img 
                  src="https://www.spartantruckhire.co.za/wp-content/uploads/2023/09/Bakkie-hire-Spartan-th1-1024x512.png" 
                  alt="MobiSplit Commercial Bakkie Light Delivery Vehicle Hire guidelines showcase" 
                  className="w-full h-auto object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
            </div>

          </div>
        </section>


        {/* ─── DEMENTIONAL DOCUMENT REQUIREMENTS GLOWING INFO PANEL ─── */}
        <section className="pb-24 bg-white">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16">
            <div className="relative w-full bg-zinc-950 text-white rounded-[2rem] p-8 sm:p-12 overflow-hidden border border-zinc-900 shadow-2xl group hover:shadow-[0_0_50px_rgba(16,185,129,0.08)] transition-all duration-500">
              {/* Internal Abstract Background Glow */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl space-y-6">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full">
                  Compliance Rule Matrix
                </span>
                <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
                  Ready to onboarding? Keep these system parameter files prepared for seamless registration.
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed">
                  Before launching the application onboarding portal, please make sure you have access to clear digital copies of your driver's operating licensing records, up-to-date motor vehicle inspection forms, and valid corporate entity proof documentation if you are deploying assets under an organization umbrella.
                </p>
                
                {/* Structural Layout Line Break */}
                <div className="w-full h-px bg-zinc-900 my-2" />
                
                <p className="text-[11px] text-zinc-500 font-mono italic">
                  Note: This layout functions strictly as an educational deployment guideline framework. Genuine system profile activation steps must be initiated exclusively within the official active mobile client dashboard interfaces.
                </p>
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