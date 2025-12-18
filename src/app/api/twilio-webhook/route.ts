
import { NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { generateRefereeResponse, analyzeEvidence } from "@/lib/ai";
import { getSevenDaysFromNow } from "@/lib/utils";

// Types
type MessageType = 'ACTIVATION' | 'GOAL_SETTING' | 'CHECK_IN' | 'STATUS_CHECK' | 'UNKNOWN';

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

        console.log(`[Twilio Webhook]From: ${From}, Body: ${text}, Media: ${mediaUrl ? 'Yes' : 'No'} `);

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

        // --- ACTIVATION / JOIN (roki [CODE] or start [CODE]) ---
        else if ((text.startsWith("roki ") || text.startsWith("start ")) && text.length < 20) {
            intent = 'ACTIVATION';
            const code = text.split(" ")[1];
            const group = await db.groups.findByCode(code);

            if (group) {
                // Add user if not already in (simulate joining the group chat)
                // In real generic SMS, this binds this number to the group
                if (!group.members.some((m: string) => m.includes(From) || From.includes(m))) {
                    group.members.push(From);
                    await db.groups.update(group.id, { members: group.members });
                }
                reply = `squad found.\nreply "roki" to join.`;
            } else {
                reply = "invalid code.";
            }
        }

        // --- CONTEXTUAL COMMANDS ---
        else {
            const groups = await db.groups.list();
            // Loose matching for phone numbers
            const myGroup = groups.find((g: any) => g.members?.some((m: string) => m.includes(From) || From.includes(m)));

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
            }
        }

        // 3. Return TwiML
        // If no reply matched, maybe silence (silent member), or help
        if (!reply && text === 'help') {
            reply = "commands: roki [code], status, done.";
        }

        if (reply) {
            return new NextResponse(`<Response><Message>${reply}</Message></Response>`, {
                headers: { 'Content-Type': 'text/xml' }
            });
        } else {
            // Silent
            return new NextResponse(`<Response></Response>`, {
                headers: { 'Content-Type': 'text/xml' }
            });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}




