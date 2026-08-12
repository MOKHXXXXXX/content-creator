import { site } from "@/data/site";
import social from "@/data/social.json";
import { Icon } from "@/components/icon";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="font-display font-semibold text-text">
              {site.name}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
              {site.title}
            </p>
          </div>

          <div className="flex gap-6">
            {social.map((item) => (
              <a
                key={item.platform}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-text"
                aria-label={item.platform}
              >
                <Icon name={item.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
