import { Given, When, Then } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import { ProfilePage } from "../pages/page-objects/ProfilePage";
import { BasePage } from "../pages/page-objects/base/BasePage";

let profilePage: ProfilePage;
let basePage: BasePage;

Given('user is login home page', async function () {
    profilePage = new ProfilePage(this.page);
    await this.page.waitForURL('**/erp/desk', { timeout: 15000 });
    await expect(this.page).toHaveURL(/.*\/erp\/desk/);
});

Given('user has access to the account settings page', async function () {
    basePage = new BasePage(this.page);
    await basePage.selectSideMenuOfTheLeft('Account Settings');
    await this.page.waitForURL('**/my-profile', { timeout: 15000 });
    await expect(this.page).toHaveURL(/.*\/erp\/my-profile/);
});