
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
- **Database**: Currently, the app uses a temporary file-based DB (`/data/groups.json`).
  - **Warning**: On Vercel (serverless), **files are not persistent**. Your groups will vanish after a few minutes.
  - **Fix**: Before going to production, you MUST connect a real database like **Supabase** or **Postgres**.

### Quick Supabase Switch (For Later)
1. Set up a Supabase project.
2. Replace `src/lib/storage.ts` logic to read/write from Supabase instead of `fs` (file system).
