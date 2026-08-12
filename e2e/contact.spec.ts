import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.getByLabel("Name").waitFor({ state: "visible" });
    await page.waitForLoadState("networkidle");
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/Name is too short/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/valid email/i)).toBeVisible();
    await expect(page.getByText(/Message is too short/i)).toBeVisible();
  });

  test("name validation accepts valid input", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.getByLabel("Name").fill("John Doe");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/Name is too short/i)).not.toBeVisible();
  });

  test("email and social links are visible", async ({ page }) => {
    await expect(
      page.getByText(/moktarmoha17@gmail\.com/)
    ).toBeVisible();
  });

  test("social media links have correct urls", async ({ page }) => {
    const linkedin = page.getByLabel("LinkedIn").first();
    await expect(linkedin).toHaveAttribute("href", /linkedin\.com/);
  });
});