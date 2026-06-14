import React, { useEffect } from "react";
import gsap, { Back } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiLinkedin } from "react-icons/si";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { DiApple } from "react-icons/di";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineShieldCheck, HiOutlineExternalLink } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

export default function FooterView() {
  useEffect(() => {
    // Elegant, staggered reveal for social items
    gsap.from(".social_icon_node", {
      opacity: 0,
      ease: Back.easeOut.config(1.7),
      duration: 0.5,
      y: 15,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".footer_trigger_zone",
        start: "top bottom-=50px",
      },
    });

    // Store badge scaling entry animations
    gsap.from(".app_download_badge", {
      opacity: 0,
      scale: 0.96,
      y: 10,
      ease: "power2.out",
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".app_download_badge",
        start: "top bottom",
      },
    });
  }, []);

  return (
    <div className="bg-[#000000] border-t border-zinc-900 font-sans tracking-tight relative overflow-hidden select-none footer_trigger_zone">
      {/* Structural Subtle Glow Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[150px] bg-gradient-to-b from-cyan-500/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-[#0284c7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1300px] px-6 xl:px-16 text-zinc-400 pt-20 pb-12">
        
        {/* ─── UPPER GRID SECTION: BRAND SHOWCASE & LINKS ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900/80">
          
          {/* Column 1: Apple Aesthetic Interactive Media Banner (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Premium Status Label Accent */}
              <div className="inline-flex items-center gap-1.5 bg-zinc-950 border border-zinc-800/60 rounded px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                  // Platform Operations Active
                </span>
              </div>
              
              <h2 className="text-xl font-black text-white tracking-tighter">
                MobiSplit <span className="text-zinc-600 font-medium font-mono text-sm">ZA</span>
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                South Africa's community-driven cost-sharing lift club network. Optimizing travel metrics, route sharing, and structural vehicle safety.
              </p>
            </div>

            {/* Apple Luxury Card Component Displaying logoroza (1).png */}
            <div className="relative group overflow-hidden rounded-2xl border border-zinc-900 bg-gradient-to-b from-[#080d1a] to-[#02040a] p-6 shadow-2xl transition-all duration-500 hover:border-zinc-800 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] max-w-sm">
              {/* Lego Corner Structural Border Intersect */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-zinc-900 border-b border-l border-zinc-950 z-20 rounded-bl" />
              
              <div className="relative z-10 flex items-center gap-5">
                <div className="relative w-20 h-20 bg-black/40 border border-zinc-800/80 rounded-xl p-1 flex-shrink-0 overflow-hidden group-hover:scale-102 transition-transform duration-300">
                  <Image 
                    src="/images/logoroza.png" 
                    alt="MobiSplit Brand Ledger Matrix" 
                    layout="fill"
                    objectFit="contain"
                    className="brightness-[0.95] contrast-[1.05]"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase font-black text-cyan-400 tracking-wider">// Ecosystem Engine</p>
                  <p className="text-xs font-bold text-zinc-100 tracking-tight">Traveling Made Smart</p>
                  <p className="text-[11px] text-zinc-500 leading-snug">Easier and highly affordable verified passenger metrics.</p>
                </div>
              </div>
              
              {/* Glass Reflection Mask */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Column 2: Structured Links Framework (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2">
            
            {/* Link Group A: Organization */}
            <div className="space-y-4">
              <p className="text-[11px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                Company
              </p>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/about" passHref>
                    <a className="hover:text-white transition duration-200 block">About Us</a>
                  </Link>
                </li>
                
                <li>
                  <Link href="/support" passHref>
                    <a className="hover:text-white transition duration-200 block">Support Architecture</a>
                  </Link>
                </li>
                <li>
                  <Link href="/policy" passHref>
                    <a className="hover:text-white transition duration-200 block">Legal & Policy Terms</a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Link Group B: Drivers Hub */}
            <div className="space-y-4">
              <p className="text-[11px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                Partnerships
              </p>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/earn-by-driving" passHref>
                    <a className="hover:text-cyan-400 font-medium transition duration-200 flex items-center gap-1.5">
                      <span>Earn by Driving</span>
                      <HiOutlineExternalLink size={11} className="text-zinc-600" />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/ambassador" passHref>
                    <a className="hover:text-white transition duration-200 block">Youth Ambassador Program</a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Link Group C: Safety Parameters */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <p className="text-[11px] font-mono font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                <HiOutlineShieldCheck className="text-zinc-400" />
                <span>Safety Section</span>
              </p>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/safety-passengers" passHref>
                    <a className="hover:text-white transition duration-200 block">Safety for Passengers</a>
                  </Link>
                </li>
                <li>
                  <Link href="/driver-safety" passHref>
                    <a className="hover:text-white transition duration-200 block">Safety for Drivers</a>
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ─── LOWER SECTION: ACTION BADGES & LEGAL LEDGER ─── */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Left Block: Social Networking Nodes */}
          <div className="flex items-center gap-3">
            <Link href="https://facebook.com" passHref>
              <a target="_blank" rel="noopener noreferrer" className="social_icon_node w-8 h-8 rounded-lg bg-[#05070c] border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300">
                <SiFacebook size={14} />
              </a>
            </Link>
            <Link href="https://twitter.com" passHref>
              <a target="_blank" rel="noopener noreferrer" className="social_icon_node w-8 h-8 rounded-lg bg-[#05070c] border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300">
                <AiFillTwitterCircle size={16} />
              </a>
            </Link>
            <Link href="https://instagram.com" passHref>
              <a target="_blank" rel="noopener noreferrer" className="social_icon_node w-8 h-8 rounded-lg bg-[#05070c] border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300">
                <RiInstagramFill size={15} />
              </a>
            </Link>
            <Link href="https://linkedin.com" passHref>
              <a target="_blank" rel="noopener noreferrer" className="social_icon_node w-8 h-8 rounded-lg bg-[#05070c] border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300">
                <SiLinkedin size={13} />
              </a>
            </Link>
          </div>

          {/* Right Block: Application Store Downloads */}
          <div className="flex flex-wrap gap-4">
            {/* iOS Badging */}
            <div className="app_download_badge group w-[155px] h-[48px] bg-black border border-zinc-800 hover:border-zinc-600 rounded-xl flex items-center px-3 gap-2.5 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,255,255,0.01)] active:scale-[0.99]">
              <DiApple size={24} className="text-white flex-shrink-0" />
              <div className="leading-tight">
                <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium">Download on the</p>
                <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors duration-200">App Store</p>
              </div>
            </div>

            {/* Android Badging */}
            <div className="app_download_badge group w-[155px] h-[48px] bg-black border border-zinc-800 hover:border-zinc-600 rounded-xl flex items-center px-3 gap-2.5 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,255,255,0.01)] active:scale-[0.99]">
              <FcGoogle size={20} className="flex-shrink-0" />
              <div className="leading-tight">
                <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium">Get it on</p>
                <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors duration-200">Google Play</p>
              </div>
            </div>
          </div>

        </div>

        {/* ─── LEGAL NOTICES FOOTNOTE ─── */}
        <div className="mt-12 pt-6 border-t border-zinc-950 flex flex-col sm:flex-row justify-between text-[11px] text-zinc-600 font-mono gap-4">
          <p>Copyright © 2026 MobiSplit Limited. All rights reserved.</p>
          <p className="tracking-wide">MobiSplit is a subsidiary cost-sharing lift club initiative.</p>
        </div>

      </div>
    </div>
  );
}