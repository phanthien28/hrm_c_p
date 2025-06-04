import { LoginPage } from '../pages/page-objects/LoginPage';
import * as dotenv from 'dotenv';
import { BrowserContext } from '@playwright/test';
import path from 'path';

// Load environment variables once
dotenv.config({ 
    path: path.resolve(__dirname, '../../env/.env.local'),
    override: true // Force override any existing env vars
});

// Validate environment variables
const requiredVars = ['URL', 'USERNAME', 'PASSWORD'];
requiredVars.forEach(varName => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

export class Authentication {
    private loginPage: LoginPage;

    constructor(private page: any, private context: BrowserContext) {
        this.loginPage = new LoginPage(page);
    }

    async login(username: string, password: string) {
        await this.loginPage.goto(process.env.URL!);
        await this.loginPage.enterUsername(username);
        await this.loginPage.enterPassword(password);
        await this.loginPage.clickLoginButton();
        // Update URL pattern to match your app
        await this.page.waitForURL('**/erp/desk**', { waitUntil: 'domcontentloaded', timeout: 40000 });
        await this.page.waitForLoadState('networkidle', { timeout: 40000 }); // Wait for network to be idle
        await this.page.waitForLoadState('domcontentloaded', { timeout: 40000 }); // Wait for DOM content
        await this.page.waitForLoadState('load', { timeout: 40000 }); // Wait for full page load
    }
}