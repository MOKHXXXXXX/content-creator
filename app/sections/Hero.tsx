import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { EditReveal } from "@/components/ui/EditReveal";

export function Hero() {
  return (
    <section className="relative flex flex-1 flex-col justify-center bg-paper px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:px-8 lg:pb-40 lg:pt-36">
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.06em] text-ink-60">
          ✎ {site.title}
        </p>

        <h1 className="mb-8 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          <EditReveal
            prefix="I write"
            firstPhrase="nice words"
            finalPhrase="copy that converts"
            suffix="for growing brands."
          />
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-ink-60 sm:text-xl">
          I help startups and marketing teams turn ideas into clear, persuasive
          content — from blog posts and SEO pages to landing-page copy and
          social captions.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-moss px-8 py-3 font-mono text-sm font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ink"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex items-center justify-center border border-ink px-8 py-3 font-mono text-sm font-medium uppercase tracking-[0.06em] text-ink transition-colors hover:bg-sand"
          >
            Browse work
          </Link>
        </div>
      </div>
    </section>
  );
}
