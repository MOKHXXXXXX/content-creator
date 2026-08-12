import services from "@/data/services.json";

export function Services() {
  return (
    <section id="services" className="bg-paper py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.06em] text-ink-60">
            ✎ Services
          </p>
          <h2 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            What I can write for you
          </h2>
        </div>

        <div className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-sand p-6 transition-colors hover:bg-paper sm:p-8"
            >
              <span className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.06em] text-ink-60">
                {service.tag}
              </span>
              <h3 className="mb-3 font-serif text-xl font-semibold text-ink sm:text-2xl">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-60">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
