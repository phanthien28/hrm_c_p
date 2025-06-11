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
const requiredVars = ['HRM_URL', 'HRM_USERNAME', 'HRM_PASSWORD'];

requiredVars.forEach(varName => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

export const credentials = {
    username: process.env.HRM_USERNAME,
    password: process.env.HRM_PASSWORD
};


export class Authentication extends BasePage {
    private loginPage: LoginPage;

    constructor(page: Page, private context: BrowserContext) {
        super(page);
        this.loginPage = new LoginPage(page);
    }

    async login(username: string, password: string) {
        await this.loginPage.goto(process.env.HRM_URL!);
        await this.loginPage.enterUsername(username);
        await this.loginPage.enterPassword(password);
        await this.loginPage.clickLoginButton();
        
        await this.page.waitForLoadState('load', { timeout: 40000 });
        await this.page.waitForLoadState('networkidle', { timeout: 40000 });

        
        await this.validateUrl('/erp/desk');
    }
}