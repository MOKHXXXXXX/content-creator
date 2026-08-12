"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface EditRevealProps {
  prefix: string;
  firstPhrase: string;
  finalPhrase: string;
  suffix: string;
  className?: string;
}

export function EditReveal({
  prefix,
  firstPhrase,
  finalPhrase,
  suffix,
  className,
}: EditRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "strike" | "reveal">("idle");
  const phraseRef = useRef<HTMLSpanElement>(null);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase("reveal");
      return;
    }

    const timer1 = setTimeout(() => setPhase("strike"), 600);
    const timer2 = setTimeout(() => setPhase("reveal"), 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (phraseRef.current) {
      setLineWidth(phraseRef.current.offsetWidth);
    }
  }, [firstPhrase]);

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {prefix && <span>{prefix} </span>}

      <span className="relative inline-block">
        <motion.span
          ref={phraseRef}
          className="relative"
          animate={{
            opacity: phase === "reveal" ? 0 : 1,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          aria-hidden={phase === "reveal"}
        >
          {firstPhrase}
        </motion.span>

        <motion.svg
          className="pointer-events-none absolute left-0 top-1/2 h-3 w-full -translate-y-1/2 overflow-visible"
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase === "strike" || phase === "reveal" ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          preserveAspectRatio="none"
        >
          <motion.path
            d={`M0,6 Q${lineWidth * 0.25},2 ${lineWidth * 0.5},6 T${lineWidth},4`}
            fill="none"
            stroke="var(--pen)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: phase === "strike" || phase === "reveal" ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </motion.svg>

        <motion.span
          className="absolute left-0 top-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase === "reveal" ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          aria-label={finalPhrase}
        >
          {finalPhrase}
        </motion.span>
      </span>

      {suffix && <span> {suffix}</span>}
    </span>
  );
}
