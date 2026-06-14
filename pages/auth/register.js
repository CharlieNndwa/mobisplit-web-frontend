import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { apiRequest } from "utils/api";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToaster, setShowToaster] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      
      setShowToaster(true);
      setTimeout(() => {
        setShowToaster(false);
        router.push("/auth/login");
      }, 2200);
    } catch (err) {
      setError(err.message || "Registration rejected. Please verify form details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 font-sans relative"
      style={{ backgroundImage: `url('https://classic.exame.com/wp-content/uploads/2021/05/DSC1638.jpg')` }}
    >
      {/* Dynamic Keyframe Injection for the Radiating Magic Aura */}
      <style jsx global>{`
        @keyframes magicGlow {
          0% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.3), 0 0 15px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 50px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4); }
          100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.3), 0 0 15px rgba(255, 255, 255, 0.2); }
        }
        .animate-magic-glow {
          animation: magicGlow 3s infinite ease-in-out;
        }
      `}</style>

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      {/* Centered Toaster Popup */}
      {showToaster && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none animate-bounce">
          <div className="bg-cyan-400 border-4 border-black text-black px-8 py-5 rounded-3xl shadow-[8px_8px_0px_#000] flex flex-col items-center gap-2 max-w-sm text-center transform scale-110">
            <span className="text-4xl">🚀</span>
            <h4 className="font-black text-xl tracking-tight uppercase">Account Created!</h4>
            <p className="text-xs font-bold">Welcome to MobiSplit !🚗</p>
          </div>
        </div>
      )}

      {/* Premium Radiating White Card */}
      <div className="w-full max-w-[440px] space-y-5 bg-white p-8 rounded-3xl border border-white/60 relative z-10 pt-10 animate-magic-glow">
        
        <div className="flex justify-center w-full mb-2">
          <div className="relative w-40 h-14 overflow-hidden flex items-center justify-center">
            <Image 
              src="/images/logoroza.png"
              alt="MobiSplit Logo"
              width={180}
              height={90}
              objectFit="contain"
              className="transform scale-125 filter invert-0"
              priority
            />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">Join MobiSplit</h2>
          <p className="text-xs text-slate-500 font-medium">Create your global transport profile matrix</p>
        </div>

        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center font-bold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
            <input 
              type="text" required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
            <input 
              type="email" required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition"
              placeholder="john@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
            <input 
              type="tel" required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition"
              placeholder="+27 82 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">Secure Password</label>
            <div className="relative w-full">
              <input 
                type={showPassword ? "text" : "password"} required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition focus:outline-none"
              >
                {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-3.5 rounded-xl transition transform active:scale-95 disabled:opacity-50 tracking-wide uppercase mt-2 shadow-md"
          >
            {loading ? "Constructing Profile..." : "Register Account"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 font-medium">
          Already registered? <Link href="/auth/login"><a className="text-slate-900 hover:underline font-bold">Sign in here</a></Link>
        </p>
      </div>
    </div>
  );
}