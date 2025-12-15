

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Flame, Users, ShieldAlert, ArrowRight, Terminal } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IMessageDemo } from "@/components/ui/imessage-demo";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        router.push("/create");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black font-sans">
      {/* High Tech Centered Navigation */}
      <FloatingNav />


      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-visible">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">alpha v0.1</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-tight lowercase">
                accountability works<br/> 
                <span className="text-zinc-500">better with friends.</span>
              </h1>
              
              <p className="text-sm md:text-base font-mono text-zinc-400 max-w-xl mx-auto lowercase">
                text me if your group is a bunch of bums.
              </p>
              

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/create">
                    <Button size="lg" className="h-12 px-8 text-sm font-mono rounded-full bg-white text-black hover:bg-zinc-200 w-full sm:w-auto lowercase">
                    enter róki <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 lowercase">
                  <Terminal className="h-3 w-3" />
                  <span>press cmd+k to join</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-500 opacity-10 blur-[100px]"></div>
        </section>




        {/* Chat Interface - Animated iMessage Style */}
        <section id="how-it-works" className="py-20 border-t border-zinc-900 bg-black/50 overflow-hidden pb-32">
          <div className="container mx-auto px-4">
             <div className="flex flex-col items-center justify-center">
                <div className="mb-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 lowercase">
                    it’s just a group chat.
                  </h2>
                </div>
                
                <div className="relative w-full max-w-[400px] perspective-[1000px]">
                   {/* Glow Effect */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] -z-10 rounded-full"></div>
                   <div className="transform rotate-x-12 transition-transform hover:rotate-0 duration-500">
                      <IMessageDemo />
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
