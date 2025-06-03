import {Given, When, Then} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import {LoginPage} from '../pages/page-objects/LoginPage';

let loginPage: LoginPage;

Given('user navigates to the application {string}', async function(url: string){
    loginPage = new LoginPage(this.page)
    await loginPage.goto(url);
});

When('user enter username {string} and password {string}', async function(username: string, password: string){
    await loginPage.login(username, password)
});

When('user enter username {string}', async function(username: string) {
    await loginPage.enterUsername(username);
});

When ('user click login button', async function(){
    await loginPage.clickLoginButton();
});

Then('user redirects dashboard', async function(){
    const successMessage = await loginPage.getSuccessMessage();
    await expect(successMessage).toBeVisible();
    await this.page.waitForURL('**/erp/desk', { timeout: 15000 });
    await expect(this.page).toHaveURL(/.*\/erp\/desk/);
});

Then('system display error message', async function() {
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
});

Then('display alert', async function() {
    const alertMessage = await loginPage.getErrorMessage();
    await expect(alertMessage).toBeVisible();
});

Then('display input password', async function() {
    const passwordInput = await loginPage.getErrorMessage();
    await expect(passwordInput).toBeVisible();
});

Then('display alert1', async function() {
    const alertMessage = await loginPage.getErrorMessage();
    await expect(alertMessage).toBeVisible();
});