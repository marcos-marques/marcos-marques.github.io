import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const sections = ["hero", "experience", "skills", "projects", "contact"] as const;

test.describe("home page", () => {
  test("todas as 5 seções existem e estão visíveis", async ({ page }) => {
    await page.goto("/");
    for (const id of sections) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test("acessibilidade: sem violações axe", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
