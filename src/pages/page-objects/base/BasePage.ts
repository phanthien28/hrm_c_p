import { type Locator, type Page, expect } from '@playwright/test';


export class BasePage {
    public page: Page;
    public baseUrl: string;

    //pending
   // protected saveButton: string = "//span[contains(text(), 'Save')]";

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL || 'https://hrm.anhtester.com'; // Fallback URL if env not set
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

    //click Sidebar menu item
    async selectSideMenuOfTheLeft(tabName: string) {
        const menuTitle: Locator = this.page.getByRole('link', { name: tabName });
        await menuTitle.click();
    }
}