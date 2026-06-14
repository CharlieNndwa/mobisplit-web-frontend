import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react"; // 🧊 Added Menu for dropdown capabilities
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// 🔌 Icons for navigation actions, user profiles, and alert badges
import { HiLogout, HiUser, HiMenu, HiX, HiChevronDown, HiOutlineCash, HiOutlineUserGroup, HiOutlineTruck  } from "react-icons/hi"; // 🧊 Added layout & utility icons
import { FaBomb } from "react-icons/fa"; // Comical bomb icon for the red toaster design

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 🍞 Red Comical Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // 🧊 Mobile drawer tracking state for the accordion dropdown toggle
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false);

  // ⏱️ Session timeout limits (15 minutes)
  const INACTIVITY_TIMEOUT = 15 * 60 * 1000; 

  // --- 1. TRACK AUTHENTICATION STATE ON ROUTE MOUNT ---
  useEffect(() => {
    const checkSessionState = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          const decoded = JSON.parse(jsonPayload);
          setUserEmail(decoded.email || "Active User");
        } catch (e) {
          setUserEmail("Active Account");
        }
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
      }
    };

    checkSessionState();
    window.addEventListener("storage", checkSessionState);
    return () => window.removeEventListener("storage", checkSessionState);
  }, []);

  // --- 2. INACTIVITY AUTO-LOGOUT WATCHDOG ---
  useEffect(() => {
    if (!isLoggedIn) return;

    let timeoutId;

    const executeAutoLogout = () => {
      handleLogout("idle");
    };

    const resetInactivityTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(executeAutoLogout, INACTIVITY_TIMEOUT);
    };

    const trackableEvents = ["mousemove", "mousedown", "keypress", "touchstart", "scroll"];
    
    trackableEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      trackableEvents.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [isLoggedIn]);

  // --- 3. DISPATCH SIGN-OUT WITH RED COMICAL TOASTER ALERTS ---
  const handleLogout = (reason = "manual") => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserEmail(null);
    setOpen(false); // Drop mobile curtain
    
    if (reason === "idle") {
      setToastMessage("BOOM! Session expired due to inactivity!");
    } else {
      setToastMessage("POW! Signed out successfully. See ya!");
    }
    
    // Fire the toaster trigger
    setShowToast(true);
    
    // Redirect cleanly to home if currently on an inner route page
    if (router.pathname !== "/") {
      router.push("/");
    }

    // Keep it on screen for 2.5 seconds before snapping away
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

// 🧊 Restructured array to handle standalone navigation links alongside sub-menu arrays
  const navTabs = [
    { name: "About Us", href: "/about" },
    { name: "Plan Ride", href: "/plan-ride" },
    { name: "Services", href: "/services" },
    { 
      name: "Earn with Mobisplit", 
      isDropdown: true,
      subTabs: [
        { name: "Earn as a Driver", href: "/driver", icon: HiOutlineCash },
        { name: "Register a Fleet", href: "/fleet", icon: HiOutlineTruck },
        { name: "Youth Ambassador Program", href: "/ambassador", icon: HiOutlineUserGroup }
      ]
    },
    { name: "Support", href: "/support" },
    { name: "Policy", href: "/policy" },
  ];


  return (
    <>
      {/* 🍞 FULLY CONFIGURED RED COMICAL TOASTER BANNER (CENTERED AT TOP) */}
      <div 
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ease-in-out transform ${
          showToast ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-8"
        }`}
      >
        <div className="bg-rose-600 text-white flex items-center gap-3 px-6 py-4 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[320px] max-w-md transform -rotate-1">
          <FaBomb className="text-yellow-300 animate-bounce shrink-0" size={24} />
          <div className="flex flex-col">
            <span className="text-black font-black uppercase tracking-wider text-sm leading-tight">ALERT!</span>
            <p className="text-xs font-extrabold text-white tracking-wide">{toastMessage}</p>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV BAR */}
      <div className="bg-black w-full h-[85px] px-6 xl:px-16 nav_bar border-b border-zinc-900 sticky top-0 z-40 text-white flex items-center">
        <div className="mx-auto max-w-[1300px] w-full h-full flex items-center justify-between relative">
          
          {/* LOGO CONTAINER */}
          <div className="flex items-center justify-start h-full">
            <Link href="/" passHref>
              <div className="cursor-pointer flex items-center justify-center overflow-hidden w-48 h-[75px] relative">
                <Image 
                  src="/images/logoroza (1).png"
                  alt="MobiSplit Logo"
                  width={220}
                  height={110}
                  objectFit="contain"
                  className="transform scale-125 sm:scale-135"
                />
              </div>
            </Link>
          </div>

         {/* MIDDLE NAVIGATION LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            {navTabs.map((tab, index) => (
              /* 🧊 Conditional branch rendering standard links vs Headless UI Dropdown structures */
              tab.isDropdown ? (
                <Menu as="div" key={index} className="relative inline-block text-left">
                  <Menu.Button className="hover:text-white cursor-pointer transition flex items-center gap-1 focus:outline-none select-none text-slate-300">
                    <span>{tab.name}</span>
                    <HiChevronDown size={14} className="mt-0.5 text-slate-400" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="transform opacity-0 scale-95 -translate-y-2"
                    enterTo="transform opacity-100 scale-100 translate-y-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="transform opacity-100 scale-100 translate-y-0"
                    leaveTo="transform opacity-0 scale-95 -translate-y-2"
                  >
                    <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-4 w-60 origin-top rounded-xl bg-zinc-950 border border-zinc-800 p-2 shadow-2xl focus:outline-none z-50">
                      {tab.subTabs.map((subTab, idx) => {
                        const Icon = subTab.icon;
                        return (
                          <Menu.Item key={idx}>
                            {({ active }) => (
                              <Link href={subTab.href} passHref>
                                <div className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-all ${
                                  active || router.pathname === subTab.href
                                    ? "bg-zinc-900 text-blue-400 border-l-2 border-blue-500 pl-3" 
                                    : "text-slate-300 hover:bg-zinc-900/60 hover:text-white"
                                }`}>
                                  <Icon size={16} className="text-blue-500" />
                                  <span>{subTab.name}</span>
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Link key={index} href={tab.href}>
                  <span className="hover:text-white cursor-pointer transition">{tab.name}</span>
                </Link>
              )
            ))}
          </div>

          {/* DYNAMIC RIGHT CONTROLS */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <HiUser className="text-emerald-400" size={18} />
                  <span className="text-xs font-medium text-slate-300 max-w-[180px] truncate">{userEmail}</span>
                </div>
                <button
                  onClick={() => handleLogout("manual")}
                  className="flex items-center gap-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-900 text-red-200 text-xs font-bold px-3 py-1.5 rounded-lg transition transform active:scale-95"
                >
                  <span>Sign out</span>
                  <HiLogout size={14} />
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" passHref>
                  <button className="text-sm font-bold text-white hover:text-slate-300 px-4 py-2 transition">Log in</button>
                </Link>
                <Link href="/auth/register" passHref>
                  <button className="bg-white hover:bg-slate-200 text-black text-sm font-bold px-5 py-2.5 rounded-xl transition transform active:scale-95 shadow-md">Sign up</button>
                </Link>
              </>
            )}
          </div>

          {/* MOBILE BURGER BUTTON */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(true)} className="text-slate-300 hover:text-white focus:outline-none">
              <HiMenu size={26} />
            </button>
          </div>
        </div>
      </div>

     {/* MOBILE PANEL OVERLAY */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 -translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-4"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-black border border-zinc-800 text-left shadow-2xl transition-all w-[95%] mt-14 p-6 text-white">
                <div className="absolute right-4 top-4">
                  <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">
                    <HiX size={22} />
                  </button>
                </div>

                <div className="flex flex-col gap-4 text-base font-semibold text-slate-300 border-b border-zinc-800 pb-6 mt-4">
                  {navTabs.map((tab, idx) => (
                    /* 🧊 Renders an accordion block on mobile setups instead of standard hover windows */
                    tab.isDropdown ? (
                      <div key={idx} className="w-full flex flex-col">
                        <button 
                          onClick={() => setMobileEarnOpen(!mobileEarnOpen)}
                          className="w-full flex items-center justify-between text-left py-2 px-3 rounded-xl hover:bg-white/5 hover:text-white transition focus:outline-none text-slate-300 font-semibold"
                        >
                          <span>{tab.name}</span>
                          <HiChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${mobileEarnOpen ? "rotate-180" : ""}`} />
                        </button>

                        {mobileEarnOpen && (
                          <div className="mt-1 ml-4 pl-2 border-l border-zinc-800 flex flex-col gap-2">
                            {tab.subTabs.map((subTab, sIdx) => {
                              const SubIcon = subTab.icon;
                              return (
                                <Link key={sIdx} href={subTab.href}>
                                  <span 
                                    onClick={() => setOpen(false)} 
                                    className="flex items-center gap-2.5 py-2 px-3 text-sm rounded-lg text-slate-400 hover:bg-white/5 hover:text-white cursor-pointer transition"
                                  >
                                    <SubIcon size={16} className="text-blue-500" />
                                    <span>{subTab.name}</span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link key={idx} href={tab.href}>
                        <span onClick={() => setOpen(false)} className="py-2 px-3 rounded-xl hover:bg-white/5 hover:text-white cursor-pointer transition">{tab.name}</span>
                      </Link>
                    )
                  ))}
                </div>

                <div className="mt-6">
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-3 bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
                      <div className="flex items-center gap-2 border-b border-zinc-900 pb-2.5">
                        <HiUser className="text-emerald-400" size={18} />
                        <span className="text-sm font-medium text-slate-200 truncate">{userEmail}</span>
                      </div>
                      <button 
                        onClick={() => handleLogout("manual")} 
                        className="w-full flex items-center justify-center gap-2 bg-red-950/50 hover:bg-red-900/60 border border-red-900 text-red-200 font-bold py-3 rounded-xl transition active:scale-95"
                      >
                        <span>Sign out</span>
                        <HiLogout size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <Link href="/auth/login" passHref>
                        <button onClick={() => setOpen(false)} className="border border-zinc-800 text-sm font-bold text-white rounded-xl py-3 hover:bg-white/5 active:scale-95 transition">Log in</button>
                      </Link>
                      <Link href="/auth/register" passHref>
                        <button onClick={() => setOpen(false)} className="text-sm font-bold bg-white text-black rounded-xl py-3 hover:bg-slate-200 active:scale-95 transition">Sign up</button>
                      </Link>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}