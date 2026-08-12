import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/app/sections/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.title}`,
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.author }],
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${site.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: site.description,
    images: [`${site.url}/opengraph-image`],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: site.name,
                jobTitle: site.title,
                description: site.description,
                url: site.url,
                email: site.email,
                sameAs: [
                  "https://linkedin.com/in/youssefmohey",
                  "https://twitter.com/youssefmohey",
                  "https://medium.com/@youssefmohey",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: site.name,
                url: site.url,
                description: site.description,
              },
            ]),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
