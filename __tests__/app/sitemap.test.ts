import sitemapFn from "@/app/sitemap";

describe("sitemap", () => {
  it("includes the home page", () => {
    const entries = sitemapFn();
    const home = entries.find((e) => e.url === "https://youssefmohey.vercel.app");
    expect(home).toBeDefined();
    expect(home?.priority).toBe(1);
    expect(home?.changeFrequency).toBe("monthly");
  });

  it("includes the privacy page", () => {
    const entries = sitemapFn();
    const privacy = entries.find(
      (e) => e.url === "https://youssefmohey.vercel.app/privacy"
    );
    expect(privacy).toBeDefined();
    expect(privacy?.priority).toBe(0.3);
  });

  it("includes all portfolio detail pages", () => {
    const entries = sitemapFn();
    const portfolioEntries = entries.filter((e) =>
      e.url.startsWith("https://youssefmohey.vercel.app/portfolio/")
    );
    expect(portfolioEntries.length).toBe(4);
    portfolioEntries.forEach((e) => {
      expect(e.priority).toBe(0.8);
      expect(e.changeFrequency).toBe("monthly");
    });
  });
});
