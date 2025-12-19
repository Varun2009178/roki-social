
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingNav } from "@/components/ui/floating-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Róki - Group Accountability",
  description: "Accountability works better with friends. Miss one day, everyone feels it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased bg-black text-white`}
      >
        <FloatingNav />
        {children}
        <footer className="py-8 border-t border-zinc-900 mt-20">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-1 items-center md:items-start">
                    <p className="text-[10px] text-zinc-600 lowercase text-center md:text-left max-w-md">
                        message and data rates may apply. message frequency varies. reply STOP to opt out, HELP for help. carriers are not liable for delayed or undelivered messages.
                    </p>
                </div>
                <div className="flex gap-4">
                    <a href="/privacy" className="text-[10px] text-zinc-600 hover:text-zinc-400 lowercase underline underline-offset-4">privacy</a>
                    <a href="/terms" className="text-[10px] text-zinc-600 hover:text-zinc-400 lowercase underline underline-offset-4">terms</a>
                </div>
            </div>
        </footer>
      </body>
    </html>
  );
}
