import React, { useState } from "react"; 
import Image from "next/image";
import { HiOutlineShieldCheck, HiOutlineMailOpen, HiOutlineBadgeCheck, HiOutlineArrowRight } from "react-icons/hi"; 

export default function InsuranceSection() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" });

  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const handleInput = (e) => { 
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleApply = (e) => { 
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", phone: "" });
    }, 1200);
  };

  return (
    <div className="my-10 relative bg-[#030712] border border-zinc-900/60 rounded-xl p-6 select-none max-w-[1200px] mx-auto overflow-hidden shadow-xl">
      {/* Premium Ambient Background Accents */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-blue-600/5 blur-[70px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[180px] h-[180px] rounded-full bg-cyan-500/5 blur-[60px] pointer-events-none" />

      {/* STRICT SIDE-BY-SIDE GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* ─── LEFT HAND SIDE: CONTACT FORM CARD WITH GLOW EFFECTS ─── */}
        <div className="bg-[#060b16] border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-center relative transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)] group">
          {/* Flat Lego Brick Profile Tab Accent */}
          <div className="absolute top-0 left-4 w-6 h-1 bg-cyan-500/80 rounded-b-sm" />
          
          <div className="mb-4">
            <span className="text-[9px] uppercase font-bold tracking-widest text-cyan-400 font-mono block mb-0.5">
              // APPLY NOW!
            </span>
            <h4 className="text-sm font-black text-white tracking-tight">
              Request Documentation
            </h4>
          </div>

          {isSubmitted ? (
            <div className="bg-blue-950/20 border border-blue-500/20 rounded-lg p-5 text-center space-y-2"> 
              <div className="mx-auto w-8 h-8 bg-blue-500/10 text-cyan-400 border border-blue-400/20 rounded-full flex items-center justify-center">
                <HiOutlineBadgeCheck size={16} />
              </div>
              <h5 className="text-xs font-bold text-white">Application Queued</h5>
              <p className="text-[11px] text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Verification legal vectors are processing your route metrics.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-3"> 
              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase font-bold text-zinc-500 tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formState.name} 
                  onChange={handleInput} 
                  className="w-full bg-[#0a101d] border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-all duration-200" 
                  placeholder="Charlie Nndwa"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase font-bold text-zinc-500 tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formState.email} 
                  onChange={handleInput} 
                  className="w-full bg-[#0a101d] border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-all duration-200" 
                  placeholder="developer@example.co.za"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase font-bold text-zinc-500 tracking-wider">Phone / Contact Matrix</label>
                <input 
                  type="text" 
                  name="phone" 
                  required 
                  value={formState.phone} 
                  onChange={handleInput} 
                  className="w-full bg-[#0a101d] border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-all duration-200" 
                  placeholder="+27 (0) 71..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase font-bold text-zinc-500 tracking-wider">Verification Request Message</label>
                <textarea 
                  name="message" 
                  rows="3" 
                  required 
                  value={formState.message} 
                  onChange={handleInput} 
                  className="w-full bg-[#0a101d] border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-all duration-200 resize-none" 
                  placeholder="Provide additional vehicle specification identifiers or active commuter pathways..."
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-1 flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-cyan-500 text-white text-xs font-bold uppercase tracking-wider py-2 px-3 rounded transition-all duration-300 hover:bg-white hover:text-zinc-950 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <HiOutlineMailOpen size={12} />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* ─── RIGHT HAND SIDE: CONTENT BLOCK & COUPLED IMAGE HERO ─── */}
        <div className="flex flex-col justify-between h-full py-2 relative">
          
          {/* Header Title Information Context */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-blue-950/60 border border-blue-500/20 px-2 py-0.5 rounded-sm">
              <HiOutlineShieldCheck className="text-cyan-400 text-xs" /> 
              <span className="text-[8px] font-mono text-cyan-400 tracking-widest uppercase font-black">
                // Trust & Protection Active
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
              MobiSplit Insurance
            </h3>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-md">
              MobiSplit coordinates with premier structural protection mechanisms to establish comprehensive mutual safety standards across every verified shared route.
            </p>
          </div>

          {/* Coupled Next.js High-Performance Image Block */}
          <div className="my-5 relative h-36 w-full max-w-sm rounded-xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-lg group">
            {/* Lego Corner Matrix Detail */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-zinc-900 border-b border-l border-zinc-800 z-20 rounded-bl-sm" />
            
            <Image 
              src="https://media.istockphoto.com/id/1173046833/photo/sale-agent-deal-to-agreement-successful-car-loan-contract-with-customer-and-sign-agreement.jpg?s=612x612&w=0&k=20&c=0ZTfEfidz5PFLqXWu0lsAraXYbVLD4tWeoNaXM6cb2U=" 
              alt="MobiSplit Risk Shielding Logistics Infrastructure" 
              layout="fill"
              objectFit="cover"
              className="filter brightness-[0.75] contrast-[1.02] transition-transform duration-500 group-hover:scale-105"
              unoptimized={true} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-50" />
          </div>

          {/* See More Navigation Action Hub */}
          <div className="flex items-center justify-start mt-2">
            <button 
              onClick={() => window.location.href = "/insurance"}
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300 bg-[#070c18] border border-zinc-800 hover:border-cyan-400/60 px-5 py-2.5 rounded-full transition-all duration-300 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] active:scale-[0.97]"
            >
              <span>See More</span>
              <HiOutlineArrowRight size={12} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
