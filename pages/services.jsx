import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  HiOutlineSparkles, 
  HiOutlineCheckCircle, 
  HiOutlineX, 
  HiOutlineClock, 
  HiOutlineShieldCheck,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineTrendingUp,
  HiOutlineCash, // Valid icon to replace the broken currency icon
  HiOutlineUserGroup,
  HiOutlineLocationMarker
} from "react-icons/hi";
import { gsap } from "gsap";

// Import your custom layout components
import Navbar from "../container/Navbar";
import FooterView from "../container/FooterView";

export default function ServicesPage() {
  const containerRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  // Marketplace Service Streams mapped to their corresponding physical assets
  const platformServices = [
    {
      id: 1,
      title: "Smart Commutes",
      subtitle: "Affordable Rides for Smart Professionals",
      description: "Split your regular city routes 50/50. Connect with verified commuters heading to work, meetings, or leisure routines without parking worries.",
      image: "/assets/IMG-20260505-WA0029.jpg", 
      badge: "Popular",
      fee: "R5 Booking Fee",
      incentiveTier: "Professionals & Corporate Workers",
      incentiveDetails: "Designed to counteract volatile city traffic overheads. Regular weekly multi-ride booking routines unlock corporate pooling cost-recovery splits, decreasing fuel bills by up to 50% while building stable daily ride club arrangements.",
      highlights: ["Get to work on time", "Meet up with friends", "Gym & Leisure transport"]
    },
    {
      id: 2,
      title: "Campus Rides",
      subtitle: "Ride to Campus with MobiSplit!",
      description: "Affordable shared travel built directly for students on the go to commute safely between residence, classes, and social hubs without high costs.",
      image: "/assets/IMG-20260505-WA0027.jpg", 
      badge: "Student Tier",
      fee: "R2.50 Micro-Fee",
      incentiveTier: "Active Students & Academic Communities",
      incentiveDetails: "Recognizing youth budget constraints, student campus routes feature slashed platform service charges capped at a token R2.50 microtransaction fee. Group bookings for study squads further optimize fuel-sharing ratios down to minimal out-of-pocket costs.",
      highlights: ["Get to class reliably", "Group campus linkups", "Grab a bite safely"]
    },
    {
      id: 3,
      title: "Seniors on the Move",
      subtitle: "Affordable Rides for Our Senior Community",
      description: "Safe, reliable, and easy on the pocket. Empowering pensioners and senior citizens with seamless access to essential local transport.",
      image: "/assets/eldrs.png",
      badge: "Community Care",
      fee: "Subsidized Capped Splits",
      incentiveTier: "Pensioners & Senior Citizens",
      incentiveDetails: "MobiSplit honors our elders by prioritizing non-profit mutual community principles. Verified seniors qualify for structural cost-sharing safety buffers, offering fully capped fuel-split limits and relaxed off-peak scheduling tailored for ease of access.",
      highlights: ["Trips to church", "Run local errands", "Stock up on essentials"]
    },
    {
      id: 4,
      title: "Inter-Provincial Travel",
      subtitle: "For Long Distance Route Pooling",
      description: "Traveling to another city? Find verified long-distance drivers going your way on MobiSplit. Share fuel costs and travel comfortably.",
      image: "/assets/IMG-20260505-WA0032.jpg",
      badge: "Long Distance",
      fee: "R5 Booking Fee",
      incentiveTier: "Inter-City Commuters & Families",
      incentiveDetails: "Long-haul highway travel costs are heavy. This package allows long-distance travelers to consolidate into shared vehicle profiles, dividing toll fees and fuel costs evenly via real-time cryptographic transaction ledgers.",
      highlights: ["Safe cross-province routes", "Divided highway toll costs", "Spacious luggage allocation"]
    },
    {
      id: 5,
      title: "Bakkie & Utility Hire",
      subtitle: "Heavy Duty Moves Made Convenient",
      description: "Need to move furniture or building materials? Find local bakkie, van, and truck owners on MobiSplit and agree on pricing directly.",
      image: "/assets/IMG-20260505-WA0033.jpg",
      badge: "On-Demand Assets",
      fee: "R5 Booking Fee",
      incentiveTier: "Independent Asset Owners & DIY Movers",
      incentiveDetails: "Direct-to-owner asset pooling eliminates expensive logistics brokerage fees. Users connect with neighborhood bakkie owners, allowing flexible peer-to-peer price agreements with a single fixed platform tracking fee.",
      highlights: ["Move furniture easily", "Haul building materials", "Direct asset owner negotiation"]
    },
    {
      id: 6,
      title: "Logistics & Heavy Freight",
      subtitle: "Commercial Scale Transport Connections",
      description: "Direct tracking links to large-scale utility operations and freight trucks for substantial commercial shipping and heavy cargo logistics.",
      image: "/assets/meilleur-transitaire-France.png",
      badge: "Heavy Duty",
      fee: "Custom Institutional Rate",
      incentiveTier: "Commercial Entities & Freight Operators",
      incentiveDetails: "Optimizes empty haulage return legs. Commercial truck operators listing their logistical return lines are incentivized via volume tier matching, matching freight demands to vehicles that would otherwise drive empty.",
      highlights: ["Bulk supply line pairing", "Inter-hub route scheduling", "Optimized backhaul cost recovery"]
    },
    {
      id: 7,
      title: "Moms on the Go!",
      subtitle: "Safe & Affordable Rides for Busy Moms!",
      description: "The ride moms can trust. Built to alleviate daily stress by offering reliable options for family logistics, school runs, and rapid errands.",
      image: "/assets/momsongo.png",
      badge: "Family Core",
      fee: "R5 Booking Fee",
      incentiveTier: "Parents & Neighborhood Care Pools",
      incentiveDetails: "Fosters highly localized 'school pool clusters'. Parents can collaborate on rotating morning school drop-off routines with verified neighbors, reducing daily time waste while earning promotional credits through community validation.",
      highlights: ["School drop-off pairing", "Quick errand runs", "Less stress, more free time"]
    },
    {
      id: 8,
      title: "Vehicle Financial Recovery",
      subtitle: "Turn Your Car Into Cash With MobiSplit",
      description: "Falling behind on vehicle payments? Put your wheels to work, connect with local riders, and boost your monthly income safely.",
      image: "/assets/IMG-20260505-WA0026.jpg",
      badge: "Asset Optimization",
      fee: "Fuel Cost-Split Engine",
      incentiveTier: "Vehicle Owners & Commuter Drivers",
      incentiveDetails: "Converts everyday liabilities back into productive cash flow. Drivers facing financial pressure turn regular commutes into cost-recovery operations, offsetting up to 100% of monthly petrol bills via automated digital wallets.",
      highlights: ["Drive & Earn daily", "Connect with verified riders", "Boost disposable income"]
    },
    {
      id: 9,
      title: "Coastal Hub Channels",
      subtitle: "Port City Fleet Configurations",
      description: "Specialized vehicle tracking coordinates active along South African port cities, maritime logistics hubs, and coastal corridors.",
      image: "/assets/coastal.jpg",
      badge: "Port Services",
      fee: "Standard R5 Fee",
      incentiveTier: "Harbor Workers & Coastal Commuters",
      incentiveDetails: "Custom regional incentives built specifically for shift workers operating near major shipping ports and harbors, offering structured group routes timed perfectly with maritime crew rotations.",
      highlights: ["Shift alignment tracking", "Corridor pooling dynamics", "Industrial hub integration"]
    }
  ];

  // 🧊 Carousel Engine Hooks & Viewport Calculations
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [visibleCards, setVisibleCards] = useState(3); 
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => { 
    setIsMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".animate-apple-fade", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    const maxIndex = platformServices.length - visibleCards;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? platformServices.length - visibleCards : prev - 1));
  };

  return (
    <div ref={containerRef} className="w-full bg-[#fafafa] text-[#1d1d1f] min-h-screen overflow-x-hidden font-sans selection:bg-blue-500/10">
      
      {/* 🍏 STICKY PLATFORM NAVBAR */}
      <Navbar />

      {/* ================= HIGHLY POLISHED SPLIT HERO SECTION ================= */}
      <section className="w-full min-h-[75vh] md:min-h-[65vh] relative flex items-center bg-[#1d1d1f] overflow-hidden border-b border-[#e8e8ed]">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://img.magnific.com/free-photo/young-uber-driver-car-interior_23-2149149653.jpg?semt=ais_hybrid&w=740&q=80"
            alt="MobiSplit Ride Ecosystem"
            className="w-full h-full object-cover scale-105 filter contrast-125 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1d1d1f] via-[#1d1d1f]/90 to-transparent lg:w-2/3" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f] via-transparent to-transparent" />
        </div>

        <div className="mx-auto max-w-[1300px] w-full px-6 xl:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-20 pb-16">
          <div className="lg:col-span-7 space-y-5 text-white animate-apple-fade">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-md border border-blue-500/30 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold text-blue-400 tracking-wider uppercase">
              <HiOutlineSparkles />
              Services Catalog
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Tailored Services. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
                Incentivized Mobility.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#e8e8ed]/80 font-normal max-w-xl leading-relaxed">
              MobiSplit is a community-driven cost-sharing lift club initiative. Explore our structured marketplace clusters engineered with unique, verifiable platform transaction incentives.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a 
                href="#marketplace"
                className="bg-blue-600 text-white hover:bg-blue-700 font-bold px-6 py-3 rounded-lg text-xs tracking-wider uppercase shadow-lg shadow-blue-600/20 transition-all duration-200 active:scale-95"
              >
                Browse Services
              </a>
              <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                9 Managed Channel Services
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CAROUSEL MARKETPLACE SECTION ================= */}
      <section id="marketplace" className="w-full py-20 bg-white px-6 xl:px-16 relative">
        <div className="mx-auto max-w-[1300px] w-full space-y-10">
          
          {/* Carousel Meta Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f5f5f7] pb-6 animate-apple-fade">
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tight text-[#1d1d1f]">Ecosystem Service Streams</h2>
              <p className="text-xs sm:text-sm text-[#6e6e73]">Peer-to-peer asset matrices tailored for strict community cost allocation.</p>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button 
                onClick={prevSlide}
                className="p-3 rounded-xl bg-[#f5f5f7] border border-[#e8e8ed] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300 shadow-sm active:scale-95"
                aria-label="Previous slide"
              >
                <HiOutlineChevronLeft size={18} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-3 rounded-xl bg-[#f5f5f7] border border-[#e8e8ed] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300 shadow-sm active:scale-95"
                aria-label="Next slide"
              >
                <HiOutlineChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Carousel Slider Component Wrapper */}
          <div className="relative w-full overflow-hidden p-2 z-10">
            <div 
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] gap-6"
              style={{
                transform: isMounted ? `translateX(-${currentIndex * (100 / visibleCards)}%)` : "translateX(0%)"
              }}
            >
              {platformServices.map((service) => (
                <div 
                  key={service.id} 
                  className="shrink-0 group relative bg-white border border-[#e8e8ed] rounded-2xl overflow-hidden transition-all duration-500 flex flex-col justify-between hover:border-blue-500/40 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)]"
                  style={{
                    width: isMounted 
                      ? visibleCards === 3 ? "calc(33.333% - 16px)" : visibleCards === 2 ? "calc(50% - 12px)" : "100%"
                      : "calc(33.333% - 16px)"
                  }}
                >
                  {/* Top Graphic Framing */}
                  <div className="relative w-full h-64 bg-gradient-to-b from-[#fafafa] to-[#f5f5f7] flex items-center justify-center p-6 border-b border-[#f5f5f7] overflow-hidden">
                    <div className="relative w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-102">
                      <Image
                        src={service.image}
                        alt={service.title}
                        layout="fill"
                        objectFit="contain"
                        className="filter brightness-[0.98] drop-shadow-md"
                        unoptimized={true}
                      />
                    </div>
                    
                    {/* Floating Tech Badge */}
                    <div className="absolute top-4 left-4 bg-[#1d1d1f]/90 backdrop-blur-md text-white border border-stone-800 rounded-lg px-3 py-1 z-20 shadow-lg">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-blue-400">
                        {service.badge}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Main Body */}
                  <div className="p-6 relative z-10 flex-grow flex flex-col justify-between bg-white">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest">
                        <HiOutlineCash size={14} />
                        {service.fee}
                      </div>
                      <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-blue-600 transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6e6e73] font-normal leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-6 pt-4 border-t border-[#f5f5f7] flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#86868b] tracking-wider uppercase">
                        Vector Cluster 0{service.id}
                      </span>
                      <button 
                        onClick={() => setSelectedService(service)}
                        className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#1d1d1f] px-4 py-2.5 rounded-xl border border-[#1d1d1f] hover:bg-blue-600 hover:border-blue-600 shadow-md transition-all duration-300 active:scale-95"
                      >
                        Explore More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicator Bars */}
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: Math.max(1, platformServices.length - visibleCards + 1) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-8 bg-blue-600 shadow-sm" : "w-2 bg-[#e8e8ed] hover:bg-[#d2d2d7]"
                  }`}
                  aria-label={`Go to section ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= HIGH-GLOW ECOSYSTEM ASSURANCE PANELS ================= */}
      <section className="w-full py-16 bg-[#fafafa] border-t border-b border-[#f5f5f7] px-6 xl:px-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-[1300px] w-full grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="space-y-4 bg-white p-7 rounded-2xl border border-[#e8e8ed] transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_15px_30px_rgba(59,130,246,0.05)]">
            <div className="p-3 w-fit bg-blue-50 text-blue-600 rounded-xl">
              <HiOutlineShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">Verified Route Integrity</h3>
            <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
              Every profile undergoes strict operational setup to align explicitly with non-commercial lift club parameters.
            </p>
          </div>
          <div className="space-y-4 bg-white p-7 rounded-2xl border border-[#e8e8ed] transition-all duration-300 hover:border-cyan-500/20 hover:shadow-[0_15px_30px_rgba(6,182,212,0.05)]">
            <div className="p-3 w-fit bg-cyan-50 text-cyan-600 rounded-xl">
              <HiOutlineClock size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">Real-Time Cost Allocations</h3>
            <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
              Expenses are distributed natively using integrated multi-party transparent cost split calculations.
            </p>
          </div>
          <div className="space-y-4 bg-white p-7 rounded-2xl border border-[#e8e8ed] transition-all duration-300 hover:border-indigo-500/20 hover:shadow-[0_15px_30px_rgba(99,102,241,0.05)]">
            <div className="p-3 w-fit bg-indigo-50 text-indigo-600 rounded-xl">
              <HiOutlineCheckCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">Corporate Governance Alignment</h3>
            <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
              Formally managed under the commercial accountability and legal framework of La Fab Trading and Projects.
            </p>
          </div>
        </div>
      </section>

      {/* ================= MODAL OVERLAY ================= */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-[#1d1d1f]/60 backdrop-blur-md transition-opacity duration-300 animate-fadeIn">
          <div 
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-[0_40px_90px_rgba(0,0,0,0.3)] border border-[#e8e8ed] overflow-hidden grid grid-cols-1 lg:grid-cols-12 transform transition-all max-h-[90vh] md:max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column: Visual Asset Display */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#fafafa] to-[#f5f5f7] relative flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-[#e8e8ed] h-64 lg:h-auto">
              <div className="relative w-full h-full min-h-[220px]">
                <Image 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  layout="fill" 
                  objectFit="contain"
                  priority
                  unoptimized={true}
                  className="drop-shadow-2xl filter brightness-[0.99]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
              
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 left-4 p-2.5 rounded-full bg-white text-[#1d1d1f] border border-[#e8e8ed] hover:bg-[#1d1d1f] hover:text-white lg:hidden shadow-md transition-all active:scale-95"
              >
                <HiOutlineX size={16} />
              </button>
            </div>

            {/* Right Column: Core Content Data */}
            <div className="lg:col-span-7 flex flex-col justify-between overflow-hidden bg-white">
              
              <div className="p-6 md:p-8 border-b border-[#f5f5f7] flex items-start justify-between bg-[#fafafa]">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest">
                    <HiOutlineLocationMarker />
                    {selectedService.badge} Matrix
                  </div>
                  <h2 className="text-2xl font-black text-[#1d1d1f] tracking-tight">
                    {selectedService.title}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="hidden lg:flex p-2.5 rounded-xl bg-white border border-[#e8e8ed] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white shadow-sm transition-all active:scale-95"
                  aria-label="Dismiss dashboard view"
                >
                  <HiOutlineX size={18} />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-grow max-h-[45vh] lg:max-h-[50vh]">
                
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-mono font-black text-stone-400 tracking-wider">// Stream Strategy</h4>
                  <p className="text-sm font-bold text-[#1d1d1f] leading-snug">
                    {selectedService.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed font-normal">
                    {selectedService.description}
                  </p>
                </div>

                <div className="relative rounded-2xl border border-blue-500/20 bg-gradient-to-br from-white to-blue-50/20 p-5 space-y-3 shadow-[0_10px_25px_rgba(59,130,246,0.04)] overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600">
                    <HiOutlineTrendingUp className="text-blue-500 animate-pulse" size={16} />
                    MobiSplit Optimization Matrix Active
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xs font-black text-[#1d1d1f] tracking-tight">
                      Target Core: {selectedService.incentiveTier}
                    </span>
                    <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed font-normal">
                      {selectedService.incentiveDetails}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase font-mono font-black text-indigo-600 tracking-wider">// High-Contrast Operational Targets</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.highlights.map((highlight, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-2.5 bg-[#fafafa] border border-[#e8e8ed] px-3 py-2.5 rounded-xl text-xs sm:text-sm text-[#1d1d1f] font-medium hover:border-indigo-500/20 transition-all duration-200"
                      >
                        <HiOutlineUserGroup className="text-indigo-500 flex-shrink-0" size={16} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#fafafa] border-t border-[#e8e8ed] flex flex-col sm:flex-row items-center gap-4 justify-between">
                <div className="text-center sm:text-left">
                  <span className="block text-[10px] font-mono text-[#86868b] uppercase tracking-wider">Cost Configuration Framework</span>
                  <strong className="text-sm font-black text-[#1d1d1f]">{selectedService.fee}</strong>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto bg-[#1d1d1f] text-white hover:bg-blue-600 border border-[#1d1d1f] hover:border-blue-600 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-md shadow-stone-900/10"
                >
                  Acknowledge Settings
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================= PREMIUM FOOTER VIEW SECTION ================= */}
      <FooterView />

    </div>
  );
}