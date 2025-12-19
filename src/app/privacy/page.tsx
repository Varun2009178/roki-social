
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
                     <strong>3. no sharing of data.</strong> we do not share, sell, or rent your phone numbers or any sms consent data with third parties or affiliates for marketing or promotional purposes. your data is used exclusively for the róki service.
                 </p>
                 <p>
                     <strong>4. group visibility.</strong> by design, submissions are visible to your designated group members. 
                     public scoring and evidence transparency are the core functions of the service.
                 </p>
                 <p>
                     <strong>5. security.</strong> standard encryption is applied. do not submit sensitive personal information unrelated to your goals.
                 </p>
                 <p>
                     <strong>6. communications.</strong> automated messages are sent based on group activity. users may opt out of receiving messages at any time by replying <strong>STOP</strong> to any message.
                 </p>
                 <p>
                     <strong>7. sms disclosure.</strong> message and data rates may apply. message frequency varies. carriers are not liable for delayed or undelivered messages.
                 </p>
                 <p>
                     <strong>8. contact.</strong> for questions regarding this policy, contact varun@teyra.app.
                 </p>
              </div>
        </div>
      </main>
    </div>
  );
}
