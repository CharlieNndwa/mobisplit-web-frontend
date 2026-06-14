import React from "react";
import Image from "next/image";
import { HiOutlineSparkles, HiOutlineCheckCircle } from "react-icons/hi";

export default function DownloadAppSection() {
  return (
    <section className="w-full bg-[#0a0a0c] text-white py-20 px-6 xl:px-16 relative overflow-hidden border-t border-[#1c1c1e]">
      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-[300px] h-[300px] bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-gradient-to-br from-lime-500/10 to-transparent rounded-full blur-[90px] pointer-events-none" />

      {/* Force a side-by-side grid starting right from 'md' screens (768px and up) */}
      <div className="mx-auto max-w-[1300px] w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Content Column */}
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

          {/* Value Checklist */}
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

          {/* Download Badges */}
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

        {/* Right Phone Showcase Image Column */}
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
  );
}