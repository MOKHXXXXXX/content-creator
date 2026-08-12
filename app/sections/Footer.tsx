import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-paper py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-60">
          © {currentYear} {site.name}. All rights reserved.
        </p>
        <Link
          href="/privacy"
          className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-60 transition-colors hover:text-ink"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
