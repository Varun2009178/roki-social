
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/ui/floating-navbar";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <FloatingNav />
      <div className="w-full max-w-sm space-y-8 pt-20">
        <div className="flex flex-col items-center space-y-2">
            <Link href="/">
                <img src="/logo.png" alt="roki" className="w-12 h-12 invert mb-4 hover:scale-105 transition-transform" />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tighter text-white">login to róki</h1>
            <p className="text-zinc-500 text-sm">enter your phone number to access dashboard</p>
        </div>

        <div className="space-y-4">
            <div className="space-y-2">
                <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-mono text-sm"
                />
            </div>
            <Button className="w-full bg-white text-black hover:bg-zinc-200 font-medium tracking-tight h-10 rounded-lg">
                send code
            </Button>
            
            <p className="text-center text-xs text-zinc-600">
                don't have an account? <Link href="/create" className="text-zinc-400 hover:text-white underline decoration-zinc-700">create squad</Link>
            </p>
        </div>
      </div>
    </main>
  );
}
