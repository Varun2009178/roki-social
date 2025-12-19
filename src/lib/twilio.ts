
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Only initialize if keys are present (safe for local dev without keys)
export const twilioClient = (accountSid && authToken)
    ? twilio(accountSid, authToken)
    : null;

export const RO_KI_PHONE = phoneNumber;

export async function sendSMS(to: string, body: string) {
    if (!twilioClient) {
        console.log(`[Mock SMS] To: ${to}, Body: ${body}`);
        return;
    }

    try {
        // Handle WhatsApp prefixing automatically
        const isWhatsApp = RO_KI_PHONE?.startsWith('whatsapp:');
        const finalFrom = RO_KI_PHONE;
        const finalTo = (isWhatsApp && !to.startsWith('whatsapp:')) ? `whatsapp:${to}` : to;

        await twilioClient.messages.create({
            body,
            from: finalFrom,
            to: finalTo
        });
        console.log(`[Twilio SMS] Sent to ${finalTo}`);
    } catch (error) {
        console.error("Twilio Send Error:", error);
    }
}
