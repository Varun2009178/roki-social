
import { NextResponse } from "next/server";
import { db } from "@/lib/storage";

export async function POST(req: Request) {
    try {
        const { Body, From } = await req.json();

        console.log(`[Twilio Webhook] From: ${From}, Body: ${Body}`);

        const text = Body.trim().toUpperCase();

        // Logic 1: START [CODE]
        if (text.startsWith("START ")) {
            const code = text.split(" ")[1];
            const group = db.groups.findByCode(code);

            if (group) {
                // In a real app, we would add 'From' to group.members
                // For now, just log success
                console.log(`[Twilio Webhook] Found group: ${group.name} for code ${code}`);

                // Return TwiML (XML) usually, but for mock just 200 OK
                return new NextResponse(`<Response><Message>Group '${group.name}' activated. Let the games begin.</Message></Response>`, {
                    headers: { 'Content-Type': 'text/xml' }
                });
            } else {
                return new NextResponse(`<Response><Message>Invalid code. Stop wasting my time.</Message></Response>`, {
                    headers: { 'Content-Type': 'text/xml' }
                });
            }
        }

        // Capture Check-ins (Stub)
        return new NextResponse(`<Response><Message>I'm listening...</Message></Response>`, {
            headers: { 'Content-Type': 'text/xml' }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
