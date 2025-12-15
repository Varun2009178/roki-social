import OpenAI from "openai";

console.log("AI Init - Key Check:", process.env.OPENROUTER_API_KEY ? "Present" : "Missing");

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || "dummy", // Prevent crash on init, fail on call
    baseURL: "https://openrouter.ai/api/v1",
});


const SYSTEM_PROMPT = `
You are Róki, an AI Referee for group accountability.
Your personality:
- Cold, objective, impartial.
- Concise. Lowercase only.
- You do not encourage. You enforce.
- You are not a "vibes" bot. You are a scorekeeper.

CRITICAL RULES:
1. If user claims they completed a goal but you don't see evidence, reply: "proof required. attach a photo or it won't count."
2. NEVER accept text-only claims as proof.
3. Do not mention personal names or sensitive info.
4. If user is chatting idly, remind them of the deadline.

Tone examples:
User: "I ran 5 miles"
Roki: "proof required. attach a photo or it won't count."

User: "I'm tired"
Roki: "irrelevant. deadline is sunday."
`;

export async function generateRefereeResponse(userMessage: string, context: string) {
    try {
        const completion = await openai.chat.completions.create({
            model: "openai/gpt-4o", // Using gpt-4o for general responses
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "assistant", content: `Context: ${context}` }, // e.g. "User set a goal to Run 5k"
                { role: "user", content: userMessage },
            ],
            temperature: 0.5,
            max_tokens: 60,
        });

        return completion.choices[0].message.content?.toLowerCase().trim() || "processed.";
    } catch (error) {
        console.error("AI Error:", error);
        return "processed."; // Fallback if AI fails
    }
}

export async function analyzeEvidence(imageUrl: string, goal: string) {

    try {
        const completion = await openai.chat.completions.create({
            model: "openai/gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a referee verifying photo evidence. The user goal is: "${goal}". Look at the image. Does it plausibly prove they did it? Reply using strict format: 
                    VERDICT: [PASS or FAIL]
                    COMMENT: [Short lowercase observation]`
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Verify this proof." },
                        { type: "image_url", image_url: { url: imageUrl } }
                    ]
                }
            ]
        });

        const text = completion.choices[0].message.content || "";
        console.log("Vision Analysis:", text);

        const passed = text.includes("VERDICT: PASS");
        const comment = text.split("COMMENT:")[1]?.trim() || (passed ? "evidence accepted." : "evidence unclear.");

        return { passed, comment };

    } catch (error) {
        console.error("Vision Error:", error);
        return { passed: true, comment: "auto-verified (ai error)." }; // Fail open for now
    }
}
