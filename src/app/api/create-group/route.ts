
import { NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { RO_KI_PHONE } from "@/lib/twilio";

export async function POST(req: Request) {
    try {
        const { groupName } = await req.json();

        if (!groupName) {
            return NextResponse.json({ error: "Group name is required" }, { status: 400 });
        }

        const group = await db.groups.create(groupName);

        return NextResponse.json({
            success: true,
            group,
            botNumber: RO_KI_PHONE || "(555) 000-0000"
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
