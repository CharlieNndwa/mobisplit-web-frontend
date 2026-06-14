import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineSparkles, HiOutlineCheckCircle, HiArrowSmRight } from "react-icons/hi";
import { gsap } from "gsap";

// Import your custom layout containers
import Navbar from "../container/Navbar";
import FooterView from "../container/FooterView";

// Import your newly authored premium design module
import StepProposition from "../components/StepProposition";

export default function PlanRidePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    // 🍏 Client-side premium GSAP Context entry animation engine
    let ctx = gsap.context(() => {
      gsap.from(".animate-fade-in", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white text-[#1d1d1f] min-h-screen overflow-x-hidden font-sans selection:bg-cyan-500/20">
      
      {/* ================= STICKY APPLE NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO INTRO SECTION ================= */}
      <section className="w-full py-16 lg:py-24 px-6 xl:px-16 border-b border-[#f5f5f7] bg-gradient-to-b from-[#fafafa] to-white relative">
        {/* Soft Ambient Light Glow Accents */}
        <div className="absolute top-12 right-12 w-[280px] h-[280px] bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
        
        <div className="mx-auto max-w-[1300px] w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Content Mechanics */}
          <div className="md:col-span-7 space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-[#f5f5f7] border border-[#e8e8ed] px-4 py-1.5 rounded-full text-[11px] font-mono font-bold text-[#86868b] tracking-wider uppercase shadow-inner">
              <HiOutlineSparkles className="text-cyan-500 animate-pulse" />
              Smart Cost-Sharing Lift Clubs
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[1.12]">
              Plan your journey. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d1d1f] via-[#515154] to-[#86868b]">
                Split travel costs.
              </span>
            </h1>
            
            <p className="text-lg text-[#6e6e73] font-normal leading-relaxed max-w-xl">
              Welcome to the neighborhood network. MobiSplit connects verified commuters traveling along identical routes so you can share travel metrics and petrol costs seamlessly.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="#download-app-section"
                className="inline-flex items-center gap-2 bg-[#1d1d1f] text-white hover:bg-[#323236] px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 shadow-md"
              >
                Get App & Book Now
                <HiArrowSmRight size={18} />
              </a>
              <Link href="/services" passHref>
                <span className="inline-flex items-center gap-2 bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] border border-[#e8e8ed] px-6 py-3 rounded-xl font-medium cursor-pointer transition-all duration-300">
                  See How It Works
                </span>
              </Link>
            </div>
          </div>

          {/* Hero Illustration Media frame */}
          <div className="md:col-span-5 flex justify-center items-center w-full animate-fade-in">
            <div className="relative w-full max-w-[440px] aspect-square rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.06)] bg-white border border-[#e8e8ed]">
              <img
                src="https://media.istockphoto.com/id/511931816/vector/person-using-a-rideshare-mobile-application-on-a-tablet.jpg?s=612x612&w=0&k=20&c=Vl2bB5SD8_UcZYiuTVzrC5gZYnv6785guS4LGnLGMdY="
                alt="Person scheduling a ride share pool with MobiSplit ecosystem software"
                className="w-full h-full object-cover filter contrast-[1.01]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= DYNAMIC ATOMIC LEGO-APPLE STEP PROPOSITION ORGANISM ================= */}
      <StepProposition />

      {/* ================= DRIVER ACQUISITION HUB ================= */}
      <section className="w-full py-20 lg:py-24 px-6 xl:px-16 bg-[#fafafa] relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-[260px] h-[260px] bg-gradient-to-tr from-lime-400/10 to-transparent rounded-full blur-[75px] pointer-events-none" />

        <div className="mx-auto max-w-[1300px] w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Driver Media Block */}
          <div className="md:col-span-5 flex justify-center items-center w-full order-2 md:order-1 animate-fade-in">
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)] bg-white border border-[#e8e8ed]">
              <img
                src="https://img.freepik.com/free-photo/portrait-positive-african-american-lady-inside-car_93675-133553.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Earn as an asset sharing driver partner within MobiSplit"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Driver Content Framework */}
          <div className="md:col-span-7 space-y-6 order-1 md:order-2 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white border border-[#e8e8ed] px-4 py-1.5 rounded-full text-[11px] font-mono font-bold text-lime-600 tracking-wider uppercase shadow-sm">
              Earn with MobiSplit
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
              Offset your fuel overheads. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d1d1f] via-[#515154] to-[#86868b]">
                Drive with our community.
              </span>
            </h2>
            
            <p className="text-base text-[#6e6e73] leading-relaxed">
              Have an active commuter vehicle? Turn your daily route space into structural cost recovery. Coordinate seamlessly with passengers heading your way and split petrol expenses down to the exact cent via real-time ledgers.
            </p>

            <div className="space-y-3 max-w-xl text-sm text-[#515154]">
              <div className="flex items-center gap-3">
                <HiOutlineCheckCircle className="text-lime-500 flex-shrink-0" size={18} />
                <span>Fixed profile accounts securely designated on initial sign up</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineCheckCircle className="text-cyan-500 flex-shrink-0" size={18} />
                <span>Cryptographic transaction ledgers for transparent cost-splits</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineCheckCircle className="text-lime-500 flex-shrink-0" size={18} />
                <span>Complete route flexibility centered entirely around your schedule</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= INTEGRATED DOWNLOAD SECTION ================= */}
      <div id="download-app-section" className="w-full bg-[#0a0a0c]">
        <section className="w-full bg-[#0a0a0c] text-white py-20 px-6 xl:px-16 relative overflow-hidden border-t border-[#1c1c1e]">
          <div className="absolute top-1/4 -left-20 w-[300px] h-[300px] bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-gradient-to-br from-lime-500/10 to-transparent rounded-full blur-[90px] pointer-events-none" />

          <div className="mx-auto max-w-[1300px] w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#1c1c1e] border border-[#2c2c2e] px-4 py-1.5 rounded-full text-[11px] font-mono font-bold text-[#8e8e93] tracking-wider shadow-inner">
                  <HiOutlineSparkles className="text-cyan-400 animate-pulse" />
                  NOW AVAILABLE FOR IOS & ANDROID
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  Download <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d2d2d7] to-[#86868b]">
                    our app
                  </span>
                </h2>
                
                <p className="text-base text-[#8e8e93] font-normal leading-relaxed max-w-xl">
                  Get moving with MobiSplit. Connect with verified lifts heading your way, share travel and petrol costs seamlessly, and stay protected with our community standard workflows.
                </p>
              </div>

              <div className="space-y-3 max-w-md">
                <div className="flex items-center gap-3 text-sm text-[#d2d2d7]">
                  <HiOutlineCheckCircle className="text-cyan-400 flex-shrink-0" size={18} />
                  <span>Real-time local lift club matching parameters</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#d2d2d7]">
                  <HiOutlineCheckCircle className="text-lime-400 flex-shrink-0" size={18} />
                  <span>Cryptographic transaction ledgers for transparent splits</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#d2d2d7]">
                  <HiOutlineCheckCircle className="text-cyan-400 flex-shrink-0" size={18} />
                  <span>Verified driver profile verification protocols</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="https://play.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-[#2c2c2e] px-4 py-2 rounded-xl transition-all duration-300 transform active:scale-95 group"
                >
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmTZY8O-RieDDzSlR_A6Uwc3HIWqW7Ao19Tw&s" 
                    alt="Google Play Logo" 
                    className="w-5 h-5 object-contain"
                  />
                  <div className="text-left">
                    <p className="text-[8px] uppercase tracking-wider text-[#8e8e93] font-mono">GET IT ON</p>
                    <p className="text-xs font-semibold text-white tracking-tight group-hover:text-cyan-400 transition-colors">Google Play</p>
                  </div>
                </a>

                <a 
                  href="https://www.apple.com/app-store" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-[#2c2c2e] px-4 py-2 rounded-xl transition-all duration-300 transform active:scale-95 group"
                >
                  <img 
                    src="https://img.icons8.com/color/1200/apple-app-store--v1.jpg" 
                    alt="Apple App Store Logo" 
                    className="w-5 h-5 object-contain"
                  />
                  <div className="text-left">
                    <p className="text-[8px] uppercase tracking-wider text-[#8e8e93] font-mono">DOWNLOAD ON THE</p>
                    <p className="text-xs font-semibold text-white tracking-tight group-hover:text-lime-400 transition-colors">App Store</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center items-center w-full relative">
              <div className="relative w-full max-w-[320px] md:max-w-none aspect-[3/4] h-[400px] md:h-[480px]">
                <Image
                  src="/images/Phone.png"
                  alt="MobiSplit Mobile Application System Environment Showcase"
                  layout="fill"
                  objectFit="contain"
                  className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                  priority
                />
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* ================= PREMIUM MOBISPLIT FOOTER ================= */}
      <FooterView />

    </div>
  );
}