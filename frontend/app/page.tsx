import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold text-center">
        AI Community Growth Platform
      </h1>

      <Link
        href="/onboarding"
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
      >
        Start Onboarding
      </Link>
    </div>
  );
}