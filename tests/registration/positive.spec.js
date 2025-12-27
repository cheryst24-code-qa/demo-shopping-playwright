// tests/registration/positive.spec.js
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");

test.describe("Позитивные сценарии регистрации (ID 281, 358, 359, 364, 369)", () => {
  const cases = [
    { login: "user_001", pwd: "password1" },
    { login: "us1", pwd: "password0001" },
    { login: "user_0000000001", pwd: "password0001" },
    { login: "user_001", pwd: "passwor1" },
    { login: "user_001", pwd: "a".repeat(255) + "1" }
  ];

  for (const { login, pwd } of cases) {
    test(`Успешная регистрация: ${login} / ${pwd.substring(0, 8)}...`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.register(login, pwd);
      await expect(page).toHaveURL("/login");
    });
  }
});