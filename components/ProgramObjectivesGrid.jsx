import React, { useState } from "react";
import { FiBriefcase, FiTrendingUp, FiDollarSign, FiUsers, FiChevronDown } from "react-icons/fi";

export default function ProgramObjectivesGrid() {
  // Controlled active state for accordion panels
  const [activeIndex, setActiveIndex] = useState(0);

  const pillarsData = [
    {
      id: 0,
      stepNumber: "// Pillar 01",
      badgeText: "JOB CREATION",
      title: "Job Creation",
      description: "Provide unemployed youth with impactful ambassador roles to proactively advocate and scale MobiSplit in local communities.",
      icon: FiBriefcase,
      accentColor: "text-cyan-600 bg-cyan-50 border-cyan-100"
    },
    {
      id: 1,
      stepNumber: "// Pillar 02",
      badgeText: "CAPABILITY",
      title: "Skills Growth",
      description: "Deliver practical, standardized training workshops covering digital marketing channels, local community engagement, and entrepreneurship.",
      icon: FiTrendingUp,
      accentColor: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      id: 2,
      stepNumber: "// Pillar 03",
      badgeText: "REVENUE HUB",
      title: "Income Paths",
      description: "Earn consistent, commission-based balances by validating and onboarding active drivers and community passengers onto the platform ecosystem.",
      icon: FiDollarSign,
      accentColor: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      id: 3,
      stepNumber: "// Pillar 04",
      badgeText: "LEADERSHIP",
      title: "Social Impact",
      description: "Position young leaders at the front lines of transit innovation, advocating for safe, highly affordable, and unified community cost-sharing.",
      icon: FiUsers,
      accentColor: "text-purple-600 bg-purple-50 border-purple-100"
    }
  ];

  const handleToggle = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <section className="py-24 bg-[#0a1128] border-b border-zinc-900 relative overflow-hidden">
      {/* Subtle blueprints showing beautifully through the midnight backdrop */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="mx-auto max-w-[1300px] px-6 xl:px-16 relative z-10">
        
        {/* Exact Split Matrix Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Sticky Sidebar Header Matrix */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32">
            <span className="text-[10px] font-mono font-black text-cyan-400 uppercase bg-cyan-950/50 border border-cyan-900/50 px-2 py-0.5 rounded tracking-wider">
              // Core Mission Matrix
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Program Objectives
            </h3>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
              Transforming unutilized localized capacity into structural socioeconomic community assets across urban and township networks.
            </p>
            
            {/* Minimalist Tech Decor Label */}
            <div className="pt-4 hidden lg:block">
              <div className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold text-zinc-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM ACTIVE / RUNNING
              </div>
            </div>
          </div>

          {/* Right Main Functional Area: Structural Accordion Stack */}
          <div className="lg:col-span-8 space-y-4">
            {pillarsData.map((pillar) => {
              const IconComponent = pillar.icon;
              const isOpen = activeIndex === pillar.id;

              return (
                <div 
                  key={pillar.id}
                  className="bg-white border border-zinc-200/80 rounded-2xl shadow-md transition-all duration-200 overflow-hidden relative group"
                >
                  {/* Embedded Lego Stud Top Alignment Details */}
                  <div className="absolute top-0 left-12 flex gap-1 pointer-events-none">
                    <div className="w-3 h-1 bg-zinc-200 rounded-b" />
                    <div className="w-3 h-1 bg-zinc-200 rounded-b" />
                  </div>

                  {/* Interactive Accordion Panel Trigger Button */}
                  <button
                    onClick={() => handleToggle(pillar.id)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      {/* Apple Style Clean Color Badge */}
                      <div className={`p-2.5 rounded-xl border transition-transform duration-200 ${pillar.accentColor} ${isOpen ? "scale-105" : "group-hover:scale-105"}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      
                      <div>
                        <span className="block text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
                          {pillar.stepNumber}
                        </span>
                        <h4 className="text-sm font-bold uppercase text-zinc-900 tracking-wide">
                          {pillar.title}
                        </h4>
                      </div>
                    </div>

                    {/* Chevron Accent Indicator */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-zinc-400 tracking-tighter uppercase hidden sm:inline">
                        {pillar.badgeText}
                      </span>
                      <div className={`w-7 h-7 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180 bg-zinc-900 border-zinc-900 text-white" : ""}`}>
                        <FiChevronDown className="w-3 h-3" />
                      </div>
                    </div>
                  </button>

                  {/* Animated Expansion Draw Area */}
                  <div
                    className={`transition-all duration-300 ease-in-out px-6 ${
                      isOpen ? "max-h-[200px] opacity-100 pb-6" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="pt-4 border-t border-zinc-100">
                      <p className="text-xs text-zinc-600 font-medium leading-relaxed max-w-2xl">
                        {pillar.description}
                      </p>
                      
                      <div className="mt-4 pt-3 border-t border-dashed border-zinc-100 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                        <span>PILLAR BLOCK WORKFLOW STRUCTURE</span>
                        <span className="text-zinc-500 font-bold">READY // ACTIVE</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}