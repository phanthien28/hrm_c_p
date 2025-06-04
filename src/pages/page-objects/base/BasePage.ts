import { Page, expect } from '@playwright/test';
import dotenv from 'dotenv'

export class BasePage {
    protected page: Page;
    protected baseUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL || 'https://hrm.anhtester.com'; // Fallback URL if env not set
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