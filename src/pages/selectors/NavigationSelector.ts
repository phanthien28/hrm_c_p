import { type Locator, type Page } from '@playwright/test';

export class NavigationSelector {
    readonly page: Page;
    readonly homeMenu: Locator;
    readonly projectsMenu: Locator;
    readonly tasksMenu: Locator;
    readonly accountSettingsMenu: Locator;
    readonly billingInvoicesMenu: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeMenu = page.getByRole('link', { name: 'Home' });
        this.projectsMenu = page.getByRole('link', { name: 'Projects' });
        this.tasksMenu = page.getByRole('link', { name: 'Tasks' });
        this.accountSettingsMenu = page.getByRole('link', { name: 'Account Settings' });
        this.billingInvoicesMenu = page.getByRole('link', { name: 'Billing Invoices' });
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }
}