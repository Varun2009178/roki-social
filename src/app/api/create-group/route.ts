
import { NextResponse } from "next/server";
import { db } from "@/lib/storage";

export async function POST(req: Request) {
    try {
        const { groupName } = await req.json();

        if (!groupName) {
            return NextResponse.json({ error: "Group name is required" }, { status: 400 });
        }

        const group = db.groups.create(groupName);

        return NextResponse.json({
            success: true,
            group
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
