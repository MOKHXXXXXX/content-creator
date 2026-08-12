import testimonials from "@/data/testimonials.json";

export function Testimonials() {
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
          <div className="lg:col-span-7">
            <blockquote className="font-serif text-2xl leading-[1.3] text-ink sm:text-3xl lg:text-4xl">
              "Good writing doesn't just fill space. It clarifies thinking,
              earns trust, and moves the reader to act."
            </blockquote>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.06em] text-ink-60">
              — Working philosophy
            </p>
          </div>

          <div className="space-y-4 lg:col-span-5">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative border-l-2 border-pen bg-sand p-5"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
