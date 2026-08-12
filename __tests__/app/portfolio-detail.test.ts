import {
  generateStaticParams,
  generateMetadata,
} from "@/app/portfolio/[slug]/page";

describe("portfolio detail page", () => {
  describe("generateStaticParams", () => {
    it("returns all portfolio slugs", async () => {
      const params = await generateStaticParams();
      expect(params.length).toBe(4);
      const slugs = params.map((p) => p.slug);
      expect(slugs).toContain("seo-startup-guide");
      expect(slugs).toContain("fintech-landing-page");
      expect(slugs).toContain("wellness-blog-series");
      expect(slugs).toContain("ecommerce-social-campaign");
    });
  });

  describe("generateMetadata", () => {
    it("returns metadata for a valid slug", async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: "seo-startup-guide" }),
      });
      expect(metadata.title).toContain("10 SEO Tips for Startups");
      expect(metadata.description).toContain("organic traffic");
      expect(metadata.openGraph?.images?.[0]).toBeDefined();
    });

    it("returns 'Not Found' for an unknown slug", async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: "nonexistent" }),
      });
      expect(metadata.title).toBe("Not Found");
    });
  });
});