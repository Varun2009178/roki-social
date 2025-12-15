
"use client";

import { motion } from "framer-motion";
import { Check, CheckCircle2, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";



export function IMessageDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 5 ? prev + 1 : 0)); // Loop 0-5
    }, 2500); // Speed up slightly to fit more steps
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-[350px] mx-auto bg-black border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl relative font-sans">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-white/5 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
           <div className="relative">
             <img src="/logo.png" alt="roki" className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 p-1.5 object-contain invert" />
             <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-zinc-900 rounded-full"></div>
           </div>
           <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Róki, Chris, Pranav</span>
              <span className="text-[10px] text-zinc-500">3 people &gt;</span>
           </div>
        </div>
        <div className="text-zinc-500 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-2 h-[480px] flex flex-col justify-end pb-12 bg-black font-sans">
        {/* Roki Prompt - Gray Bubble (Left) */}
        <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex flex-col items-start max-w-[85%]"
        >
             <span className="text-[10px] text-zinc-500 ml-3 mb-1">Róki</span>
            <div className="bg-[#262626] text-white px-4 py-2 rounded-2xl rounded-tl-sm text-sm lowercase leading-tight">
                Morning squad! Day 6. <br/>
                Goal: Gym (45m)
            </div>
        </motion.div>

        {/* Step 0: Varun text - Blue Bubble (Right) */}
        {step >= 0 && ( /* Always show after init */
        <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex flex-col items-end self-end max-w-[85%]"
        >
             {/* No name for self usually, just bubble */}
            <div className="bg-[#007AFF] text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm lowercase leading-tight">
                yo róki i went to the gym today
            </div>
        </motion.div>
        )}

        {/* Step 1: Roki Reply - Gray Bubble (Left) */}
        {step >= 1 && (
            <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-end max-w-[85%]"
            >
                {/* Avatar */}
                <div className="flex-shrink-0 mr-2 self-end">
                    <img src="/logo.png" alt="Róki" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 p-1.5 object-contain invert" />
                </div>
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 ml-3 mb-1">
                       <span className="text-[10px] text-zinc-500">Róki</span>
                    </div>
                    <div className="bg-[#262626] text-white px-4 py-2 rounded-2xl rounded-tl-sm text-sm lowercase leading-tight">
                        show me proof buddy
                    </div>
                </div>
            </motion.div>
        )}

        {/* Step 2: Varun Photo - Standalone (Right) */}
        {step >= 2 && (
             <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex flex-col items-end self-end max-w-[85%]"
            >
                <div className="relative rounded-2xl overflow-hidden shadow-sm border border-white/10">
                    <img 
                        src="/gym_image.jpg"
                        alt="gym proof"
                        className="h-48 w-auto object-cover max-w-[200px]"
                    />
                    {/* Scanning Animation */}
                    {step === 2 && (
                        <motion.div 
                            initial={{ top: 0 }}
                            animate={{ top: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-1 bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,1)] z-10"
                        />
                    )}
                </div>
            </motion.div>
        )}

        {/* Step 3: Loading Dots (Transient) */}
        {step === 3 && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 ml-4"
            >
                <div className="flex gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="h-1.5 w-1.5 bg-zinc-500 rounded-full"/>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="h-1.5 w-1.5 bg-zinc-500 rounded-full"/>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="h-1.5 w-1.5 bg-zinc-500 rounded-full"/>
                </div>
            </motion.div>
        )}

        {/* Step 4: Roki Savage Reply - Gray Bubble (Left) */}
        {step >= 4 && (
             <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-end max-w-[90%]"
            >
                {/* Avatar */}
                <div className="flex-shrink-0 mr-2 self-end">
                    <img src="/logo.png" alt="Róki" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 p-1.5 object-contain invert" />
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-[10px] text-zinc-500 ml-3 mb-1">Róki</span>
                    <div className="bg-[#262626] text-white px-4 py-2 rounded-2xl rounded-tl-sm text-sm lowercase leading-snug">
                        chris, pranav, if yall dont send me photos the streak is over
                    </div>
                </div>
            </motion.div>
        )}

        {/* Step 5: Crying Emoji - Blue Bubble (Right) */}
             {/* Actually wait, if I am Varun, Chris is someone else. Chris messages should appear on the LEFT (Gray). */}
         {step >= 5 && (
            <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-end max-w-[85%]"
            >
                {/* Avatar */}
                <div className="flex-shrink-0 mr-2 self-end">
                    <img src="/logo.png" alt="Chris" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 p-1.5 object-contain invert" />
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-[10px] text-zinc-500 ml-3 mb-1">Chris</span>
                    <div className="bg-[#262626] text-white px-4 py-2 rounded-2xl rounded-tl-sm text-sm lowercase leading-tight">
                        😭😭
                    </div>
                </div>
            </motion.div>
        )}
      </div>

       {/* Input Area (Fake) */}
       <div className="p-3 bg-zinc-900 border-t border-white/5 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
             <span className="text-lg">+</span>
          </div>
          <div className="h-8 flex-1 rounded-full border border-zinc-700 bg-black/50 px-3 flex items-center text-xs text-zinc-600">
             iMessage
          </div>
          <div className="h-8 w-8 rounded-full bg-zinc-800/0 flex items-center justify-center text-zinc-500">
             <span className="text-sm">🎤</span>
          </div>
       </div>
    </div>
  );
}
