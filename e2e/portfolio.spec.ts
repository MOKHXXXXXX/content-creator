import { test, expect } from "@playwright/test";

test.describe("Portfolio", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("displays portfolio cards", async ({ page }) => {
    await page.locator("#portfolio").scrollIntoViewIfNeeded();
    await expect(
      page.getByText("How We Cut Activation Time")
    ).toBeVisible();
    await expect(
      page.getByText("Converting Landing Page Copy")
    ).toBeVisible();
  });

  test("navigates to the detail page on card click", async ({ page }) => {
    await page.locator("#portfolio").scrollIntoViewIfNeeded();
    await page
      .locator('a[href="/portfolio/activation-reduction-blog"]')
      .first()
      .click();
    await expect(page).toHaveURL(/\/portfolio\/activation-reduction-blog/);
    await expect(
      page.getByRole("heading", { name: /How We Cut Activation Time/i })
    ).toBeVisible();
  });

  test("portfolio detail page has back link", async ({ page }) => {
    await page.goto("/portfolio/activation-reduction-blog", {
      waitUntil: "domcontentloaded",
    });
    await page.getByRole("link", { name: /back to work/i }).click();
    await expect(page).toHaveURL(/#portfolio/);
  });

  test("portfolio detail page loads correctly", async ({ page }) => {
    await page.goto("/portfolio/activation-reduction-blog", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("heading", { name: /How We Cut Activation Time/i })
    ).toBeVisible();
    await expect(page.getByText(/three B2B SaaS companies/i)).toBeVisible();
  });
});
