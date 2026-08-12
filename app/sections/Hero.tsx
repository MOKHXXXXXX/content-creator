import Link from "next/link";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="home" className="flex flex-1 flex-col justify-center px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:px-8 lg:pb-40 lg:pt-36">
      <div className="mx-auto w-full max-w-4xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
          {site.title}
        </p>

        <h1 className="relative mb-8 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          I write <span className="text-accent">copy that converts</span> for
          growing brands.
          <span aria-hidden="true" className="brilliant-overlay">
            I write copy that converts for growing brands.
          </span>
        </h1>

        <p className="mb-10 max-w-xl text-lg leading-relaxed text-text-muted">
          Content writer for B2B SaaS startups. Blog posts, landing pages,
          email sequences, and case studies that turn product complexity into
          clear, converting copy.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center border border-accent bg-accent px-8 py-3 font-mono text-sm font-medium uppercase tracking-[0.06em] text-bg transition-colors hover:bg-accent/90"
          >
            Start a project
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex items-center justify-center border border-border px-8 py-3 font-mono text-sm uppercase tracking-[0.06em] text-text-muted transition-colors hover:border-text-muted hover:text-text"
          >
            View work
          </Link>
        </div>
      </div>
    </section>
  );
}
