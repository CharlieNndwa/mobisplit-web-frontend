import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  HiOutlineShieldCheck, 
  HiOutlineUserGroup, 
  HiOutlineCash, 
  HiOutlineSparkles, 
  HiOutlineEye, 
  HiOutlineHeart 
} from "react-icons/hi";

export default function AboutUsAndServices() {
  const aboutImageUrl = "https://img.lagaceta.com.ar/fotos/notas/2025/12/05/concejo-aprobo-regularizar-uber-didi-cabify-como-plataformas-transporte-autoarchivo-1115582-121207.jpg";

  // Marketplace Service Streams
  const platformServices = [
    {
      id: 1,
      title: "Smart Commutes",
      description: "Split your regular city routes 50/50. Ideal for daily professionals and corporate workers.",
      image: "/assets/IMG-20260505-WA0029.jpg", 
      badge: "Popular",
    },
    {
      id: 2,
      title: "Campus Rides",
      description: "Affordable shared travel built directly for students to commute safely without high costs.",
      image: "/assets/IMG-20260505-WA0027.jpg", 
      badge: "R2.50 Fee",
    },
    {
      id: 3,
      title: "Inter-Provincial Travel",
      description: "Long distance travel handled seamlessly across South African provinces with verified operators.",
      image: "/assets/IMG-20260505-WA0032.jpg",
      badge: "Long Distance",
    },
    {
      id: 4,
      title: "Bakkie & Delivery Hire",
      description: "Need to haul heavy goods? Connect directly with local asset owners managing utility vehicles.",
      image: "/assets/IMG-20260505-WA0033.jpg",
      badge: "On-Demand Assets",
    },
    {
      id: 5,
      title: "Logistics & Heavy Freight",
      description: "Direct connection to large-scale utility trucks for commercial transport needs.",
      image: "/assets/meilleur-transitaire-France.png",
      badge: "Heavy Duty",
    },
    {
      id: 6,
      title: "Coastal Vehicle Engines",
      description: "Specialized vehicle configurations active across major South African port cities and logistical hubs.",
      image: "/assets/coastal.jpg",
      badge: "Port Services",
    },
  ];

  // 🧊 Carousel Engine Hooks & Viewport Calculations
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [visibleCards, setVisibleCards] = useState(3); 
  const [isMounted, setIsMounted] = useState(false);
  
 // 🧊 Execution loop safe from SSR / Server Hydration Crashing
  useEffect(() => { 
    setIsMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  // 🧊 Automated Smooth Rotation Matrix Loop
  useEffect(() => { 
    if (!isMounted) return;
    const maxIndex = platformServices.length - visibleCards;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, 4500); 

    return () => clearInterval(interval);
  }, [visibleCards, isMounted, platformServices.length]);

return (
    <div className="relative w-full bg-white text-zinc-900 overflow-hidden py-16 lg:py-28 border-t border-zinc-100">
      
      {/* 🔮 AMBIENT LIGHT MODE GLOW LAYERS */}
      <div className="absolute top-[2%] left-[-10%] w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-br from-blue-100/50 to-transparent blur-[100px] pointer-events-none select-none" />
      <div className="absolute top-[30%] right-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-bl from-indigo-100/40 to-transparent blur-[120px] pointer-events-none select-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 xl:px-12 relative z-10">
        
        <div className="w-full flex flex-col items-center justify-center mb-16 text-center">
          <h1 className="text-sm font-black uppercase tracking-[0.25em] bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent -mt-4">
            About Us &bull; MobiSplit
          </h1>
        </div>

        {/* ─── SECTION 1: CORE BRAND TEXT STRUCTURE ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20 lg:mb-28">
          
        {/* UPDATED: FLOATING HERO IMAGE SECTION FROM REQUEST COMPONENTS */}
          <div className="lg:col-span-5 w-full mt-6 lg:mt-0 flex items-center justify-center py-6">
            <div className="h-80 w-80 relative shadow-2xl -rotate-6 rounded-xl overflow-hidden border border-zinc-200/80 group bg-zinc-100">
              <Image
                className="rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
                src={aboutImageUrl}
                alt="E-Hailing and Shared Platform Fleet Infrastructure Framework"
                layout="fill"
                objectFit="cover"
                unoptimized={true}
              />
              {/* Sleek Minimal Branding Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-[9px] font-mono font-bold tracking-widest text-white/90 bg-zinc-950/80 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-white/10 inline-block">
                  LA FAB TRADING AND PROJECTS
                </span>
              </div>
            </div>
          </div>

          {/* Split Right Content Block */}
          <div className="lg:col-span-8 space-y-6 mt-6 lg:mt-0">
            <div className="space-y-2">
              <span className="text-xs uppercase font-black tracking-widest text-blue-600 font-mono block">
                // Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 leading-[1.15]">
                A community-driven lift club built on{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  trust and collaboration.
                </span>
              </h2>
            </div>
            
            <div className="space-y-4 text-sm sm:text-base text-zinc-600 font-medium leading-relaxed">
              <p>
                MobiSplit is a community-driven lift club platform created to make transport more affordable, safe, and accessible. We connect people traveling in the same direction, enabling them to share rides and petrol costs. Unlike traditional taxi apps, MobiSplit is not a business service — it’s a cost-sharing community initiative built on trust, collaboration, and shared responsibility.
              </p>
              <p className="text-xs sm:text-sm bg-zinc-50 border border-zinc-100 p-4 rounded-xl text-zinc-500 font-normal">
                MobiSplit is a subsidiary of <strong className="text-zinc-900 font-bold">La Fab Trading and Projects</strong>, a registered private company in South Africa. This affiliation strengthens our foundation, ensuring that our operations are backed by formal governance, compliance, and long-term sustainability.
              </p>
            </div>

            {/* Inline Mission Statement */}
            <div className="pt-4 border-t border-zinc-100 space-y-2">
              <span className="text-xs uppercase font-black tracking-widest text-indigo-600 font-mono block">
                // Our Mission
              </span>
              <p className="text-base font-black text-zinc-900 tracking-tight">
                To empower communities by reducing transport costs, fostering connections, and creating opportunities for young people to participate in meaningful initiatives.
              </p>
            </div>

            {/* Why We Exist Feature Segment */}
            <div className="pt-4 border-t border-zinc-100 space-y-2">
              <span className="text-xs uppercase font-black tracking-widest text-purple-600 font-mono block">
                // Why We Exist
              </span>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                South Africa faces one of the highest youth unemployment rates in the world, with millions of young people struggling to find work. MobiSplit was born out of the belief that mobility should be inclusive and that community-driven solutions can create both economic opportunities and social impact.
              </p>
            </div>
          </div>
        </div>

        {/* ─── SECTION 2: HIGH-GLOW INTERACTIVE CARDS GRID ─── */}
        <div className="mb-24 lg:mb-32 space-y-8">
          <div className="w-full text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-600 font-mono">
              // Core Beliefs & Values
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Value Framework & Strategic Deliverables
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* CARD 1: WHAT WE OFFER */}
            <div className="group relative bg-white border border-zinc-200/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]">
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit border border-blue-100">
                  <HiOutlineSparkles size={22} />
                </div>
                <h4 className="text-lg font-black text-zinc-950 tracking-tight">What We Offer</h4>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-600 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">&bull;</span>
                    <span><strong>Affordable Transport:</strong> Share rides and petrol costs, making travel cheaper for everyone.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">&bull;</span>
                    <span><strong>Community Lift Club:</strong> A safe, trusted alternative to taxi apps, built around collaboration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">&bull;</span>
                    <span><strong>Youth Empowerment:</strong> Through the Ambassador Youth Program, we create pathways for unemployed youth to earn and lead.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">&bull;</span>
                    <span><strong>Safety & Protection:</strong> Passenger protection policies ensure peace of mind for all members.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CARD 2: OUR COMMITMENT */}
            <div className="group relative bg-white border border-zinc-200/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between hover:border-purple-400 hover:shadow-[0_0_30px_rgba(147,51,234,0.18)]">
              <div className="space-y-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit border border-purple-100">
                  <HiOutlineHeart size={22} />
                </div>
                <h4 className="text-lg font-black text-zinc-950 tracking-tight">Our Commitment</h4>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-600 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">&bull;</span>
                    <span>Promoting safe, reliable, and inclusive mobility models across urban regions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">&bull;</span>
                    <span>Empowering localized youth cohorts through structural ambassador frameworks and community leadership.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">&bull;</span>
                    <span>Reinforcing that we are a lift club, not a taxi app — a trusted, mutual cost-sharing platform ecosystem.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CARD 3: OUR VISION */}
            <div className="group relative bg-white border border-zinc-200/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(79,70,229,0.18)]">
              <div className="space-y-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit border border-indigo-100">
                  <HiOutlineEye size={22} />
                </div>
                <h4 className="text-lg font-black text-zinc-950 tracking-tight">Our Vision</h4>
                <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed">
                  To build a seamlessly connected South Africa where transport is never a barrier to physical opportunity, and where communities sustainably thrive by directly supporting and uplifting one another every day.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Inclusive Mobility</span>
                <span className="text-indigo-600 font-bold">MobiSplit &copy;</span>
              </div>
            </div>

          </div>
        </div>

            {/* ─── SECTION 3: MIDNIGHT BLUE SERVICES REGION ─── */}
<div className="space-y-12 py-16 px-6 sm:px-8 rounded-3xl bg-[#030712] border border-zinc-900/80 relative select-none animate-fadeIn">
  
  {/* Soft Deep Ambient Backdrop Glow */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-tr from-blue-600/5 to-indigo-500/5 blur-[140px] pointer-events-none z-0" />

  {/* Center Aligned Header Structure */}
  <div className="w-full text-center space-y-4 relative z-10 max-w-2xl mx-auto">
    <div className="inline-flex items-center gap-2 bg-blue-950/40 border border-blue-500/20 px-3 py-1 rounded-full backdrop-blur-md">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400 font-mono">
        // Available Services
      </span>
    </div>
    
    <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
      Our Services &bull; <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">MobiSplit Options</span>
    </h3>
    
    <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
      Explore the variety of shared travel and transport services MobiSplit provides. Select an option below to connect with trusted routes and verified community operators.
    </p>
  </div>

  {/* Carousel Slider Outer Component */}
  <div className="relative w-full overflow-hidden rounded-2xl bg-[#050913]/40 border border-zinc-900 p-4 sm:p-6 backdrop-blur-md z-10 shadow-2xl">
    <div 
      className="flex transition-transform duration-700 ease-out gap-6"
      style={{
        transform: isMounted ? `translateX(-${currentIndex * (100 / visibleCards)}%)` : "translateX(0%)"
      }}
    >
      {platformServices.map((service) => (
        <div 
          key={service.id} 
          className="shrink-0 group relative bg-[#090f1d] border border-zinc-900 rounded-xl overflow-hidden transition-all duration-500 flex flex-col justify-between hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]"
          style={{
            width: isMounted 
              ? visibleCards === 3 ? "calc(33.333% - 16px)" : visibleCards === 2 ? "calc(50% - 12px)" : "100%"
              : "calc(33.333% - 16px)"
          }}
        >
          {/* Top Graphic Bounding Box */}
          <div className="relative w-full h-48 bg-zinc-950 z-10 overflow-hidden border-b border-zinc-900/60">
            <Image
              src={service.image}
              alt={service.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85] group-hover:brightness-100"
              unoptimized={true}
            />
            {/* Lego Stud badge overlay style */}
            <div className="absolute top-3 right-3 bg-zinc-950/90 backdrop-blur-md text-white border border-zinc-800 rounded px-2.5 py-0.5 z-20 shadow-lg">
              <span className="text-[9px] font-mono font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                {service.badge}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#090f1d] via-transparent to-transparent opacity-90" />
          </div>

          {/* Card Body Context with White Text Layout highlights */}
          <div className="p-5 sm:p-6 relative z-10 flex-grow flex flex-col justify-between bg-transparent">
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-200">
                {service.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed line-clamp-3">
                {service.description}
              </p>
            </div>

            {/* Bottom Panel Actions */}
            <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 tracking-tight">
                MobiSplit Marketplace
              </span>
              <button className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900/80 px-4 py-2 rounded-md border border-zinc-800 hover:bg-white hover:text-zinc-950 hover:border-white transition-all duration-300 shadow-md active:scale-[0.96]">
                Select
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Center Balanced Pagination Controls */}
    <div className="flex justify-center space-x-2 mt-8 pt-2">
      {Array.from({ length: Math.max(1, platformServices.length - visibleCards + 1) }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentIndex(idx)}
          className={`h-1 rounded-full transition-all duration-300 ${
            currentIndex === idx ? "w-5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "w-1 bg-zinc-800 hover:bg-zinc-700"
          }`}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>

  </div> 
</div> 


      </div> {/* <-- Fixed closing tag for Outer Content Boundaries */}
    </div>
  );
}