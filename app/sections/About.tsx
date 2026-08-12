import { about } from "@/data/about";

export function About() {
  return (
    <section id="about" className="bg-sand py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.06em] text-ink-60">
              ✎ About
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
              I turn research into writing people actually read.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-10 space-y-5">
              {about.intro.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-[1.7] text-ink-60"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mb-10">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.06em] text-ink-60">
                Areas of focus
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {about.expertise.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-ink"
                  >
                    <span className="h-px w-4 bg-pen" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {about.stats.map((stat) => (
                <div key={stat.label} className="bg-paper p-4">
                  <div className="font-serif text-2xl font-semibold text-ink">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
