import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// Layout Component Containers
import Navbar from "../container/Navbar";
import FooterView from "../container/FooterView";

export default function SupportArchitecture() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("riders");

  // Mock Help Article Matrix for High-Density UI Search
  const supportArticles = {
    riders: [
      { id: "r1", title: "How do I split fare costs with fellow passengers?", excerpt: "Learn how the MobiSplit algorithm matches you with community pool members to divide fuel expenses cleanly." },
      { id: "r2", title: "Passenger Code of Conduct & Spatial Etiquette", excerpt: "Review community rules regarding time windows, luggage limits, and respect within member vehicles." },
      { id: "r3", title: "Amending your pickup address coordinates", excerpt: "How to safely update your designated corridor rendezvous point before the driver departs." }
    ],
    drivers: [
      { id: "d1", title: "Mandatory Insurance Compliance Standards", excerpt: "Why valid comprehensive or third-party vehicle insurance is non-negotiable for platform access." },
      { id: "d2", title: "Understanding your cost-share transaction ledger", excerpt: "A breakdown of how community maintenance contributions accumulate in your secure digital wallet." },
      { id: "d3", title: "Managing fixed route matching preferences", excerpt: "Configure your daily workspace commute tracks to optimize matching with aligned passengers." }
    ],
    fleet: [
      { id: "f1", title: "Registering multiple vehicles under a unified profile", excerpt: "How structural fleet operators can upload, manage, and audit multiple commuter vehicles simultaneously." },
      { id: "f2", title: "Assigning verified operators to listed vehicles", excerpt: "Link registered drivers securely to distinct profile assets within your fleet cluster dashboard." },
      { id: "f3", title: "Compliance auditing and renewal alerts", excerpt: "Set up warning triggers for upcoming license disk expiries and mandatory vehicle fitness evaluations." }
    ]
  };

  // Filter strategy based on user input query
  const getFilteredArticles = () => {
    const currentArticles = supportArticles[activeTab] || [];
    if (!searchQuery.trim()) return currentArticles;
    return currentArticles.filter(
      article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans tracking-tight antialiased selection:bg-zinc-950 selection:text-white">
      <Head>
        <title>MobiSplit Support Architecture | Help Center</title>
        <meta name="description" content="Get professional support for passengers, drivers, and fleet operators on South Africa's premier cost-sharing lift club network." />
      </Head>

      {/* ─── DYNAMIC NAVIGATION HEADER ─── */}
      <Navbar />

      <main>
        
        {/* ─── PREMIUM CUSTOM STYLED HERO SECTION (HIGH RESOLUTION STOCK INTEGRATION) ─── */}
        <section className="relative w-full h-[440px] sm:h-[480px] flex items-center justify-center overflow-hidden border-b border-zinc-200 bg-zinc-950">
          {/* Hero Asset Layer */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://t4.ftcdn.net/jpg/03/16/51/05/360_F_316510536_j3w4KxGWQwNFQaAuLYQWeWBEmibUkCHK.jpg" 
              alt="MobiSplit Customer Experience and Help Support Ecosystem" 
              className="w-full h-full object-cover object-center brightness-[0.35] contrast-[1.05]"
            />
          </div>
          
          {/* Subtle Structural Design Accents */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full bg-black/20 pointer-events-none" />

          {/* Centered Content Card Matrix */}
          <div className="relative z-10 max-w-[850px] w-full px-6 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1 text-[10px] font-mono tracking-widest text-zinc-200 font-bold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Support Center
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-none">
              How can we help you today?
            </h1>
            <p className="text-zinc-300 max-w-xl mx-auto text-xs sm:text-sm font-medium leading-relaxed">
              Search for immediate answers across our service pathways, compliance rules, and structural multi-car operations management.
            </p>

            {/* Uber/Bolt Style Unified Floating Search Bar */}
            {/* <div className="max-w-2xl mx-auto w-full pt-2">
              <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200/80 p-1.5 flex items-center gap-3">
                <div className="pl-3.5 text-zinc-400 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text"
                  placeholder="Search articles, legal insurance guidelines, billing terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-3 text-sm text-zinc-900 placeholder-zinc-400 font-medium focus:outline-none"
                />
              </div>
            </div> */}
          </div>
        </section>


        {/* ─── INTERACTIVE KNOWLEDGE BASE TAB SEPARATOR ─── */}
        <section className="bg-zinc-50 border-b border-zinc-200/80 sticky top-[85px] z-30">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16">
            <div className="flex space-x-8 overflow-x-auto scrollbar-none">
              
              <button 
                onClick={() => { setActiveTab("riders"); setSearchQuery(""); }}
                className={`py-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap focus:outline-none flex items-center gap-2 ${
                  activeTab === "riders" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Riders Hub</span>
              </button>

              <button 
                onClick={() => { setActiveTab("drivers"); setSearchQuery(""); }}
                className={`py-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap focus:outline-none flex items-center gap-2 ${
                  activeTab === "drivers" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Drivers Architecture</span>
              </button>

              <button 
                onClick={() => { setActiveTab("fleet"); setSearchQuery(""); }}
                className={`py-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap focus:outline-none flex items-center gap-2 ${
                  activeTab === "fleet" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Fleet Operations</span>
              </button>

            </div>
          </div>
        </section>


        {/* ─── CENTRAL KNOWLEDGE ARCHITECTURE DYNAMIC WRAPPER ─── */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-[1300px] px-6 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content Column: Dynamic Knowledge Articles Feed */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* ─── RIDER CORE INTERFACE VIEW ─── */}
              {activeTab === "riders" && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-zinc-100 pb-4">
                    <h2 className="text-2xl font-black tracking-tight text-zinc-900">Rider Help & Shared Commutes</h2>
                    <p className="text-xs text-zinc-500 font-medium">Your absolute resource template for booking safety, fair split rules, and route protocols.</p>
                  </div>
                  
                  {/* High-density layout iteration */}
                  <div className="divide-y divide-zinc-100">
                    {getFilteredArticles().map((article) => (
                      <div key={article.id} className="py-5 group cursor-pointer">
                        <h3 className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition duration-150 flex items-center justify-between">
                          <span>{article.title}</span>
                          <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-medium">{article.excerpt}</p>
                      </div>
                    ))}
                    {getFilteredArticles().length === 0 && (
                      <p className="text-xs font-mono text-zinc-400 py-6">No matching rider articles found matching your query.</p>
                    )}
                  </div>
                </div>
              )}

              {/* ─── DRIVER CORE INTERFACE VIEW WITH MANDATORY COMPULSORY INSURANCE STATEMENT ─── */}
              {activeTab === "drivers" && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-zinc-100 pb-4">
                    <h2 className="text-2xl font-black tracking-tight text-zinc-900">Driver Compliance & Operational Directives</h2>
                    <p className="text-xs text-zinc-500 font-medium">Operational requirements, digital ledger access setups, and mandatory safety mandates.</p>
                  </div>

                  {/* 🚨 CRITICAL LEGAL PROTECTION INSULATOR BANNER: COMPULSORY INSURANCE WARNING */}
                  <div className="bg-rose-50 border-2 border-rose-500/20 p-6 rounded-2xl space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/[0.02] rounded-full translate-x-6 -translate-y-6 pointer-events-none" />
                    
                    <div className="flex items-center gap-2 text-rose-700">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <h3 className="text-xs font-black uppercase tracking-wider font-mono">Critical Compliance Directive: Insurance Requirements</h3>
                    </div>
                    
                    <p className="text-xs text-rose-800 leading-relaxed font-medium">
                      To safeguard the longevity of our community ecosystem, **valid commercial, comprehensive, or third-party vehicle insurance is strictly compulsory** for all participating operators. MobiSplit operates strictly as a peer-to-peer cost-sharing matching mechanism. Maintaining explicit independent insurance cover remains a non-negotiable legal prerequisite to eliminate platform liability matrices, completely insulate the brand infrastructure from litigation variables, and prevent MobiSplit from being exposed to third-party claims or lawsuit frameworks. Non-compliance results in immediate and permanent account suspension.
                    </p>
                  </div>
                  
                  {/* Standard Driver Articles Grid */}
                  <div className="divide-y divide-zinc-100 pt-2">
                    {getFilteredArticles().map((article) => (
                      <div key={article.id} className="py-5 group cursor-pointer">
                        <h3 className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition duration-150 flex items-center justify-between">
                          <span>{article.title}</span>
                          <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-medium">{article.excerpt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── FLEET MANAGEMENT INTERFACE VIEW ─── */}
              {activeTab === "fleet" && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-4 border-b border-zinc-100 pb-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black tracking-tight text-zinc-900">Fleet Operations & Asset Control</h2>
                      <p className="text-xs text-zinc-500 font-medium">Scalable structures for multi-car organizers, transport syndicates, and comprehensive dashboard reporting.</p>
                    </div>

                    {/* Proactive Fleet CTA Onboarding Module */}
                    <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Register Your Fleet Assets</h4>
                        <p className="text-xs text-zinc-500 font-medium">Own multiple vehicles? Provision them seamlessly under a consolidated corporate entity profile.</p>
                      </div>
                      <Link href="/auth/register?type=fleet" passHref>
                        <button className="bg-zinc-900 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition duration-150 whitespace-nowrap shrink-0">
                          Register Fleet
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Fleet Articles Feed */}
                  <div className="divide-y divide-zinc-100">
                    {getFilteredArticles().map((article) => (
                      <div key={article.id} className="py-5 group cursor-pointer">
                        <h3 className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition duration-150 flex items-center justify-between">
                          <span>{article.title}</span>
                          <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-medium">{article.excerpt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Premium Sticky Contact Ledger Card Module */}
            <div className="lg:col-span-4 lg:sticky lg:top-40">
              <div className="bg-zinc-950 text-white rounded-3xl p-6 border border-zinc-900 shadow-2xl space-y-6 relative overflow-hidden">
                {/* Structural Graphic Glow Backdrop Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* BRAND ATTACHMENT CARD SECTION */}
                <div className="flex items-center gap-4 border-b border-zinc-900 pb-5">
                  <div className="w-14 h-14 bg-black border border-zinc-800 rounded-xl flex items-center justify-center p-1 relative overflow-hidden shrink-0">
                    <Image 
                      src="/images/logoroza.png" 
                      alt="MobiSplit Verified Support Matrix" 
                      layout="fill"
                      objectFit="contain"
                      className="brightness-110 contrast-105 scale-105"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-black">// Direct Contact Hub</span>
                    <h3 className="text-sm font-bold text-white tracking-tight">MobiSplit Desk ZA</h3>
                  </div>
                </div>

                {/* EXPLICIT CONTACT DETAILS METRICS */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Office Telephony Network</p>
                    <a href="tel:+27115550192" className="text-xs font-semibold text-zinc-200 hover:text-blue-400 transition block">
                      069 404 2017
                    </a>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Support Routing E-mail</p>
                    <a href="mailto:support@mobisplit.co.za" className="text-xs font-semibold text-zinc-200 hover:text-blue-400 transition block break-all">
                      weziwe@mobisplit.co.za
                    </a>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Headquarters Operational Ledger</p>
                    <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                      La Fab Trading and Projects Initiative,<br />
                      514A THUENS VAN NIEKERK<br />
                      WIERDA PARK,CENTURION
                      
                    </p>
                  </div>
                </div>

                <hr className="border-zinc-900" />

                {/* <button 
                  onClick={() => alert("Initializing live agent handshake protocol...")}
                  className="w-full bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition duration-150 transform active:scale-98 shadow-md"
                >
                  Initiate Live Chat
                </button> */}
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* ─── DYNAMIC NAVIGATION FOOTER ─── */}
      <FooterView />
    </div>
  );
} 