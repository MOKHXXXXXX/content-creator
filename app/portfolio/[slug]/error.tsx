"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function PortfolioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Portfolio page error:", error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-bg px-4 py-32 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-accent">
        Error
      </p>
      <h2 className="mb-4 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
        Couldn&apos;t load this sample.
      </h2>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="border border-accent bg-accent px-6 py-2 font-mono text-xs uppercase tracking-[0.06em] text-bg transition-colors hover:bg-accent/90"
        >
          Try again
        </button>
        <Link
          href="/#portfolio"
          className="border border-border px-6 py-2 font-mono text-xs uppercase tracking-[0.06em] text-text-muted transition-colors hover:border-text-muted hover:text-text"
        >
          Back to work
        </Link>
      </div>
    </main>
  );
}
