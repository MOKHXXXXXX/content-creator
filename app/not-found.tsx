import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-bg px-4 py-32 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-accent">
        404
      </p>
      <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mb-8 text-lg text-text-muted">
        It may have been moved, deleted, or never written.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 border border-accent bg-accent px-8 py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-bg transition-colors hover:bg-accent/90"
      >
        Return to homepage
      </Link>
    </main>
  );
}
