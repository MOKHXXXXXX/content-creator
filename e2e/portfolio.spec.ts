import { test, expect } from "@playwright/test";

test.describe("Portfolio", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("displays portfolio cards", async ({ page }) => {
    await page.locator("#portfolio").scrollIntoViewIfNeeded();
    await expect(
      page.getByText("10 SEO Tips for Startups")
    ).toBeVisible();
    await expect(
      page.getByText("Fintech Landing Page Copy")
    ).toBeVisible();
  });

  test("navigates to the detail page on card click", async ({ page }) => {
    await page.locator("#portfolio").scrollIntoViewIfNeeded();
    await page
      .locator('a[href="/portfolio/seo-startup-guide"]')
      .first()
      .click();
    await expect(page).toHaveURL(/\/portfolio\/seo-startup-guide/);
    await expect(
      page.getByRole("heading", { name: /10 SEO Tips/i })
    ).toBeVisible();
  });

  test("portfolio detail page has back link", async ({ page }) => {
    await page.goto("/portfolio/seo-startup-guide", {
      waitUntil: "domcontentloaded",
    });
    await page.getByRole("link", { name: /back to work/i }).click();
    await expect(page.url()).toContain("#portfolio");
  });

  test("portfolio detail page loads correctly", async ({ page }) => {
    await page.goto("/portfolio/seo-startup-guide", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("heading", { name: /10 SEO Tips/i })
    ).toBeVisible();
    await expect(page.getByText(/organic traffic/i)).toBeVisible();
  });
});