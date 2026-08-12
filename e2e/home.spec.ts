import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("renders the hero headline", async ({ page }) => {
    await expect(page.getByText(/I write/i).first()).toBeVisible();
  });

  test("has visible CTA buttons", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /start a project/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /view work/i })
    ).toBeVisible();
  });

  test("renders all sections", async ({ page }) => {
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#portfolio")).toBeVisible();
    await expect(page.locator("#testimonials")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("renders the site name in the navbar", async ({ page }) => {
    await expect(page.getByText("Youssef Mohey").first()).toBeVisible();
  });
});