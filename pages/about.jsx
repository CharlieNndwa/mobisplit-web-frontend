import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineCash,
  HiOutlineLightningBolt,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineCheckCircle,
  HiOutlineGlobeAlt,
  HiOutlineUser,
} from "react-icons/hi";

// Import Layout Components
import Navbar from "../container/Navbar";
import FooterView from "../container/FooterView";

export default function AboutUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth staggering premium entrance animations
      gsap.from(".animate-fade-up", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Subtle atmospheric animation for premium background layout accents
      gsap.to(".magic-pattern-blob", {
        x: 25,
        y: -25,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head>
        <title>About Us – MobiSplit</title>
        <meta
          name="description"
          content="MobiSplit is a community-driven lift club platform built on trust, collaboration, and shared responsibility."
        />
      </Head>

      {/* Dynamic Global Navigation Bar Layer */}
      <Navbar />

      <div
        ref={containerRef}
        className="bg-white text-[#1d1d1f] min-h-screen font-sans overflow-hidden selection:bg-[#f5f5f7] selection:text-black"
      >
        {/* ─── ENHANCED HERO SECTION: RIDESHARE SIDE-BY-SIDE FLAGSHIP LAYOUT ─── */}
        <section className="relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-center bg-white border-b-2 border-zinc-100 px-6 xl:px-16 py-12 overflow-hidden">
          {/* Subtle atmospheric blueprint grid lines for a professional tech feel */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="mx-auto max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column: Premium Text & Action Panel */}
            <div className="lg:col-span-6 space-y-6 text-left animate-fade-up">
              {/* Vibrant Interactive Community Tag */}
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold text-emerald-700 tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                COMMUNITY LIFT CLUB INITIATIVE
              </div>

              {/* High-Impact Rideshare Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-zinc-950 tracking-tight leading-[1.05] uppercase">
                  About Us <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">
                    MobiSplit
                  </span>
                </h1>
                <p className="text-lg text-zinc-600 font-medium leading-relaxed max-w-xl">
                  A community-driven lift club platform created to make
                  transport more affordable, safe, and accessible. We connect
                  people traveling in the same direction, enabling them to share
                  rides and petrol costs.
                </p>
              </div>

              {/* Action Buttons inspired by Uber & Bolt App Prompts */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link href="/auth/register" passHref>
                  <button className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-900 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] text-sm uppercase tracking-wider text-center">
                    Get Moving Now
                  </button>
                </Link>
                <a href="#our-commitment" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-zinc-50 hover:bg-zinc-100 border-2 border-zinc-200/80 text-zinc-800 font-bold px-8 py-4 rounded-xl transition-all duration-200 active:scale-[0.98] text-sm uppercase tracking-wider text-center">
                    Learn More ↓
                  </button>
                </a>
              </div>

              {/* Fast Trust Metric Strip */}
              <div className="pt-6 border-t border-zinc-100 flex items-center gap-8 text-zinc-500 font-mono text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 text-base">✔</span> 100%
                  VERIFIED DRIVERS
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-cyan-500 text-base">✦</span> NO HIDDEN
                  FEES
                </div>
              </div>
            </div>

            {/* Right Column: Original Media Block with Overlapping Context Layout Elements */}
            <div className="lg:col-span-6 relative flex justify-center items-center h-[350px] sm:h-[450px] lg:h-[550px] w-full animate-fade-up">
              {/* Soft Ambient Radial Blur Glow Pattern */}
              <div className="magic-pattern-blob absolute -top-10 -right-10 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-200/20 to-blue-200/30 rounded-full blur-[90px] pointer-events-none z-0" />

              {/* Premium Precision Frame housing the Original Unsplash Image */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.08)] border-4 border-white z-10 bg-zinc-50">
                <img
                  src="https://images.unsplash.com/photo-1575551424332-49525ff5c379?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="MobiSplit Operational Environment"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Overlapping Floating Component Card: Live Route Cost Display (InDrive / Bolt Style) */}
              <div
                className="absolute bottom-6 left-6 sm:-left-6 bg-white border border-zinc-100 p-4 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.12)] z-20 flex items-center gap-4 max-w-[260px] hidden sm:flex animate-bounce"
                style={{ animationDuration: "4s" }}
              >
                <div className="w-12 h-12 bg-cyan-500 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-md shadow-cyan-500/20">
                  R
                </div>
                <div>
                  <p className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Average Cost
                  </p>
                  <p className="text-base font-black text-zinc-900">
                    Split 50% Cheaper
                  </p>
                </div>
              </div>

              {/* Overlapping Floating Component Card: Secure Match Prompt */}
              <div className="absolute top-8 right-6 sm:-right-4 bg-zinc-950 text-white p-4 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] z-20 flex items-center gap-3.5 max-w-[240px] hidden sm:flex">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-zinc-100">
                    Driver Connected
                  </p>
                  <p className="text-[10px] font-mono text-zinc-400">
                    Heading your way now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION: WHO WE ARE & SUBSIDIARY PLATFORM MATRIX ─── */}
        <section className="mx-auto max-w-[1300px] px-6 xl:px-16 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-[#e8e8ed]">
          <div className="lg:col-span-4 space-y-2 animate-fade-up">
            <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider">
              // Structural Identity
            </span>
            <h2 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Who We Are
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-[#424245] text-base sm:text-lg leading-relaxed animate-fade-up">
            <p className="font-normal text-[#1d1d1f]">
              Unlike traditional taxi apps, MobiSplit is not a business service
              — it’s a cost-sharing community initiative built on trust,
              collaboration, and shared responsibility.
            </p>
            <div className="p-8 rounded-2xl bg-[#f5f5f7] border border-[#e8e8ed] relative overflow-hidden group transition-all duration-300 hover:shadow-sm">
              <p className="text-[#424245] text-sm sm:text-base leading-relaxed">
                MobiSplit is a subsidiary of La Fab Trading and Projects, a
                registered private company in South Africa. This affiliation
                strengthens our foundation, ensuring that our operations are
                backed by formal governance, compliance, and long-term
                sustainability.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION: CORE INTENTIONS (3-COLUMN APPLE TRIPLETS) ─── */}
        <section className="mx-auto max-w-[1300px] px-6 xl:px-16 py-24 border-b border-[#e8e8ed]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Our Mission */}
            <div className="space-y-4 animate-fade-up border-t border-[#e8e8ed] pt-8">
              <div className="text-xs font-mono text-cyan-600 uppercase tracking-widest font-bold">
                [ Core Mission ]
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
                Our Mission
              </h3>
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                To empower communities by reducing transport costs, fostering
                connections, and creating opportunities for young people to
                participate in meaningful initiatives.
              </p>
            </div>

            {/* Why We Exist */}
            <div className="space-y-4 animate-fade-up border-t border-[#e8e8ed] pt-8">
              <div className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">
                [ Social Context ]
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
                Why We Exist
              </h3>
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                South Africa faces one of the highest youth unemployment rates
                in the world, with millions of young people struggling to find
                work. MobiSplit was born out of the belief that mobility should
                be inclusive and that community-driven solutions can create both
                economic opportunities and social impact.
              </p>
            </div>

            {/* Our Vision */}
            <div className="space-y-4 animate-fade-up border-t border-[#e8e8ed] pt-8">
              <div className="text-xs font-mono text-slate-600 uppercase tracking-widest font-bold">
                [ Future State ]
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
                Our Vision
              </h3>
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                To build a connected South Africa where transport is not a
                barrier to opportunity, and where communities thrive by
                supporting one another.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION: WHAT WE OFFER (MINIMAL BENTO BOX GRID) ─── */}
        <section className="mx-auto max-w-[1300px] px-6 xl:px-16 py-24 border-b border-[#e8e8ed]">
          <div className="space-y-2 mb-12 animate-fade-up">
            <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider">
              // Ecosystem Features
            </span>
            <h2 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#f5f5f7] border border-[#e8e8ed] rounded-2xl p-6 space-y-4 transition-all duration-300 hover:bg-white hover:shadow-lg group">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e8e8ed] flex items-center justify-center text-[#1d1d1f] group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <HiOutlineCash size={18} />
              </div>
              <h4 className="text-base font-semibold text-[#1d1d1f] tracking-tight">
                Affordable Transport
              </h4>
              <p className="text-xs text-[#6e6e73] leading-relaxed">
                Share rides and petrol costs, making travel cheaper for
                everyone.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#f5f5f7] border border-[#e8e8ed] rounded-2xl p-6 space-y-4 transition-all duration-300 hover:bg-white hover:shadow-lg group">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e8e8ed] flex items-center justify-center text-[#1d1d1f] group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <HiOutlineSparkles size={18} />
              </div>
              <h4 className="text-base font-semibold text-[#1d1d1f] tracking-tight">
                Community Lift Club
              </h4>
              <p className="text-xs text-[#6e6e73] leading-relaxed">
                A safe, trusted alternative to taxi apps, built around
                collaboration.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#f5f5f7] border border-[#e8e8ed] rounded-2xl p-6 space-y-4 transition-all duration-300 hover:bg-white hover:shadow-lg group">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e8e8ed] flex items-center justify-center text-[#1d1d1f] group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <HiOutlineLightningBolt size={18} />
              </div>
              <h4 className="text-base font-semibold text-[#1d1d1f] tracking-tight">
                Youth Empowerment
              </h4>
              <p className="text-xs text-[#6e6e73] leading-relaxed">
                Through the Ambassador Youth Program, we create pathways for
                unemployed youth to earn, gain skills, and lead in their
                communities.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#f5f5f7] border border-[#e8e8ed] rounded-2xl p-6 space-y-4 transition-all duration-300 hover:bg-white hover:shadow-lg group">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e8e8ed] flex items-center justify-center text-[#1d1d1f] group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <HiOutlineShieldCheck size={18} />
              </div>
              <h4 className="text-base font-semibold text-[#1d1d1f] tracking-tight">
                Safety & Protection
              </h4>
              <p className="text-xs text-[#6e6e73] leading-relaxed">
                Passenger protection policies ensure peace of mind for all
                members.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION: ECONOMIC ENGINE / DRIVER HUB PORTAL ─── */}
        <section className="w-full py-20 lg:py-24 px-6 xl:px-16 bg-[#fafafa] relative overflow-hidden">
          {/* Soft Ambient Light Glow Accent */}
          <div className="absolute bottom-10 left-10 w-[260px] h-[260px] bg-gradient-to-tr from-emerald-400/10 to-transparent rounded-full blur-[75px] pointer-events-none" />

          <div className="mx-auto max-w-[1300px] w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
            {/* Driver Media Block - Perfect object-fit image boundary matching your reference layout */}
            <div className="md:col-span-5 flex justify-center items-center w-full order-2 md:order-1 animate-fade-up">
              <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)] bg-white border border-[#e8e8ed]">
                <img
                  src="https://img.freepik.com/free-photo/driver-steering-wheel-car-dashboard-gps-smartphone_169016-68694.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="MobiSplit Driver Smartphone System Ecosystem"
                  className="w-full h-full object-cover contrast-[1.03] duration-500 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating System Status Micro-badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-[#e8e8ed] p-3 rounded-xl flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-[11px] font-bold text-[#1d1d1f]">
                      Driver System Environment
                    </p>
                    <p className="text-[9px] font-mono text-[#86868b]">
                      Verification Gateway Online
                    </p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>
            </div>

            {/* Driver Content Framework */}
            <div className="md:col-span-7 space-y-6 order-1 md:order-2 animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-white border border-[#e8e8ed] px-4 py-1.5 rounded-full text-[11px] font-mono font-bold text-emerald-600 tracking-wider uppercase shadow-sm">
                Earn with MobiSplit
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
                Earn by Driving. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d1d1f] via-[#515154] to-[#86868b]">
                  Power the Economic Framework.
                </span>
              </h2>

              <p className="text-base text-[#6e6e73] leading-relaxed">
                Turn your daily transit commutes into verified cost-sharing
                community support workflows. On the app, we have an integrated,
                rigorous built-in driver verification process. After
                successfully applying and finishing the security criteria, you
                will instantly be activated to earn as a trusted driver.
              </p>

              {/* Structured Core Points */}
              <div className="space-y-3 max-w-xl text-sm text-[#515154] pt-2">
                <div className="flex items-center gap-3">
                  <HiOutlineCheckCircle
                    className="text-emerald-500 flex-shrink-0"
                    size={18}
                  />
                  <span>
                    Rigorous built-in driver identity verification processing
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <HiOutlineCheckCircle
                    className="text-cyan-500 flex-shrink-0"
                    size={18}
                  />
                  <span>
                    Instant activation to earn once safety parameters are
                    matched
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/driver" passHref>
                  <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-[#1d1d1f] border border-black px-8 py-4 rounded-xl transition-all duration-300 group shadow-md transform active:scale-[0.98]">
                    <span>Apply to Drive</span>
                    <HiOutlineArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION: YOUR SAFETY DRIVES US (UBER VALUE PROPOSITION LAYOUT) ─── */}
        <section className="mx-auto max-w-[1300px] px-6 xl:px-16 py-24 border-b border-[#e8e8ed]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Copy Content Block */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1 animate-fade-up">
              <h2 className="text-3xl sm:text-5xl font-bold text-[#1d1d1f] tracking-tight">
                Your safety drives us
              </h2>
              <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed max-w-xl">
                Whether you’re in the back seat or behind the wheel, your safety
                is essential. We are committed to doing our part, and technology
                is at the heart of our approach. We partner with safety
                advocates and develop new technologies and systems to help
                improve safety and help make it easier for everyone to get
                around.
              </p>
              
              {/* Dual Safety Navigation Buttons Gateway */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link href="/driver-safety" passHref>
                  <button className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-900 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2">
                    <span>Driver Safety</span>
                    <HiOutlineArrowRight size={14} />
                  </button>
                </Link>
                <Link href="/safety-passengers" passHref>
                  <button className="w-full sm:w-auto bg-zinc-50 hover:bg-zinc-100 border-2 border-zinc-200/80 text-zinc-800 font-bold px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] text-xs uppercase tracking-wider text-center">
                    Rider Safety
                  </button>
                </Link>
              </div>
            </div>

            {/* Premium Icon Showcase Block */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-up">
              <div className="bg-[#f5f5f7] border border-[#e8e8ed] w-full max-w-md aspect-[4/3] rounded-2xl flex items-center justify-center p-8 relative overflow-hidden group hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03),transparent_60%)]" />

                {/* Elegant Centered Feature Shield Graphic Container */}
                <div className="relative w-40 h-40 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 border border-dashed border-zinc-300 rounded-full animate-[spin_30s_linear_infinite]" />
                  <div className="w-28 h-28 bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.03)] border border-[#e8e8ed] flex items-center justify-center p-5">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/128/10703/10703030.png"
                      alt="MobiSplit Core Safety Architecture Gateway"
                      className="w-full h-full object-contain filter brightness-[0.98]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION: FOUNDER EXECUTIVE BOARD CARD ─── */}
        <section className="mx-auto max-w-[1300px] px-6 xl:px-16 py-24 border-b border-[#e8e8ed]">
          <div className="space-y-2 mb-16 animate-fade-up">
            <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider">
              // Governance Framework
            </span>
            <h2 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Executive Office
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#f5f5f7] border border-[#e8e8ed] rounded-3xl p-8 md:p-12 items-center relative overflow-hidden">
            {/* Portrait Vector Space */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-[#d2d2d7] bg-white shadow-md group">
                <Image
                  src="/images/1000060836.jpg"
                  alt="Weziwe Mteto – Founder & CEO of MobiSplit"
                  layout="fill"
                  objectFit="contain" // Changed from "cover" to "contain" to reveal the whole image
                  className="p-2 grayscale hover:grayscale-0 transition-all duration-700" // Added light padding to prevent touching edges nicely
                />
              </div>
            </div>

            {/* Corporate Profile Breakdown Matrix */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                  Weziwe Mteto
                </h3>
                <p className="text-xs font-mono text-cyan-600 font-bold tracking-tight uppercase mt-1">
                  Founder | CEO
                </p>
              </div>

              <div className="h-px bg-[#e8e8ed]" />

              <p className="text-sm sm:text-base text-[#424245] leading-relaxed">
                Steering the operational architecture of MobiSplit, Weziwe Mteto
                executes the mission of deploying transport equity workflows
                while creating verified cost-sharing models for South African
                community structures.
              </p>

              {/* Verified Contact Details Grid Layer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 text-xs font-mono text-[#424245]">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#e8e8ed] flex items-center justify-center text-black shadow-sm">
                    <HiOutlinePhone size={14} />
                  </div>
                  <span>069 404 2017</span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-[#424245]">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#e8e8ed] flex items-center justify-center text-black shadow-sm">
                    <HiOutlineMail size={14} />
                  </div>
                  <span className="truncate">weziwe@mobisplit.co.za</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION: CORPORATE COMMITMENT END PLATFORM STATEMENT ─── */}
        <section className="mx-auto max-w-[1300px] px-6 xl:px-16 py-24 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-up">
            <div className="inline-flex h-[2px] w-12 bg-black mx-auto" />
            <h2 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Our Commitment
            </h2>

            <div className="text-left bg-[#f5f5f7] border border-[#e8e8ed] rounded-2xl p-6 sm:p-10 space-y-4 text-[#424245] text-sm sm:text-base leading-relaxed shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-black font-bold mt-1">▪</span>
                <p>Promoting safe, reliable, and inclusive mobility.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-black font-bold mt-1">▪</span>
                <p>
                  Empowering youth through ambassador programs and community
                  leadership.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-black font-bold mt-1">▪</span>
                <p>
                  Reinforcing that we are a lift club, not a taxi app — a
                  platform where people help each other, share costs, and travel
                  together with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Dynamic Global Footer Infrastructure Component */}
      <FooterView />
    </>
  );
}
