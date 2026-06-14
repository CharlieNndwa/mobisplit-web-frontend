import React from "react";

// Clean, reliable inline SVGs for zero library dependencies
const AppDownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h10.5m-10.5-3h10.5m-10.5-3h10.5m-10.5-3h10.5" />
  </svg>
);

const UserProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 animate-pulse text-amber-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L15 15l-5.187.813z" />
  </svg>
);

export default function StepProposition() {
  const stepsData = [
    {
      stepNumber: "01",
      badgeText: "GET THE APP",
      title: "Download MobiSplit",
      description: "Grab the app from your play store on Android or iOS. It takes less than a minute to set up and get moving.",
      icon: AppDownloadIcon,
      bgStyle: { backgroundColor: "#22d3ee" } // Vibrant Cyan
    },
    {
      stepNumber: "02",
      badgeText: "JOIN THE CLUB",
      title: "Create Your Profile",
      description: "Pop in your details, secure your identity log-in, and get instant access to hundreds of verified local rides.",
      icon: UserProfileIcon,
      bgStyle: { backgroundColor: "#fbbf24" } // Golden Amber
    },
    {
      stepNumber: "03",
      badgeText: "HIT THE ROAD",
      title: "Book & Share Your Ride",
      description: "Set your drop-off point, pick a dynamic pricing offer that hits your sweet spot, and split the travel costs.",
      icon: MapPinIcon,
      bgStyle: { backgroundColor: "#34d399" } // Bright Emerald
    }
  ];

  return (
    <section className="w-full py-24 bg-[#0c0c0e] px-6 xl:px-16 border-y-4 border-black relative">
      {/* Blueprint Grid Lines Backdrop */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_2px,transparent_2px),linear-gradient(to_bottom,#ffffff_2px,transparent_2px)] bg-[size:30px_30px]" />

      <div className="mx-auto max-w-[1300px] w-full relative z-10">
        
        {/* Top Header Layout Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-2 bg-zinc-900 border-2 border-zinc-700 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-amber-400 uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <SparkleIcon />
              HOW IT WORKS
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Get Moving in 3 Simple Steps
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm font-mono text-zinc-400 border-l-2 border-zinc-700 pl-4 leading-relaxed">
              No stress, no crazy pricing. Just a fast, super reliable ride whenever you need to point-and-shoot across the city.
            </p>
          </div>
        </div>

        {/* Dynamic Comic-Pop Block Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {stepsData.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                style={step.bgStyle}
                className="w-full border-4 border-black p-8 rounded-3xl flex flex-col justify-between relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group text-black"
              >
                {/* Stylized Lego/Joint Block Studs on Top Edge */}
                <div className="absolute -top-4 left-10 flex gap-1">
                  <div className="w-5 h-3 bg-black rounded-t-md" />
                  <div className="w-5 h-3 bg-black rounded-t-md" />
                </div>

                {/* Main Content Layout Block */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-black border-2 border-black px-3 py-1 bg-white rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] tracking-wider">
                      {step.badgeText}
                    </span>
                    <span className="text-2xl font-black font-mono tracking-tighter opacity-30 group-hover:opacity-60 transition-opacity">
                      #{step.stepNumber}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-black tracking-tight uppercase flex items-center gap-2.5">
                      <span className="bg-white border-2 border-black p-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block transform group-hover:rotate-2 transition-transform">
                        <Icon />
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-[14px] font-bold leading-relaxed text-zinc-950 pt-2">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Modular Base Attachment Label */}
                <div className="mt-8 pt-4 border-t-2 border-black/20 flex items-center justify-between text-xs font-mono font-bold tracking-tight text-zinc-900">
                  <span>READY FOR TAKE-OFF</span>
                  <span>TAP TO START ➔</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}