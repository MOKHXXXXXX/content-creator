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
      expect(slugs).toContain("activation-reduction-blog");
      expect(slugs).toContain("fintech-landing-copy");
      expect(slugs).toContain("beta-launch-email-sequence");
      expect(slugs).toContain("product-led-seo-guide");
    });
  });

  describe("generateMetadata", () => {
    it("returns metadata for a valid slug", async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: "activation-reduction-blog" }),
      });
      expect(metadata.title).toContain("How We Cut Activation Time");
      expect(metadata.description).toContain("activation patterns");
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