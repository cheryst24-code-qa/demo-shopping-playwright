// tests/auth/ui-checks.spec.js
const { test, expect } = require("@playwright/test");

test("Наличие полей на странице входа — ID 381", async ({ page }) => {
  await page.goto("/login");
  await expect(page.locator("#login-username")).toBeVisible();
  await expect(page.locator("#login-password")).toBeVisible();
  await expect(page.locator("#login-form button[type='submit']")).toBeVisible();
});

test("Выход из системы — ID 382", async ({ page }) => {
  await page.goto("/login");
  await page.locator("#login-username").fill("user_001");
  await page.locator("#login-password").fill("password1");
  await page.locator("#login-form button[type='submit']").click();
  await page.getByText("Выйти").click();
  await expect(page.locator("#login-button")).toBeVisible();
});