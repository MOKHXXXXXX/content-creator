import { test, expect } from "@playwright/test";

test.describe("404 page", () => {
  test("shows custom 404 for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByText("This page doesn't exist.")
    ).toBeVisible();
  });

  test("404 page has a link back to home", async ({ page }) => {
    await page.goto("/nonexistent", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: /return/i }).click();
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/privacy", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: /privacy/i })
    ).toBeVisible();
  });
});