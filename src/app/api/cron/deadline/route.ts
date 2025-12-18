
import { NextResponse } from 'next/server';
import { db } from '@/lib/storage';
import { sendSMS } from '@/lib/twilio';
import { generateRefereeResponse } from '@/lib/ai';

export async function GET(req: Request) {
    // Verify Authorization Header (for cron-job.org)
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const groups = await db.groups.list();
        const activeGroups = groups.filter(g => g.status === 'active');
        let processed = 0;

        for (const group of activeGroups) {
            const now = new Date();
            const deadline = group.deadline ? new Date(group.deadline) : null;
            const isDeadlinePassed = deadline && now >= deadline;

            const members: string[] = (group as any).members || [];
            const progress: Record<string, any> = (group as any).weekly_progress || {};

            // Identify verified and pending members
            const verifiedMembers = members.filter(m => progress[m]?.verified);
            const pendingMembers = members.filter(m => !progress[m]?.verified);

            if (isDeadlinePassed) {
                // --- DYNAMIC DEADLINE RECAP --- 
                // Triggered exactly 7 days after goal setting (or last recap)
                const context = `
                        Group: ${group.name}
                        Goal: ${group.goal}
                        Total Members: ${members.length}
                        Passed: ${verifiedMembers.length} (${verifiedMembers.join(', ')})
                        Failed: ${pendingMembers.length} (${pendingMembers.join(', ')})
                    `;

                const aiSummary = await generateRefereeResponse(
                    "summarize the cycle. roast the losers. mention that goals are now reset for the new week.",
                    context
                );

                for (const memberPhone of members) {
                    await sendSMS(
                        memberPhone,
                        `roki checkup: ${aiSummary}\n\nreply "roki [new goal]" to start your next 7-day cycle.`
                    );
                }

                // Reset for next 7-day cycle
                await db.groups.update(group.id, {
                    goal: '',
                    deadline: '', // Will be reset when they set a new goal
                    weekly_progress: {}
                });
            } else {
                // --- DAILY ACCOUNTABILITY NUDGE ---
                // Only nudge if a goal exists and there are people who haven't finished
                if (group.goal && pendingMembers.length > 0) {
                    const aiNudge = await generateRefereeResponse(
                        "remind the group that some members (losers) haven't finished their goal yet. be cold and demanding. mention their specific deadline.",
                        `Group: ${group.name}, Goal: ${group.goal}, Pending: ${pendingMembers.join(', ')}, Deadline: ${group.deadline}`
                    );

                    for (const memberPhone of members) {
                        await sendSMS(
                            memberPhone,
                            `roki daily nudge: ${aiNudge}`
                        );
                    }
                }
            }
            processed++;
        }

        return NextResponse.json({ success: true, processed });

    } catch (error) {
        console.error("Cron Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
