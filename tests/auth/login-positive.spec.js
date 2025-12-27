// tests/auth/login-positive.spec.js
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");

test("Успешный вход (ID 370)", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("user_001", "password1");
  await expect(page).toHaveURL("/");
});