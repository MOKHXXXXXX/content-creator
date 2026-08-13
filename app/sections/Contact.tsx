"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import social from "@/data/social.json";
import { Icon } from "@/components/icon";
import ContactFormLoader from "@/components/ContactFormLoader";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Contact() {
  return (
    <motion.section
      id="contact"
      className="border-b border-border bg-surface py-20 sm:py-24 lg:py-32"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
              Contact
            </p>
            <h2 className="mb-6 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-text sm:text-4xl">
              Let&apos;s work together.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-text/60">
              Tell me about your project. I reply within one to two business
              days.
            </p>

            <div className="space-y-4">
              <div>
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                  Email
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent underline underline-offset-4 hover:text-accent/80"
                >
                  {site.email}
                </a>
              </div>

              <div>
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                  Connect
                </span>
                <div className="flex gap-4">
                  {social.map((item) => (
                    <a
                      key={item.platform}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted transition-colors hover:text-text"
                      aria-label={item.platform}
                    >
                      <Icon name={item.icon} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactFormLoader />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
