import { Page, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;
    protected baseUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = 'https://hrm.anhtester.com';  // URL cơ sở của ứng dụng
    }

    /**
     * Navigate to specific URL
     */
    async goto(path: string) {
        await this.page.goto(`${this.baseUrl}${path}`);
    }

    /**
     * Validate current URL contains expected path
     */
    async validateUrl(expectedPath: string) {
        await this.page.waitForURL(`**${expectedPath}`, { timeout: 10000 });
        const currentUrl = this.page.url();
        expect(currentUrl).toContain(expectedPath);
    }

    /**
     * Wait for page load state
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }
}