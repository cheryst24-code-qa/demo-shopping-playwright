// tests/auth/security.spec.js
const { test, expect } = require("@playwright/test");

test.describe("Безопасность (ID 378, 380)", () => {
  const routes = ["/cart", "/payment", "/history"];
  for (const route of routes) {
    test(`Доступ к ${route} без авторизации — ID 378`, async ({ page }) => {
      await page.goto(route);
      if (route === "/cart") {
        await expect(page.getByText("Общая сумма: 0 руб.")).toBeVisible();
      } else if (route === "/history") {
        await expect(
          page.getByRole("heading", { name: "История заказов", level: 1 })
        ).toBeVisible();
        await expect(page.locator("table tbody tr")).toHaveCount(0);
      }
      await expect(page.locator("#login-button")).toBeVisible();
    });
  }

  test("Переход на /login из защищённой страницы — ID 380", async ({ page }) => {
    await page.goto("/cart");
    await page.locator("#login-button").click();
    await expect(page).toHaveURL("/login");
  });
});