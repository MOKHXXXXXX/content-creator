"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import portfolio from "@/data/portfolio.json";
import { cn } from "@/lib/utils";

const categories = ["All", ...new Set(portfolio.map((item) => item.category))];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All"
      ? portfolio
      : portfolio.filter((item) => item.category === activeFilter);

  return (
    <motion.section
      id="portfolio"
      className="border-b border-border bg-surface py-20 sm:py-24 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
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

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
        >
          {filteredItems.map((item) => (
            <motion.div key={item.id} variants={itemVariant}>
              <Link
                href={`/portfolio/${item.id}`}
                className="group block overflow-hidden border border-border bg-bg p-6 transition-colors hover:bg-surface-alt sm:p-8"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
