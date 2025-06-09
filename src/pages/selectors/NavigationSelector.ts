import { type Locator, type Page } from '@playwright/test';

export class NavigationSelector {
    readonly page: Page;

    constructor(page: Page,tabName : string) {
        this.page = page;
    }

    //pending
    async selectSideMenuOfTheLeft(tabName: string) {
        const menuTitle: Locator = this.page.getByRole('link', { name: tabName });
        await menuTitle.click();
    }
}