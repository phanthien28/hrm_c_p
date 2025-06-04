import {type Locator, type Page} from '@playwright/test';

export class LoginSelector {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly inputUsernameMessage: Locator;
    readonly inputPasswordMessage: Locator;
    readonly invalidAccountMessage: Locator;
    readonly succesMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("#iusername");
        this.passwordInput = page.locator("#ipassword");
        this.loginButton = page.locator("button[type='submit']");
        this.errorMessage = page.locator("div[class='toast toast-error']");
        this.inputUsernameMessage = page.locator("//div[@class='toast-message' and contains(text(), 'The username field is required.')]");
        this.inputPasswordMessage = page.locator("//div[@class='toast-message' and contains(text(), 'The password field is required.')]");
        this.invalidAccountMessage = page.locator("//div[@class='toast-message' and contains(text(), 'Invalid Login Credentials')]");
        this.succesMessage = page.locator("div[class='swal2-header']");
    }
}