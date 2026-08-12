"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import testimonials from "@/data/testimonials.json";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <section id="testimonials" className="bg-paper py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.06em] text-ink-60">
            ✎ Marginalia
          </p>
          <h2 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            Notes from the margins
          </h2>
        </div>

        <div className="relative grid gap-8 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: shouldReduceMotion === true ? 1 : 0 }}
            animate={
              isReady
                ? { opacity: 1 }
                : { opacity: shouldReduceMotion === true ? 1 : 0 }
            }
            transition={{ duration: 0.5 }}
          >
            <blockquote className="font-serif text-2xl leading-[1.3] text-ink sm:text-3xl lg:text-4xl">
              "Good writing doesn't just fill space. It clarifies thinking,
              earns trust, and moves the reader to act."
            </blockquote>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.06em] text-ink-60">
              — Working philosophy
            </p>
          </motion.div>

          <div className="space-y-4 lg:col-span-5">
            <div className="hidden flex-col space-y-4 lg:flex">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="relative border-l-2 border-pen bg-sand p-5"
                  initial={{ opacity: shouldReduceMotion === true ? 1 : 0, x: shouldReduceMotion === true ? 0 : 10 }}
                  animate={
                    isReady
                      ? { opacity: 1, x: 0 }
                      : { opacity: shouldReduceMotion === true ? 1 : 0, x: shouldReduceMotion === true ? 0 : 10 }
                  }
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-[0.06em] text-pen">
                    Sample testimonial
                  </span>
                  <p className="mb-4 text-sm leading-relaxed text-ink-60">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-serif font-semibold text-ink">
                      {testimonial.name}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-60">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:hidden">
              <div className="relative border-l-2 border-pen bg-sand p-5">
                <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-[0.06em] text-pen">
                  Sample testimonial
                </span>
                <p className="mb-4 text-sm leading-relaxed text-ink-60">
                  "{testimonials[activeIndex].quote}"
                </p>
                <div>
                  <div className="font-serif font-semibold text-ink">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-60">
                    {testimonials[activeIndex].role},{" "}
                    {testimonials[activeIndex].company}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      activeIndex === 0
                        ? testimonials.length - 1
                        : activeIndex - 1
                    )
                  }
                  className="p-2 text-ink-60 hover:text-ink"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        index === activeIndex
                          ? "w-6 bg-pen"
                          : "w-1.5 bg-ink/20"
                      )}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      activeIndex === testimonials.length - 1
                        ? 0
                        : activeIndex + 1
                    )
                  }
                  className="p-2 text-ink-60 hover:text-ink"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
