import { test, expect } from "@playwright/test";

test.describe("Mobile menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hamburger menu toggles on small screens", async ({ page }) => {
    const menuBtn = page.getByLabel("Toggle menu");
    await expect(menuBtn).toBeVisible();

    // Menu should be closed initially
    await expect(menuBtn).toHaveAttribute("aria-expanded", "false");

    // Open menu
    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute("aria-expanded", "true");

    // Close menu
    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile menu links work", async ({ page }) => {
    await page.getByLabel("Toggle menu").click();
    await page.getByText("About").last().click();

    // After clicking, menu should close and section be in viewport
    await expect(page.locator("#about")).toBeInViewport();
  });
});