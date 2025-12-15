
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Check, X, ShieldAlert, Gavel, Flame, Users } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black font-sans">
      <FloatingNav />
      


      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-24">
            

            {/* 1. Hero / Definition */}
            <div className="text-center space-y-8">
                <img src="/logo.png" alt="logo" className="h-24 w-24 object-contain mx-auto mb-4 invert" />
                <h1 className="text-5xl md:text-7xl font-medium tracking-tighter lowercase">
                    the referee for<br/>
                    <div className="text-zinc-500">your friend group.</div>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto lowercase leading-relaxed tracking-tight">
                    róki is a group accountability enforcer that lives inside your existing group chats.
                    <br/>
                    <span className="text-white font-medium">not a friend. not a therapist. not a "vibes" ai.</span>
                </p>
            </div>

            {/* 2. The Mechanics */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
                 <div className="space-y-8">
                    <h2 className="text-3xl font-medium tracking-tighter lowercase">how it works</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-mono shrink-0">1</div>
                            <div className="space-y-1">
                                <h3 className="font-medium text-white lowercase tracking-tight">captain creates group</h3>
                                <p className="text-zinc-400 text-sm lowercase">one person (the captain) gets the number and adds róki to an existing group chat.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-mono shrink-0">2</div>
                            <div className="space-y-1">
                                <h3 className="font-medium text-white lowercase tracking-tight">set brutal rules</h3>
                                <p className="text-zinc-400 text-sm lowercase">"gym 3x/week", "photo proof required", "deadline 10pm". that's it.</p>
                            </div>
                        </div>
                         <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-mono shrink-0">3</div>
                            <div className="space-y-1">
                                <h3 className="font-medium text-white lowercase tracking-tight">daily loop</h3>
                                <p className="text-zinc-400 text-sm lowercase">
                                    you send a photo. róki verifies it, updates the streak, and publicly confirms.
                                    <br/>
                                    <span className="text-zinc-500 italic">"varun is good. chris + pranav — 2 hours left."</span>
                                </p>
                            </div>
                        </div>
                         <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-mono shrink-0">4</div>
                            <div className="space-y-1">
                                <h3 className="font-medium text-white lowercase tracking-tight">weekly summary</h3>
                                <p className="text-zinc-400 text-sm lowercase">
                                    róki posts the leaderboard: who carried, who sold, and the team score.
                                    <br/>
                                    <span className="text-zinc-500 italic">short. brutal. funny.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                 </div>

                 <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 space-y-6">
                    <h3 className="text-xl font-medium tracking-tight lowercase flex items-center gap-2">
                        <X className="h-5 w-5 text-red-500" />
                        what róki is <span className="text-white">not</span>
                    </h3>
                    <ul className="space-y-3">
                        {["not a best friend", "not 1-on-1", "not emotional", "not for journaling", "not long conversations", "not 'how are you feeling?'"].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-zinc-400 lowercase">
                                <X className="h-4 w-4 text-zinc-600" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-6 mt-6 border-t border-zinc-800">
                        <p className="text-white font-medium lowercase italic tracking-tight">
                            "róki doesn't motivate you.<br/>your friends do."
                        </p>
                    </div>
                 </div>
            </div>

            {/* 3. Comparison (The 5 Pillars) */}
            <div className="space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-medium lowercase tracking-tighter mb-4">enforcement <span className="text-zinc-600">&gt;</span> empathy</h2>
                    <p className="text-zinc-400 lowercase tracking-tight">why róki beats personality ai.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
                        <Users className="h-8 w-8 text-blue-500 mb-4" />
                        <h3 className="text-xl font-medium tracking-tight text-white lowercase mb-2">group-first</h3>
                        <p className="text-sm text-zinc-400 lowercase mb-4">useless alone. built ONLY for groups. social pressure is the product.</p>
                        <div className="text-xs text-zinc-600 lowercase border-t border-zinc-900 pt-2">
                            vs others: designed for 1 person
                        </div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
                        <ShieldAlert className="h-8 w-8 text-red-500 mb-4" />
                        <h3 className="text-xl font-medium tracking-tight text-white lowercase mb-2">nonchalant</h3>
                        <p className="text-sm text-zinc-400 lowercase mb-4">róki keeps receipts. doesn't argue. doesn't care about excuses.</p>
                        <div className="text-xs text-zinc-600 lowercase border-t border-zinc-900 pt-2">
                             vs others: "supportive & relatable"
                        </div>
                    </div>

                     <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
                        <img src="/logo.png" alt="logo" className="h-8 w-8 object-contain mb-4 grayscale invert" />
                        <h3 className="text-xl font-medium tracking-tight text-white lowercase mb-2">public scoring</h3>
                        <p className="text-sm text-zinc-400 lowercase mb-4">wins + failures are visible. that social cost is the entire product.</p>
                        <div className="text-xs text-zinc-600 lowercase border-t border-zinc-900 pt-2">
                             vs others: private reminders
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="text-center py-12">
                 <h2 className="text-4xl font-medium lowercase tracking-tighter mb-6">
                    people don't fail because they lack motivation.<br/>
                    <span className="text-zinc-600">they fail because no one notices when they flake.</span>
                 </h2>
                 <p className="text-xl text-white lowercase tracking-tight">róki makes flaking visible.</p>
            </div>
        </div>
      </main>
    </div>
  );
}
