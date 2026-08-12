import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("navbar links scroll to sections", async ({ page }) => {
    await page.getByRole("link", { name: "About" }).first().click({ force: true });
    await expect(page.locator("#about")).toBeInViewport();

    await page.getByRole("link", { name: "Services" }).first().click({ force: true });
    await expect(page.locator("#services")).toBeInViewport();

    await page.getByRole("link", { name: "Work" }).first().click({ force: true });
    await expect(page.locator("#portfolio")).toBeInViewport();

    await page.getByRole("link", { name: "Contact" }).first().click({ force: true });
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("logo navigates to home", async ({ page }) => {
    await page.goto("/privacy", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: "Youssef Mohey" }).click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});
