import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-paper px-4 py-32 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.06em] text-pen">
        ✎ 404
      </p>
      <h1 className="mb-4 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        This page doesn't exist.
      </h1>
      <p className="mb-8 text-lg text-ink-60">
        It may have been moved, deleted, or never written.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-moss px-8 py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ink"
      >
        Return to homepage
      </Link>
    </main>
  );
}
