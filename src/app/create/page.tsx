
"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight, Flame, MessageSquare, Plus, Copy, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CreateGroupPage() {

  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName) return;
    
    setIsSubmitting(true);
    try {
        const res = await fetch('/api/create-group', {
            method: 'POST',
            body: JSON.stringify({ groupName }),
        });
        const data = await res.json();
        
        if (data.success) {
            setGroupCode(data.group.code);
        }
    } catch (e) {
        console.error(e);
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText("+15550107654");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black font-sans">
      <FloatingNav />
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-20">
        
        <div className="w-full max-w-lg">
            {!groupCode ? (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 text-center"
                >

                    <div className="inline-flex items-center justify-center h-16 w-16 mb-4">
                        <img src="/logo.png" alt="logo" className="h-12 w-12 object-contain invert" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight lowercase">
                        name your squad.
                    </h1>
                    <p className="text-zinc-500 lowercase">
                        enter a name to reserve your group's unique id.
                    </p>
                    <form onSubmit={handleCreate} className="space-y-6">
                        <div className="relative">
                            <input
                                type="text" 
                                placeholder="e.g. gym rats" 
                                className="w-full bg-transparent border-b-2 border-zinc-800 text-center text-3xl md:text-4xl py-4 focus:outline-none focus:border-white transition-colors placeholder:text-zinc-800 font-bold lowercase"
                                autoFocus
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </div>


                        <Button 
                            size="lg" 
                            disabled={!groupName || isSubmitting}
                            className="w-full h-14 rounded-full text-lg mt-8 lowercase font-bold"
                        >
                            {isSubmitting ? "creating..." : "create squad"} <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </form>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                >
                    <div className="text-center space-y-2">
                         <h1 className="text-2xl md:text-3xl font-bold tracking-tight lowercase">
                            squad created: <span className="text-orange-500">{groupName}</span>
                        </h1>
                        <p className="text-zinc-500 lowercase">
                            follow these steps to activate the referee.
                        </p>
                    </div>
                    
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6">
                        
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-mono text-sm border border-zinc-700">1</div>
                            <div className="space-y-1">
                                <h3 className="font-bold lowercase">Create Group Chat</h3>
                                <p className="text-sm text-zinc-400 lowercase leading-relaxed">
                                    Start a new chat (iMessage, WhatsApp, etc) with your friends. 
                                    <span className="text-zinc-500 ml-1">(min 2 people)</span>
                                </p>
                            </div>
                        </div>

                         {/* Step 2 */}
                         <div className="flex gap-4">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-mono text-sm border border-zinc-700">2</div>
                            <div className="space-y-2 w-full">
                                <h3 className="font-bold lowercase">Add Róki</h3>
                                <p className="text-sm text-zinc-400 lowercase leading-relaxed">
                                    Add this phone number to the group:
                                </p>
                                <div className="flex items-center gap-2">
                                     <code className="bg-black border border-zinc-800 px-3 py-2 rounded-lg text-lg font-mono text-white flex-1 text-center">
                                        (555) 010-7654
                                     </code>
                                     <Button size="icon" variant="outline" className="h-11 w-11 shrink-0 border-zinc-800" onClick={handleCopyNumber}>
                                        {copied ? <Check className="h-4 w-4 text-green-500"/> : <Copy className="h-4 w-4"/>}
                                     </Button>
                                </div>
                            </div>
                        </div>


                         {/* Step 3 */}
                         <div className="flex gap-4">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-mono text-sm border border-zinc-700 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-500 border-orange-500/30">3</div>
                            <div className="space-y-2 w-full">
                                <h3 className="font-bold lowercase text-white">Text Róki</h3>
                                <p className="text-sm text-zinc-400 lowercase leading-relaxed">
                                    Text this unique code to bind your group:
                                </p>
                                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-xl text-center shadow-lg shadow-orange-900/20">
                                     <span className="font-mono text-3xl font-bold tracking-widest text-white">START {groupCode}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-4">
                        <Link href="/dashboard" className="text-zinc-500 hover:text-white text-sm lowercase underline underline-offset-4 pointer-events-none opacity-50"> 
                            waiting for activation...
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>

      </main>
    </div>
  );
}
