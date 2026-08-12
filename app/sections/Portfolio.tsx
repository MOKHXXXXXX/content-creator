"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import portfolio from "@/data/portfolio.json";
import { cn } from "@/lib/utils";

const categories = ["All", ...new Set(portfolio.map((item) => item.category))];

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const shouldReduceMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const filteredItems =
    activeFilter === "All"
      ? portfolio
      : portfolio.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="border-b border-border bg-surface py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
            Selected Work
          </p>
          <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-text sm:text-4xl">
            Writing samples
          </h2>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] border transition-colors",
                activeFilter === category
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-text-muted hover:border-text-muted hover:text-text"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.id}`}
              className="group block overflow-hidden bg-bg p-6 transition-colors hover:bg-surface-alt sm:p-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                  {item.category}
                </span>
                <span className="text-text-muted/40">·</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                  {item.client}
                </span>
              </div>

              <h3 className="mb-3 font-display text-xl font-semibold text-text transition-colors">
                {item.title}
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-text/60">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                  {item.wordCount.toLocaleString()} words
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                  {item.readTime} read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
