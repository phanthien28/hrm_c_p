import { type Locator, type Page, expect } from '@playwright/test';


export class BasePage {
    public page: Page;
    public baseUrl: string;
    readonly toastMessage: Locator;
    readonly submitButton: (buttonText: string)  => Locator;
    //pending
   // protected saveButton: string = "//span[contains(text(), 'Save')]";

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL || 'https://hrm.anhtester.com'; // Fallback URL if env not set
        this.toastMessage = this.page.locator('//div[contains(@class,"toast-message")]');
        this.submitButton = (buttonText: string) => page.locator(`//button[@type='submit' and @class = 'btn btn-primary ladda-button']//span[contains(text(),'${buttonText}')]`);
    }

    
    // Navigate to specific URL
    async goto(path: string) {
        await this.page.goto(`${this.baseUrl}${path}`);
    }


    // Validate current URL contains expected path
    async validateUrl(expectedPath: string) {
        // Remove ** from expectedPath if present
        const cleanPath = expectedPath.replace(/\*\*/g, '');
        await this.page.waitForURL(`**${cleanPath}`, { timeout: 10000 });
        const currentUrl = this.page.url();
        expect(currentUrl).toContain(cleanPath);
}

     //Wait for page load state
    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }

    //click Sidebar navigate menu item
    async selectSideMenuOfTheLeft(tabName: string) {
        /*pending locator*/
        const menuTitle: Locator = this.page.getByRole('link', { name: tabName });
        await menuTitle.click();
    }

    // message verification
    async verifyToastMessage(expectedMessage: string) {
        await expect(this.toastMessage).toBeVisible();
        await expect(this.toastMessage).toContainText(expectedMessage);
        // Optional: wait for toast to disappear if needed
        await this.toastMessage.waitFor({ state: 'hidden', timeout: 5000 });
    }

    //submit button
    async clickSubmitButton(buttonText: string) {
        await expect(this.submitButton(buttonText)).toBeVisible();
        await expect(this.submitButton(buttonText)).toBeEnabled();
        await this.submitButton(buttonText).click();
        await this.waitForPageLoad();
    }
}