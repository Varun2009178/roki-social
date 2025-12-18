
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "how it works", link: "/#how-it-works" },
  { name: "features", link: "/features" },
  { name: "login", link: "/login" },
];

export function FloatingNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");

  // Determine active tab from URL
  useEffect(() => {
    const updateActiveTab = () => {
      const hash = window.location.hash;
      
      if (pathname === "/features") {
        setActiveTab("features");
      } else if (pathname === "/login") {
        setActiveTab("login");
      } else if (pathname === "/create") {
        setActiveTab("create");
      } else if (pathname === "/" && hash === "#how-it-works") {
        setActiveTab("how it works");
      } else if (pathname === "/") {
        setActiveTab("home");
      }
    };

    updateActiveTab();
  }, [pathname]);

  // Handle hash changes and scroll detection on home page
  useEffect(() => {
    const handleHashChange = () => {
      if (pathname === "/") {
        if (window.location.hash === "#how-it-works") {
          setActiveTab("how it works");
        } else {
          setActiveTab("home");
        }
      }
    };

    // Scroll observer for home page
    const observer = new IntersectionObserver(
      (entries) => {
        if (pathname !== "/") return;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "how-it-works") {
              setActiveTab("how it works");
            } else if (entry.target.id === "hero") {
              setActiveTab("home");
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const howItWorks = document.getElementById("how-it-works");
    const hero = document.getElementById("hero");
    
    if (howItWorks) observer.observe(howItWorks);
    if (hero) observer.observe(hero);

    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <header className="fixed top-2 md:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] px-4 flex justify-center pointer-events-none">
      <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-4 p-1 rounded-full border border-white/5 bg-black/80 backdrop-blur-md shadow-2xl relative pointer-events-auto">
        
        {/* Logo / Home */}
        <Link 
          href="/" 
          className="relative flex items-center justify-center h-8 sm:h-9 md:h-10 px-3 sm:px-5 rounded-full outline-none transition-all"
        >
          <div className={cn(
            "absolute inset-0 bg-white/10 rounded-full border border-white/10 transition-opacity duration-300",
            activeTab === "home" ? "opacity-100" : "opacity-0"
          )} />
          <div className="relative z-10 flex items-center gap-2">
            <img src="/logo.png" alt="roki" className="h-4 w-4 md:h-5 md:w-5 object-contain invert" />
            <span className="hidden xs:inline text-xs md:text-sm font-medium lowercase text-white">róki</span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={cn(
                "relative flex items-center justify-center px-3 py-1.5 md:px-5 lg:px-6 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium lowercase transition-colors whitespace-nowrap outline-none",
                activeTab === item.name ? "text-white" : "text-zinc-500 hover:text-white"
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-white/10 rounded-full border border-white/10 transition-opacity duration-300",
                activeTab === item.name ? "opacity-100" : "opacity-0"
              )} />
              <span className="relative z-10">
                 {item.name === "how it works" ? (
                  <>
                    <span className="md:hidden">hiw</span>
                    <span className="hidden md:inline">how it works</span>
                  </>
                ) : item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Text Róki CTA - Always Highlighted */}
        <div className="flex items-center shrink-0">
          <Link href="/create" className="outline-none">
            <div className="relative flex items-center justify-center h-8 sm:h-9 md:h-10 px-4 md:px-8 rounded-full border border-white/5 overflow-hidden bg-white group">
              <div className="relative z-10 font-medium text-[10px] sm:text-xs md:text-sm flex items-center gap-2 text-black">
                <span>text róki</span>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
