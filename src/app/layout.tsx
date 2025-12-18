
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
        <footer className="fixed bottom-2 right-4 z-50 flex gap-4 pointer-events-none mix-blend-difference">
            <a href="/privacy" className="text-[10px] text-zinc-600 hover:text-zinc-400 pointer-events-auto lowercase">privacy</a>
            <a href="/terms" className="text-[10px] text-zinc-600 hover:text-zinc-400 pointer-events-auto lowercase">terms</a>
        </footer>
      </body>
    </html>
  );
}
