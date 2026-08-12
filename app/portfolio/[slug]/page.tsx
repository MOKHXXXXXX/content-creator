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
    return { title: "Not Found" };
  }

  return {
    title: `${item.title} — ${site.name}`,
    description: item.excerpt,
    openGraph: {
      title: `${item.title} — ${site.name}`,
      description: item.excerpt,
      images: [
        {
          url: `${site.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
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
    <main className="flex-1 bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: item.title,
            description: item.excerpt,
            about: item.category,
            author: { "@type": "Person", name: site.name },
            url: `${site.url}/portfolio/${item.id}`,
          }),
        }}
      />
      <section className="border-b border-border bg-surface pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#portfolio"
            className="mb-6 inline-flex items-center font-mono text-xs uppercase tracking-[0.12em] text-text-muted hover:text-text"
          >
            ← Back to work
          </Link>

          <span className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
            {item.category}
          </span>

          <h1 className="mb-6 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-text sm:text-4xl md:text-5xl">
            {item.title}
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-text/70">
            {item.excerpt}
          </p>

          <div className="flex flex-wrap gap-4 border-y border-border py-4 font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
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
            <h2 className="mb-4 font-display text-2xl font-semibold text-text">
              The brief
            </h2>
            <p className="leading-[1.7] text-text/60">{item.content}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {item.pdf && (
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-accent bg-accent px-8 py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-bg transition-colors hover:bg-accent/90"
              >
                Download PDF
              </a>
            )}
          </div>
        </div>
      </section>

      {relatedSamples.length > 0 && (
        <section className="border-t border-border bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-display text-2xl font-semibold text-text">
              Related samples
            </h2>
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {relatedSamples.map((sample) => (
                <Link
                  key={sample.id}
                  href={`/portfolio/${sample.id}`}
                  className="group block bg-bg p-6 transition-colors hover:bg-surface-alt"
                >
                  <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                    {sample.category}
                  </span>
                  <h3 className="mb-2 font-display text-xl font-semibold text-text group-hover:text-accent transition-colors">
                    {sample.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">
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
