
import { FloatingNav } from "@/components/ui/floating-navbar";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black font-sans">
      <FloatingNav />
      <main className="flex-1 flex flex-col items-center justify-center pt-32">
        <h1 className="text-4xl font-bold lowercase">Login</h1>
        <p className="text-zinc-500 mt-4 lowercase">Coming soon...</p>
      </main>
    </div>
  );
}
