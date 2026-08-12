import { test, expect } from "@playwright/test";

test.describe("SEO and static assets", () => {
  test("sitemap.xml returns content", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("youssef-writer.vercel.app");
    expect(body).toContain("portfolio");
  });

  test("robots.txt returns content", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("sitemap.xml");
    expect(body).toContain("Disallow: /api/");
  });

  test("opengraph-image.png returns 200", async ({ request }) => {
    const response = await request.get("/opengraph-image.png");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("favicon returns 200", async ({ request }) => {
    const response = await request.get("/icon.svg");
    expect(response.status()).toBe(200);
  });

  test("apple touch icon returns 200", async ({ request }) => {
    const response = await request.get("/apple-icon.png");
    expect(response.status()).toBe(200);
  });

  test("page has proper meta description", async ({ page }) => {
    await page.goto("/");
    const desc = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(desc).toContain("content writer");
  });
});