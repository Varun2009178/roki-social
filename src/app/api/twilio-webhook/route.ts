import { NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { generateRefereeResponse, analyzeEvidence } from "@/lib/ai";
import { getSevenDaysFromNow } from "@/lib/utils";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Types
type MessageType = 'ACTIVATION' | 'GOAL_SETTING' | 'CHECK_IN' | 'STATUS_CHECK' | 'UNKNOWN';

export async function GET() {
    return new NextResponse("Róki Webhook is active. Use POST for Twilio messages.", {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
    });
}

export async function POST(req: Request) {
    try {
        // 1. Check content type to parse correctly (TwiML vs JSON for simulator)
        const contentType = req.headers.get("content-type") || "";
        let body: any = {};

        if (contentType.includes("application/json")) {
            body = await req.json();
        } else {
            // Handle Form Data from real Twilio
            const formData = await req.formData();
            body = Object.fromEntries(formData.entries());
        }

        const { Body, From } = body;
        const text = (Body || "").trim().toLowerCase(); // Enforce lowercase referee style

        // Twilio Media Logic
        const mediaUrl = body.MediaUrl0 || body.mediaUrl; // Real Twilio uses MediaUrl0, Simulator uses mediaUrl

        console.log(`[Twilio Webhook] From: ${From || 'UNKNOWN'}, Body: "${text}", Media: ${mediaUrl ? 'Yes' : 'No'} `);

        if (!From) {
            console.error("[Twilio Webhook] Received request without 'From' number. Body:", body);
            return new NextResponse(`<Response><Message>roki: error - missing phone number</Message></Response>`, {
                headers: { 'Content-Type': 'text/xml' }
            });
        }

        // 2. Determine Intent
        let intent: MessageType = 'UNKNOWN';
        let reply = "";

        // --- GLOBAL COMMANDS (HELP / STOP) ---
        if (text === 'stop' || text === 'cancel' || text === 'unsubscribe') {
            reply = "you have been opted out. reply START to rejoin.";
        }
        else if (text === 'help' || text === 'info' || text === 'options') {
            reply = "commands:\n• roki [code]: join a squad\n• status: check deadline & score\n• done: submit proof (attach photo)\n• stop: opt out";
        }

        // --- ACTIVATION / JOIN (roki [CODE] or start [CODE] or just [CODE]) ---
        const isFourDigitCode = /^\d{4}$/.test(text);
        if (((text.startsWith("roki ") || text.startsWith("start ")) && text.length < 20) || isFourDigitCode) {
            intent = 'ACTIVATION';
            const code = isFourDigitCode ? text : text.split(" ")[1];
            console.log(`[Twilio Webhook] Searching for group with code: ${code}`);
            const group = await db.groups.findByCode(code);

            if (group) {
                console.log(`[Twilio Webhook] Found group: ${group.name} (ID: ${group.id})`);
                // Add user if not already in
                const normalizedFrom = From.replace(/\D/g, '');
                const isMember = group.members.some((m: string) => m.replace(/\D/g, '').includes(normalizedFrom));

                if (!isMember) {
                    group.members.push(From);
                    await db.groups.update(group.id, { members: group.members });
                    console.log(`[Twilio Webhook] Added ${From} to group ${group.name}`);
                }
                reply = `squad found: ${group.name}.\nreply "roki" to join the chat.`;
            } else if (isFourDigitCode) {
                // If they sent digits but it's not a valid code, don't stay silent
                reply = "invalid code. make sure you typed it correctly from the website.";
            } else {
                console.log(`[Twilio Webhook] No group found for code: ${code}`);
                reply = "invalid code. make sure you typed it correctly from the website.";
            }
        }

        // --- CONTEXTUAL COMMANDS ---
        else {
            const myGroup = await db.groups.findByMember(From);

            if (myGroup) {
                // JOIN / CONFIRMATION (Accepts "roki", "roki join", "im in")
                if (text === 'roki' || text.includes('join') || text.includes("i'm in") || text.includes("im in")) {
                    // Set status to active if pending
                    if (myGroup.status !== 'active') {
                        await db.groups.update(myGroup.id, { status: 'active' });
                        // Re-fetch to comply with type safety if needed, or just know it's active
                        myGroup.status = 'active';
                    }

                    if (myGroup.goal) {
                        reply = `you're in. current goal: ${myGroup.goal}`;
                    } else {
                        // AI Intro
                        reply = await generateRefereeResponse(text, "User just joined. Tell them to set a weekly goal succinctly.");
                    }
                }

                // SET GOAL (First message after activation that isn't a command)
                else if (myGroup.status === 'active' && !myGroup.goal) {
                    // This message MUST be the goal
                    intent = 'GOAL_SETTING';
                    await db.groups.update(myGroup.id, {
                        goal: text,
                        deadline: getSevenDaysFromNow()
                    });

                    // AI Response for Goal
                    reply = await generateRefereeResponse(text, "User just set this goal. Accept it formally and state deadline is sunday.");
                }

                // CHECK IN (Must have media or 'done' keyword)
                else if (mediaUrl || text === 'done' || text.includes("proof") || text.includes("did it")) {
                    intent = 'CHECK_IN';

                    if (mediaUrl) {
                        // AI Vision Analysis
                        const analysis = await analyzeEvidence(mediaUrl, myGroup.goal || "general fitness");
                        reply = analysis.comment;

                        if (analysis.passed) {
                            const currentProgress = myGroup.weekly_progress || {};
                            currentProgress[From] = {
                                verified: true,
                                last_seen: new Date().toISOString()
                            };
                            await db.groups.update(myGroup.id, { weekly_progress: currentProgress });
                        }
                    } else {
                        reply = "photo proof required.";
                    }
                }

                // STATUS
                else if (text === 'status') {
                    intent = 'STATUS_CHECK';
                    reply = `status: ${myGroup.goal || 'no goal set'}\ndeadline: sunday 11:59pm.`;
                }



                // FALLBACK AI CHAT (If none of above, but active)
                else if (!reply) {
                    reply = await generateRefereeResponse(text, `User sent message. Goal: "${myGroup.goal}". NO photo attached. If they claim completion, demand proof.`);
                }
            } else {
                // Not in a group and didn't trigger activation
                if (!reply) {
                    reply = "you aren't in a squad yet. text 'roki [code]' to join.";
                }
            }
        }

        // 3. Return TwiML
        // If no reply matched, maybe silence (silent member), or help
        if (!reply && text === 'help') {
            reply = "commands: roki [code], status, done.";
        }

        if (reply) {
            // Simple escape for XML safety
            const escapedReply = reply.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return new NextResponse(`<Response><Message>${escapedReply}</Message></Response>`, {
                headers: { 'Content-Type': 'text/xml' }
            });
        } else {
            // Silent
            return new NextResponse(`<Response></Response>`, {
                headers: { 'Content-Type': 'text/xml' }
            });
        }

    } catch (error: any) {
        console.error("Webhook Error:", error);
        const errorMessage = error.message || "unknown error";
        return new NextResponse(`<Response><Message>roki error: ${errorMessage}</Message></Response>`, {
            headers: { 'Content-Type': 'text/xml' }
        });
    }
}




