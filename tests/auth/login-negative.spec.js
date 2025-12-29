// tests/auth/login-negative.spec.js
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");

test.describe("Негативные сценарии входа (ID 371–376)", () => {
   test("Пустой логин, валидный пароль — ID 371", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginUsername.fill("");
    await loginPage.loginPassword.fill("password1");
    await loginPage.loginButton.click();

    // Проверяем, что поле логина недействительно (HTML5 required)
    const isInvalid = await loginPage.loginUsername.evaluate(
      (el) => el.validity.valueMissing
    );
    expect(isInvalid).toBeTruthy();

    // Убеждаемся, что перехода не произошло
    await expect(page).toHaveURL("/login");
  });

  test("Валидный логин, пустой пароль — ID 373", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginUsername.fill("user_001");
    await loginPage.loginPassword.fill("");
    await loginPage.loginButton.click();

    const isInvalid = await loginPage.loginPassword.evaluate(
      (el) => el.validity.valueMissing
    );
    expect(isInvalid).toBeTruthy();

    await expect(page).toHaveURL("/login");
  });

  test("Пустые логин и пароль — ID 372", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginUsername.fill("");
    await loginPage.loginPassword.fill("");
    await loginPage.loginButton.click();
    const loginInvalid = await loginPage.loginUsername.evaluate(
      (el) => el.validity.valueMissing
    );
    const pwdInvalid = await loginPage.loginPassword.evaluate(
      (el) => el.validity.valueMissing
    );
    expect(loginInvalid).toBeTruthy();
    expect(pwdInvalid).toBeTruthy();

      // Убеждаемся, что перехода не произошло
    await expect(page).toHaveURL("/login");
  });

  const invalidCreds = [
    { login: "user#0001", pwd: "password1" },
    { login: "user#0001", pwd: "password" },
    { login: "user_0001", pwd: "password" },
  ];
  for (const { login, pwd } of invalidCreds) {
    test(`Неверные данные: ${login} / ${pwd}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(login, pwd);
      await expect(page).toHaveURL("/login");
    });
  }
});
