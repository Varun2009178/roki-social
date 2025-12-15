
"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black font-sans">
      <FloatingNav />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl space-y-8">
             <h1 className="text-3xl font-bold lowercase tracking-tight">Privacy Policy</h1>
             <p className="text-zinc-500 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
             

             <div className="space-y-6 text-zinc-400 text-sm leading-relaxed lowercase">
                <p>
                    <strong>1. data collection.</strong> we collect phone numbers and the media (photos/videos) submitted for verification. 
                    this data is essential for the evidence log and accountability mechanism.
                </p>
                <p>
                    <strong>2. usage.</strong> data is used strictly to verify completion of tasks and update group standings.
                    submission metadata (time, date) is used to enforce deadlines.
                </p>
                <p>
                    <strong>3. group visibility.</strong> by design, submissions are visible to your designated group members. 
                    public scoring and evidence transparency are the core functions of the service.
                </p>
                <p>
                    <strong>4. security.</strong> standard encryption is applied. do not submit sensitive personal information unrelated to your goals.
                </p>

                <p>
                    <strong>5. communications.</strong> automated messages are sent only as per the rules defined by the group's captain.
                    users may opt out of receiving messages at any time by replying <strong>STOP</strong> to any message.
                </p>
             </div>
        </div>
      </main>
    </div>
  );
}
