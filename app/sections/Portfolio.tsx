"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import portfolio from "@/data/portfolio.json";
import { cn } from "@/lib/utils";

const categories = ["All", ...new Set(portfolio.map((item) => item.category))];

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const filteredItems =
    activeFilter === "All"
      ? portfolio
      : portfolio.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="bg-sand py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.06em] text-ink-60">
            ✎ Selected Work
          </p>
          <h2 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            Manuscripts worth reading
          </h2>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] transition-colors",
                activeFilter === category
                  ? "bg-moss text-paper"
                  : "bg-paper text-ink-60 hover:bg-paper/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.06,
              },
            },
          }}
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Link
                href={`/portfolio/${item.id}`}
                className="group relative block overflow-hidden bg-paper shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="absolute right-0 top-0 h-10 w-10 bg-sand">
                  <div
                    className="absolute right-0 top-0 h-0 w-0 border-b-[40px] border-l-[40px] border-b-transparent border-l-ink/10"
                    aria-hidden="true"
                  />
                </div>

                <div className="p-6 pt-10 sm:p-8 sm:pt-12">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-pen">
                      {item.category}
                    </span>
                    <span className="text-ink/30">·</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-60">
                      {item.client}
                    </span>
                  </div>

                  <h3 className="relative mb-3 inline-block font-serif text-xl font-semibold text-ink sm:text-2xl">
                    {item.title}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-pen"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      style={{ originX: 0 }}
                    />
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed text-ink-60">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-ink/10 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-60">
                      {item.wordCount.toLocaleString()} words
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-60">
                      {item.readTime} read
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
