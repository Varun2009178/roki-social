
# 📱 Twilio Setup Guide for Róki

Currently, Róki uses a **Mock Simulator** (`/dashboard/simulator`). To make it work with **Real SMS**, follow these steps.

## Phase 1: Get a Number
1. **Create Account**: Sign up at [twilio.com](https://www.twilio.com).
2. **Buy a Number**:
   - Go to **Phone Numbers > Manage > Buy a Number**.
   - Make sure it has **SMS** capabilities.
   - Cost is usually ~$1.00/month (plus per-message fees).

## Phase 2: Connect Localhost (Development)
Since your app is running on your laptop (`localhost:3000`), Twilio cannot reach it directly. You need a "tunnel".

1. **Install ngrok** (if you don't have it):
   - Mac: `brew install ngrok/ngrok/ngrok`
   - Or download from [ngrok.com](https://ngrok.com).

2. **Start the Tunnel**:
   - In a new terminal window, run:
     ```bash
     ngrok http 3000
     ```
   - Copy the URL that looks like `https://a1b2-c3d4.ngrok.io`.

3. **Configure Twilio Webhook**:
   - Go to **Phone Numbers > Active Numbers**.
   - Click your phone number.
   - Scroll down to **Messaging**.
   - Under "A Message Comes In", select **Webhook**.
   - Paste your ngrok URL + the api path:
     ```
     https://YOUR-NGROK-URL.ngrok.io/api/twilio-webhook
     ```
   - Ensure method is **POST**.
   - Click **Save**.

4. **Test It**:
   - Text "START [CODE]" from your real phone to your Twilio number.
   - Check your terminal running the Next.js app. You should see `[Twilio Webhook] From: ...` logs!

## Phase 3: Go Live (Production)
When you deploy to Vercel, `ngrok` is no longer needed.

1. **Deploy to Vercel**:
   - Push your code to GitHub.
   - Import project in Vercel.
   - Your live URL will be `https://roki-webapp.vercel.app`.

2. **Update Twilio Webhook**:
   - Go back to Twilio Dashboard.
   - Change the Webhook URL to your real prod URL:
     ```
     https://roki-webapp.vercel.app/api/twilio-webhook
     ```

## 📝 Important Code Notes
- The current `/api/twilio-webhook` returns basic XML (`TwiML`) which Twilio understands.
- **Database**: The app has been migrated from a local file-based DB to **Supabase**.
  - **Status**: Migration logic is implemented in `src/lib/storage.ts`.
  - **Setup**: Follow the instructions in `MIGRATION.md` to set up your Supabase tables and RLS before going live.
