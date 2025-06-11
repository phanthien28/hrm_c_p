import { LoginPage } from '../pages/page-objects/LoginPage';
import { Page, BrowserContext } from '@playwright/test';
import { BasePage } from '../pages/page-objects/base/BasePage';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables once
const environment = process.env.ENV || 'local';

dotenv.config({ 
    path: path.resolve(__dirname, `../../env/.env.${environment}`), 
    override: true 
});

// Validate environment variables
const requiredVars = ['URL', 'USERNAME', 'PASSWORD'];
requiredVars.forEach(varName => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

export const credentials = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
};


export class Authentication extends BasePage {
    private loginPage: LoginPage;

    constructor(page: Page, private context: BrowserContext) {
        super(page);
        this.loginPage = new LoginPage(page);
    }

    async login(username: string, password: string) {
        await this.loginPage.goto(process.env.URL!);
        await this.loginPage.enterUsername(username);
        await this.loginPage.enterPassword(password);
        await this.loginPage.clickLoginButton();
        
        await this.page.waitForLoadState('load', { timeout: 40000 });
        await this.page.waitForLoadState('networkidle', { timeout: 40000 });

        
        await this.validateUrl('/erp/desk');
    }
}