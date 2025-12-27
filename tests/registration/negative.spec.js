// tests/registration/negative.spec.js
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");

test.describe("Негативные сценарии регистрации (ID 360–363, 365–368)", () => {
  const invalidLogins = ["u1", "user_00000000001", "user@001"];
  for (const login of invalidLogins) {
    test(`Невалидный логин: "${login}"`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.register(login, "password1");
      await expect(page).toHaveURL("/login");
    });
  }

  // ID 363
  test("Короткий пароль (7 символов) — ID 363", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.register("user_001", "passwo1");
    await expect(
      page.getByText("Пароль должен содержать не менее 8 символов, включая минимум одну букву и одну цифру")
    ).toBeVisible();
  });

  // ID 365
  test("Пароль без цифры — ID 365", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.register("user_001", "password");
    await expect(
      page.getByText("Пароль должен содержать не менее 8 символов, включая минимум одну букву и одну цифру")
    ).toBeVisible();
  });

  // ID 366
  test("Пароль без буквы — ID 366", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.register("user_001", "123456789");
    await expect(
      page.getByText("Пароль должен содержать не менее 8 символов, включая минимум одну букву и одну цифру")
    ).toBeVisible();
  });

  // ID 367
  test("Пустой пароль — ID 367", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.registerUsername.fill("user_001");
    await loginPage.registerPassword.fill("");
    await loginPage.registerButton.click();
    const isInvalid = await loginPage.registerPassword.evaluate(el => el.validity.valueMissing);
    expect(isInvalid).toBeTruthy();
  });

  // ID 368
  test("Пароль длиной 256 символов — ID 368", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.register("user_001", "a".repeat(256) + "1");
    await expect(page).toHaveURL("/login");
  });
});