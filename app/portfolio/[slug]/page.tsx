import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import portfolio from "@/data/portfolio.json";
import { site } from "@/data/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getPortfolioItem(slug: string) {
  return portfolio.find((item) => item.id === slug);
}

export async function generateStaticParams() {
  return portfolio.map((item) => ({
    slug: item.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItem(slug);

  if (!item) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${item.title} — ${site.name}`,
    description: item.excerpt,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);

  if (!item) {
    notFound();
  }

  const relatedSamples = portfolio
    .filter((p) => p.id !== item.id && p.category === item.category)
    .slice(0, 2);

  return (
    <main className="flex-1 bg-paper">
      <section className="bg-sand pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#portfolio"
            className="mb-6 inline-flex items-center font-mono text-xs uppercase tracking-[0.06em] text-ink-60 hover:text-ink"
          >
            ← Back to work
          </Link>

          <span className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.06em] text-pen">
            {item.category}
          </span>

          <h1 className="mb-6 font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl">
            {item.title}
          </h1>

          <p className="mb-8 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
            {item.excerpt}
          </p>

          <div className="flex flex-wrap gap-4 border-y border-ink/10 py-4 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-60">
            {item.client && <span>Client: {item.client}</span>}
            {item.industry && <span>Industry: {item.industry}</span>}
            <span>{item.wordCount.toLocaleString()} words</span>
            <span>{item.readTime} read</span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-ink">
              The brief
            </h2>
            <p className="leading-[1.7] text-ink-60">{item.content}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-moss px-8 py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ink"
              >
                View live project
              </a>
            )}
            {item.pdf && (
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-ink px-8 py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink transition-colors hover:bg-sand"
              >
                Download PDF
              </a>
            )}
          </div>
        </div>
      </section>

      {relatedSamples.length > 0 && (
        <section className="border-t border-ink/10 bg-sand py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-serif text-2xl font-semibold text-ink">
              Related samples
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedSamples.map((sample) => (
                <Link
                  key={sample.id}
                  href={`/portfolio/${sample.id}`}
                  className="group block bg-paper p-6 transition-shadow hover:shadow-md"
                >
                  <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-[0.06em] text-pen">
                    {sample.category}
                  </span>
                  <h3 className="relative mb-2 inline-block font-serif text-xl font-semibold text-ink">
                    {sample.title}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-pen transition-all group-hover:w-full" />
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-60">
                    {sample.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
