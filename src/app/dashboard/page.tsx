
"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Flame, Star, CreditCard, History, Settings, Users, LogOut } from "lucide-react";
import Link from "next/link";

// Mock data to simulate database
const mockSubscription = {
    plan: "Pro Squad",
    status: "active",
    nextBilling: "Jan 1, 2025",
    amount: "$15.00",
    members: 4,
};

const mockPaymentHistory = [
    { id: 1, date: "Dec 1, 2024", amount: "$15.00", status: "Paid" },
    { id: 2, date: "Nov 1, 2024", amount: "$15.00", status: "Paid" },
    { id: 3, date: "Oct 1, 2024", amount: "$15.00", status: "Paid" },
];

const mockGroups = [
    { id: "gym-rats", name: "Gym Rats", members: 4, streak: 12, status: "active" },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black font-sans">
      <FloatingNav />
      
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                     <h1 className="text-3xl font-bold tracking-tight lowercase">dashboard</h1>
                     <p className="text-zinc-500 lowercase">manage your squad and subscription.</p>
                </div>
                <div className="flex items-center gap-2">
                     <span className="text-sm text-zinc-400 lowercase">varun@teyra.app</span>
                     <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-zinc-800">
                        <LogOut className="h-4 w-4 text-zinc-500" />
                     </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Content - Groups */}
                <div className="md:col-span-2 space-y-8">
                    
                    {/* Active Squads */}
                    <div className="space-y-4">
                         <h2 className="text-lg font-bold lowercase flex items-center gap-2">
                            <Users className="h-4 w-4 text-zinc-500" />
                            your squads
                         </h2>
                         {mockGroups.map((group) => (
                             <Card key={group.id} className="bg-zinc-900 border-zinc-800">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div className="space-y-1">
                                        <CardTitle className="lowercase">{group.name}</CardTitle>
                                        <CardDescription className="lowercase">{group.members} members • active</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-1 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                                        <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                                        <span className="text-orange-500 font-bold">{group.streak}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 w-[65%]"></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-zinc-500 mt-2 lowercase">
                                        <span>today's check-ins</span>
                                        <span>3/4 verified</span>
                                    </div>
                                </CardContent>
                             </Card>
                         ))}
                         
                         <Link href="/create" className="block">
                            <Button variant="outline" className="w-full border-dashed border-zinc-800 hover:bg-zinc-900 text-zinc-500 lowercase h-12">
                                + create new squad
                            </Button>
                         </Link>
                    </div>

                    {/* Payment History */}
                     <div className="space-y-4">
                         <h2 className="text-lg font-bold lowercase flex items-center gap-2">
                             <History className="h-4 w-4 text-zinc-500" />
                             payment history
                         </h2>
                         <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                             <table className="w-full text-sm text-left">
                                 <thead className="bg-zinc-900 text-zinc-500 border-b border-zinc-800">
                                     <tr>
                                         <th className="px-4 py-3 font-medium lowercase">date</th>
                                         <th className="px-4 py-3 font-medium lowercase">amount</th>
                                         <th className="px-4 py-3 font-medium lowercase text-right">status</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-zinc-800">
                                     {mockPaymentHistory.map((item) => (
                                         <tr key={item.id} className="hover:bg-zinc-800/50 transition-colors">
                                             <td className="px-4 py-3 text-zinc-300">{item.date}</td>
                                             <td className="px-4 py-3 text-zinc-300">{item.amount}</td>
                                             <td className="px-4 py-3 text-right">
                                                 <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500 lowercase">
                                                     {item.status}
                                                 </span>
                                             </td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>
                     </div>
                </div>


                {/* Sidebar - Subscription */}
                <div className="space-y-8">
                     <div className="space-y-4">
                         <h2 className="text-lg font-bold lowercase flex items-center gap-2">
                             <CreditCard className="h-4 w-4 text-zinc-500" />
                             subscription
                         </h2>
                         <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="lowercase flex justify-between items-center">
                                    {mockSubscription.plan}
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-500 lowercase border border-blue-500/20">
                                        {mockSubscription.status}
                                    </span>
                                </CardTitle>
                                <CardDescription className="lowercase">next billing: {mockSubscription.nextBilling}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-3xl font-bold lowercase">
                                    {mockSubscription.amount}<span className="text-sm font-normal text-zinc-500">/mo</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                     <Button className="w-full lowercase" variant="default">
                                         manage subscription
                                     </Button>
                                     <Button className="w-full lowercase" variant="ghost">
                                         cancel plan
                                     </Button>
                                </div>
                            </CardContent>
                         </Card>
                     </div>

                     {/* Dev Tools */}
                     <div className="space-y-4">
                        <h2 className="text-lg font-bold lowercase flex items-center gap-2">
                             <Settings className="h-4 w-4 text-zinc-500" />
                             developer tools
                         </h2>
                         <Link href="/dashboard/simulator">
                            <Button variant="outline" className="w-full border-dashed border-zinc-700 hover:bg-zinc-800 text-zinc-400 lowercase">
                                open sms simulator
                            </Button>
                         </Link>
                     </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}
