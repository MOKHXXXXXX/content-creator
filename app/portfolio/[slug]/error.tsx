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
    <main className="flex flex-1 flex-col items-center justify-center bg-paper px-4 py-32 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.06em] text-pen">
        ✎ Error
      </p>
      <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
        Couldn't load this sample.
      </h2>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="bg-moss px-6 py-2 font-mono text-xs uppercase tracking-[0.06em] text-paper hover:bg-ink"
        >
          Try again
        </button>
        <Link
          href="/#portfolio"
          className="border border-ink px-6 py-2 font-mono text-xs uppercase tracking-[0.06em] text-ink hover:bg-sand"
        >
          Back to work
        </Link>
      </div>
    </main>
  );
}
