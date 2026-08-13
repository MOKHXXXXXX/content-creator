"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import social from "@/data/social.json";
import { Icon } from "@/components/icon";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Footer() {
  return (
    <motion.footer
      className="border-t border-border py-10 sm:py-12"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="font-display font-semibold text-text">
              {site.name}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
              {site.title}
            </p>
          </div>

          <div className="flex gap-6">
            {social.map((item) => (
              <a
                key={item.platform}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-text"
                aria-label={item.platform}
              >
                <Icon name={item.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>

          <Link
            href="/privacy"
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted transition-colors hover:text-text"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
