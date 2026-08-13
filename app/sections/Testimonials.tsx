"use client";

import { motion } from "framer-motion";
import testimonials from "@/data/testimonials.json";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      className="border-b border-border py-20 sm:py-24 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
            Testimonials
          </p>
          <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-text sm:text-4xl">
            What founders say
          </h2>
        </div>

        <motion.div
          className="grid gap-8 lg:grid-cols-3"
          variants={container}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              className="group border border-border bg-surface p-6 transition-colors hover:border-text-muted/40 sm:p-8"
            >
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent/60">
                Testimonial
              </div>
              <p className="mb-6 text-sm leading-relaxed text-text/80">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <div className="font-display font-semibold text-text">
                  {testimonial.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
