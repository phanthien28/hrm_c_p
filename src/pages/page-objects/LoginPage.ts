import { type Page } from '@playwright/test';
import { BasePage } from './base/BasePage';
import{LoginSelector} from '../selectors/LoginSelector';
import { click, type, isVisible, waitForLoad, navigate } from '../../common/actionHelpers';

export class LoginPage extends BasePage {
    private selectors: LoginSelector;

    constructor(page: Page) {
        super(page);
        this.selectors = new LoginSelector(page);
    }

    async goto(url: string) {
        await navigate(this.selectors.page, url);
        await this.validateUrl('erp/login');
        await isVisible(this.selectors.usernameInput);
        await isVisible(this.selectors.passwordInput);
    }
    
    async enterUsername(username: string) {
        await type(this.selectors.usernameInput, username);
    }

    async enterPassword(password: string) {
        await type(this.selectors.passwordInput, password);
    }

    async clickLoginButton() {
        await click(this.selectors.loginButton);
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
    }

    async getSuccessMessage() {
        await isVisible(this.selectors.succesMessage);
        return this.selectors.succesMessage;
    }

    async getErrorMessage() {
        await isVisible(this.selectors.errorMessage);
        return this.selectors.errorMessage;
    }
}