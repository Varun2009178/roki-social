
"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black font-sans">
      <FloatingNav />
       <main className="flex-1 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl space-y-8">
             <h1 className="text-3xl font-bold lowercase tracking-tight">Terms of Service</h1>
             <p className="text-zinc-500 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
             

             <div className="space-y-6 text-zinc-400 text-sm leading-relaxed lowercase">
                <p>
                    <strong>1. service agreement.</strong> róki acts as an automated impartial adjudicator. 
                    by activating the service, the group agrees to abide by the calculated scores and streaks.
                </p>
                <p>
                    <strong>2. standard of evidence.</strong> users must provide photo verification for tasks. 
                    róki’s validation decisions are final. excuses (technical or personal) are not recognized by the system.
                </p>
                <p>
                    <strong>3. subscriptions.</strong> payment ensures continued service availability. 
                    failure to pay results in immediate suspension of scoring for the group.
                </p>
                <p>
                    <strong>4. liability.</strong> róki is a software tool for tracking habits. 
                    we are not liable for disputes, social fallout, or injuries resulting from group activities.
                </p>
                <p>
                    <strong>5. termination.</strong> account access may be revoked for attempts to manipulate the scoring engine or abuse the platform infrastructure.
                </p>

                <p>
                    <strong>6. u.s. sms compliance.</strong> data rates may apply. message frequency varies. 
                    reply <strong>STOP</strong> at any time to opt out of messages. reply <strong>HELP</strong> for support.
                </p>
             </div>
        </div>
      </main>
    </div>
  );
}
