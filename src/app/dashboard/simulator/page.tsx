
"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SimulatorPage() {
  const [phone, setPhone] = useState("+15550109999");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    // Add user message to logs
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] OUTBOUND (${phone}): ${message}`]);


    try {
        const res = await fetch('/api/twilio-webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Body: message,
                From: phone
            })
        });
        

        const data = await res.text();
        
        // Parse TwiML to get the message text (support newlines with [\s\S])
        const match = data.match(/<Message>([\s\S]*?)<\/Message>/);
        const botReply = match ? match[1] : (res.status === 200 ? "OK - No Reply" : "Error");

        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] INBOUND (Bot): ${botReply}`]);
        setMessage("");

    } catch (err) {
        setLogs(prev => [...prev, `[Error] Failed to send: ${err}`]);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black font-sans">
      <FloatingNav />
      {/* Back Button */}
       <div className="fixed top-24 left-4 z-40">
           <Button variant="ghost" onClick={() => router.back()} className="text-zinc-500 hover:text-white lowercase">
               ← back
           </Button>
       </div>

      <main className="flex-1 flex flex-col items-center justify-center py-32 px-4">
        <div className="w-full max-w-2xl space-y-8">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
                    <Smartphone className="h-8 w-8 text-zinc-400" />
                </div>
                <h1 className="text-3xl font-bold lowercase tracking-tight">sms simulator</h1>
                <p className="text-zinc-500 lowercase">fake a text message to test the webhook.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 h-[500px]">
                {/* Console / Logs */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 font-mono text-xs text-zinc-400 overflow-y-auto space-y-2 relative">
                    <div className="absolute top-2 right-2 text-[10px] uppercase tracking-wider text-zinc-600 font-bold border border-zinc-900 bg-black px-2 py-1 rounded">Server Logs</div>
                    {logs.length === 0 && <span className="opacity-30 italic">waiting for events...</span>}
                    {logs.map((log, i) => (
                        <div key={i} className="border-b border-white/5 pb-1 mb-1 last:border-0">{log}</div>
                    ))}
                </div>

                {/* Phone Interface */}
                <div className="bg-white text-black rounded-[2.5rem] border-4 border-zinc-800 p-6 flex flex-col shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-100 border-b border-zinc-200 flex justify-center items-center">
                        <div className="w-16 h-4 bg-black rounded-b-xl"></div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto py-8 space-y-4">

                         {/* Fake Chat History */}
                         <div className="flex justify-start">
                             <div className="bg-zinc-200 text-black px-4 py-2 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
                                 im roki. who dis?
                             </div>
                         </div>
                         {logs.map((l, i) => {
                             const isOutbound = l.includes("OUTBOUND");
                             const content = l.split('): ')[1];
                             return (
                                <div key={i} className={`flex ${isOutbound ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`${isOutbound ? 'bg-blue-500 text-white rounded-tr-sm' : 'bg-zinc-200 text-black rounded-tl-sm'} px-4 py-2 rounded-2xl text-sm max-w-[80%]`}>
                                        {content}
                                    </div>
                                </div>
                             );
                         })}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="mt-4 flex gap-2">
                        <input 
                            className="flex-1 bg-zinc-100 border-0 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button size="icon" className="rounded-full h-10 w-10 shrink-0 bg-blue-500 hover:bg-blue-600">
                            <Send className="h-4 w-4 text-white" />
                        </Button>
                    </form>
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-4 items-center">
                <span className="text-sm text-zinc-500 font-mono">Simulating From:</span>
                <input 
                    className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm font-mono text-white focus:outline-none focus:border-zinc-700"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

        </div>
      </main>
    </div>
  );
}
