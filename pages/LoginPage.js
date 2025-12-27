// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;

    // Регистрация
    this.registerUsername = page.locator('#register-username');
    this.registerPassword = page.locator('#register-password');
    this.registerButton = page.locator('#register-form button[type="submit"]');

    // Вход
    this.loginUsername = page.locator('#login-username');
    this.loginPassword = page.locator('#login-password');
    this.loginButton = page.locator('#login-form button[type="submit"]');

    // UI
    this.logoutButton = page.locator('#logout-button');
    this.loginHeaderButton = page.locator('#login-button');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async register(login, password) {
    await this.goto();
    await this.registerUsername.fill(login);
    await this.registerPassword.fill(password);
    await this.registerButton.click();
  }

  async login(login, password) {
    await this.goto();
    await this.loginUsername.fill(login);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { LoginPage };