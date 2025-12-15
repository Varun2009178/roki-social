

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { Button } from "./button";

const navItems = [
  { name: "how it works", link: "/#how-it-works" },
  { name: "features", link: "/features" },
];

export function FloatingNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    // simple route matching
    if (pathname === "/features") {
        setActiveTab("features");
    } else if (pathname === "/" && window.location.hash === "#how-it-works") {
        setActiveTab("how it works");
    } else {
        setActiveTab("");
    }
  }, [pathname]);


   return (
    <header className="fixed top-2 md:top-6 left-1/2 -translate-x-1/2 z-50 max-w-[98vw]">
      <div className="flex items-center justify-between gap-0.5 md:gap-1 p-1 md:p-1.5 rounded-full border border-white/10 bg-zinc-950/80 backdrop-blur-md shadow-2xl shadow-black/50">

        <Link 
            href="/"
            className="flex items-center px-1.5 py-1.5 md:px-4 bg-zinc-900 rounded-full border border-white/5 mr-0.5 md:mr-2 shrink-0 transition-transform hover:scale-105"
            onMouseEnter={() => setActiveTab("")}
        >
          <img src="/logo.png" alt="róki" className="h-4 w-4 md:h-5 md:w-5 object-contain md:mr-2 invert" />
          <span className="hidden md:inline text-sm font-bold tracking-tight lowercase text-white">róki</span>
        </Link>
        
        <nav className="flex items-center relative gap-0.5 md:gap-1 shrink-0">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative px-2 py-1.5 md:px-6 md:py-2 text-[9px] md:text-sm font-medium lowercase transition-colors z-10 whitespace-nowrap",
                activeTab === item.name ? "text-white" : "text-zinc-400 hover:text-white"
              )}
            >
              {activeTab === item.name && (
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 pl-0.5 md:pl-2 shrink-0">

            <Link href="/login">
                <Button variant="ghost" className="h-7 md:h-9 rounded-full px-2 md:px-4 text-[9px] md:text-xs text-zinc-400 hover:text-white hover:bg-white/5 lowercase">
                    login
                </Button>
            </Link>
            <Link href="/create">
                <Button className="h-7 md:h-9 rounded-full bg-white px-2.5 md:px-6 text-[9px] md:text-xs font-semibold text-black hover:bg-zinc-200 lowercase whitespace-nowrap">
                    enter róki
                </Button>
            </Link>
        </div>

      </div>
    </header>
  );
}
