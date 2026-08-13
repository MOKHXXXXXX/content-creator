"use client";

import { motion } from "framer-motion";
import services from "@/data/services.json";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Services() {
  return (
    <motion.section
      id="services"
      className="border-b border-border py-20 sm:py-24 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
            Services
          </p>
          <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-text sm:text-4xl">
            What I can write for you
          </h2>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={item}
              className="border border-border bg-bg p-6 transition-colors hover:bg-surface-alt sm:p-8 group"
            >
              <span className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                {service.tag}
              </span>
              <h3 className="mb-3 font-display text-xl font-semibold text-text group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
