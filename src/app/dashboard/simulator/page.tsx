
"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Send, Smartphone, Eye, EyeOff, Trash2, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
}

export default function SimulatorPage() {
  const [phone, setPhone] = useState("+15550109999");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isUGCMode, setIsUGCMode] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, isTyping]);

  // Keyboard shortcut for UGC mode
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'h') setIsUGCMode(prev => !prev);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || isTyping) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36),
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prev => [...prev, userMsg]);
    setLogs(prev => [...prev, `[${userMsg.timestamp}] OUTBOUND (${phone}): ${message}`]);
    setMessage("");
    setIsTyping(true);

    try {
        const res = await fetch('/api/twilio-webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Body: message, From: phone })
        });
        
        const data = await res.text();
        const match = data.match(/<Message>([\s\S]*?)<\/Message>/);
        const botReply = match ? match[1] : (res.status === 200 ? "ok." : "system error.");

        // Simulate network delay for realistic video
        setTimeout(() => {
            const botMsg: ChatMessage = {
                id: Math.random().toString(36),
                role: 'bot',
                content: botReply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setChats(prev => [...prev, botMsg]);
            setLogs(prev => [...prev, `[${botMsg.timestamp}] INBOUND (Bot): ${botReply}`]);
            setIsTyping(false);
        }, 1500);

    } catch (err) {
        setIsTyping(false);
        setLogs(prev => [...prev, `[Error] ${err}`]);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black font-sans overflow-hidden">
      <AnimatePresence>
        {!isUGCMode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <FloatingNav />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Controls - Hidden in UGC Mode */}
      <AnimatePresence>
        {!isUGCMode && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed top-28 left-6 z-[60] space-y-4"
          >
            <Button variant="ghost" onClick={() => router.back()} className="text-zinc-500 hover:text-white lowercase block">
                ← back
            </Button>
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-4 rounded-2xl space-y-4 w-64 shadow-2xl">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Simulating From</label>
                    <input 
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-zinc-500"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 bg-zinc-800 border-zinc-700 text-xs lowercase"
                        onClick={() => setIsUGCMode(true)}
                    >
                        <Eye className="h-3 w-3 mr-1" /> ugc mode
                    </Button>
                    <Button 
                        size="icon" 
                        variant="outline" 
                        className="bg-zinc-800 border-zinc-700 h-8 w-8 text-zinc-500"
                        onClick={() => {setChats([]); setLogs([]);}}
                    >
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
                <p className="text-[10px] text-zinc-600 leading-tight">
                    tip: press <kbd className="text-zinc-400">H</kbd> to toggle clean mode.
                </p>
            </div>

            {/* Logs Mini Panel */}
            <div className="bg-black/50 border border-zinc-900 rounded-2xl p-4 w-64 h-48 overflow-y-auto font-mono text-[10px] text-zinc-500 space-y-1">
                <div className="text-zinc-700 mb-2 font-bold flex items-center gap-1"><Zap className="h-3 w-3"/> server logs</div>
                {logs.map((log, i) => (
                    <div key={i} className="leading-tight">{log}</div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`flex-1 flex items-center justify-center transition-all duration-700 ${isUGCMode ? 'scale-100' : 'scale-[0.85] mt-10'}`}>
        
        {/* iPhone Framework - Smaller & Sharper */}
        <div className="relative w-[340px] h-[690px] bg-zinc-950 rounded-[3rem] border-[10px] border-zinc-900 shadow-[0_0_100px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden ring-1 ring-zinc-800">
            
            {/* Top Notch / Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full ml-auto mr-4"></div>
            </div>

            {/* Status Bar */}
            <div className="h-12 px-8 flex items-end justify-between text-[11px] font-bold pb-1 z-40 bg-zinc-950/90 backdrop-blur-md">
                <span>9:41</span>
                <div className="flex gap-1.5 items-center">
                    <div className="flex gap-0.5">
                        <div className="w-0.5 h-2 bg-white rounded-full"></div>
                        <div className="w-0.5 h-2.5 bg-white rounded-full"></div>
                        <div className="w-0.5 h-3 bg-white rounded-full"></div>
                        <div className="w-0.5 h-3 bg-white/30 rounded-full"></div>
                    </div>
                    <span>5G</span>
                    <div className="w-5 h-2.5 border border-white/40 rounded-sm relative">
                        <div className="absolute left-0.5 top-0.5 bottom-0.5 right-1.5 bg-white rounded-px"></div>
                    </div>
                </div>
            </div>

            {/* Chat Header */}
            <div className="p-3 border-b border-zinc-900 flex flex-col items-center bg-zinc-950/90 backdrop-blur-md z-40">
                <div className="w-9 h-9 bg-zinc-800 rounded-full mb-1 flex items-center justify-center">
                    <img src="/logo.png" className="w-5 h-5 invert opacity-80" alt="R" />
                </div>
                <span className="text-[10px] font-bold text-zinc-300">Róki</span>
                <span className="text-[8px] text-zinc-600 font-mono tracking-tighter">+1 (844) 459-4193</span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black scrollbar-hide">
                <div className="text-center py-4">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Today 12:41 PM</span>
                </div>

                <AnimatePresence mode="popLayout">
                    {chats.length === 0 && (
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex justify-center italic text-zinc-700 text-xs py-10">
                            start texting to activate the referee...
                        </motion.div>
                    )}
                    {chats.map((chat) => (
                        <motion.div
                            key={chat.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] px-4 py-2.5 rounded-[1.2rem] text-sm leading-tight ${
                                chat.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-tr-sm' 
                                : 'bg-zinc-800 text-zinc-100 rounded-tl-sm'
                            }`}>
                                {chat.content}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-zinc-800 px-4 py-3 rounded-[1.2rem] rounded-tl-sm flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 pb-8 bg-zinc-950/80 backdrop-blur-md">
                <form onSubmit={handleSend} className="relative flex items-center gap-2">
                    <div className="flex-1 relative">
                        <input 
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2.5 text-sm focus:outline-none placeholder:text-zinc-600"
                            placeholder="iMessage"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                         <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <div className="w-5 h-5 bg-zinc-700 rounded-full flex items-center justify-center">
                                 <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
                             </div>
                         </div>
                    </div>
                    <Button 
                        type="submit"
                        size="icon" 
                        disabled={!message || isTyping}
                        className={`rounded-full h-8 w-8 shrink-0 transition-all ${
                            message ? 'bg-blue-600 scale-100' : 'bg-zinc-800 scale-90'
                        }`}
                    >
                        <Send className="h-4 w-4 text-white" />
                    </Button>
                </form>
            </div>

            {/* Bottom Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full"></div>
        </div>

        {/* Exit UGC Mode Button (Floating & Subtle) */}
        {isUGCMode && (
          <button 
            onClick={() => setIsUGCMode(false)}
            className="fixed bottom-10 right-10 p-4 bg-zinc-900/50 hover:bg-zinc-800 rounded-full backdrop-blur-md border border-zinc-800 text-zinc-500 transition-all hover:text-white group"
          >
            <EyeOff className="h-5 w-5" />
            <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-xs font-mono transition-opacity whitespace-nowrap">exit clean mode</span>
          </button>
        )}
      </main>
    </div>
  );
}
