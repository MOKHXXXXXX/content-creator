import testimonials from "@/data/testimonials.json";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-b border-border py-20 sm:py-24 lg:py-32"
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

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
