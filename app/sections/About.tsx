import { about } from "@/data/about";

export function About() {
  return (
    <section id="about" className="border-t border-border bg-surface py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
              About
            </p>
            <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-text sm:text-4xl">
              I turn product complexity into clear, confident copy.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-10 space-y-5">
              {about.intro.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-[1.7] text-text/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mb-10">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
                Focus
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {about.expertise.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-text/80"
                  >
                    <span className="h-px w-4 bg-accent/50" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
              {about.stats.map((stat) => (
                <div key={stat.label} className="bg-surface-alt p-4">
                  <div className="font-display text-2xl font-semibold text-text">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
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
