"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TerminalRevealProps {
  prefix: string;
  firstPhrase: string;
  finalPhrase: string;
  suffix: string;
  className?: string;
}

export function TerminalReveal({
  prefix,
  firstPhrase,
  finalPhrase,
  suffix,
  className,
}: TerminalRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "deleting" | "typing" | "done">(
    "idle"
  );
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(finalPhrase);
      setPhase("done");
      setShowCursor(false);
      return;
    }

    const typeFirst = () => {
      const interval = setInterval(() => {
        indexRef.current++;
        setDisplayedText(firstPhrase.slice(0, indexRef.current));
        if (indexRef.current >= firstPhrase.length) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase("deleting");
            startDeleting();
          }, 800);
        }
      }, 60);
    };

    const startDeleting = () => {
      const interval = setInterval(() => {
        indexRef.current--;
        setDisplayedText(firstPhrase.slice(0, indexRef.current));
        if (indexRef.current <= 0) {
          clearInterval(interval);
          setDisplayedText("");
          indexRef.current = 0;
          setTimeout(() => {
            setPhase("typing");
            typeFinal();
          }, 200);
        }
      }, 30);
    };

    const typeFinal = () => {
      const interval = setInterval(() => {
        indexRef.current++;
        setDisplayedText(finalPhrase.slice(0, indexRef.current));
        if (indexRef.current >= finalPhrase.length) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase("done");
            setShowCursor(false);
          }, 600);
        }
      }, 50);
    };

    const start = setTimeout(typeFirst, 400);

    return () => clearTimeout(start);
  }, [shouldReduceMotion, firstPhrase, finalPhrase]);

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {prefix && <span className="text-text">{prefix} </span>}

      <span className="relative inline-flex items-center">
        <span className="text-accent">
          {displayedText || (phase === "idle" ? firstPhrase : "")}
        </span>

        {showCursor && (
          <motion.span
            className="ml-[2px] inline-block h-[1em] w-[2px] bg-accent align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          />
        )}
      </span>

      {suffix && <span className="text-text"> {suffix}</span>}
    </span>
  );
}
