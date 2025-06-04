import { type Page } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { NavigationSelector } from '../selectors/NavigationSelector';
import { click, type, isVisible, waitForLoad, navigate } from '../../common/actionHelpers';

export class NavigationPage extends BasePage {
    private selectors: NavigationSelector;

    constructor(page: Page) {
        super(page);
        this.selectors = new NavigationSelector(page);
    }

    async clickHome() {
        await this.selectors.homeMenu.click();
    }

    async clickTasks() {
        await this.selectors.tasksMenu.click();
    }

    async clickProjects() {
        await this.selectors.projectsMenu.click();
    }

    async clickLogout() {
        await this.selectors.logoutButton.click();
    }
}