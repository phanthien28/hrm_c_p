import {BeforeAll, AfterAll, Before, After, setDefaultTimeout, BeforeStep, AfterStep} from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { LoginPage } from '../pages/page-objects/LoginPage';
import { Authentication} from './authentication';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let isFirstRun = true;

setDefaultTimeout(60 * 1000);

BeforeAll(async function() {
    browser = await chromium.launch({
        headless: true, // Set to true for headless mode
        args: [
            '--start-maximized',
            '--window-size=1920,1080',
            '--window-position=0,0'
        ]
    });
});

Before({tags: '@login'}, async function() {
    try {
        context = await browser.newContext({
            viewport: null,
        });
        page = await context.newPage();
        
        this.context = context;
        this.page = page;
        this.loginPage = new LoginPage(page);
        //this.auth = new Authentication(page, context);
    } catch (error) {
        console.error('Error in @login hook:', error);
        throw error;
    }
});

Before({tags: '@task or @profile'}, async function() {
    try {
        if (isFirstRun) {
            const username = process.env.USERNAME;
            const password = process.env.PASSWORD;
            const url = process.env.URL;

            // First run - perform login and save state
            context = await browser.newContext({
                viewport: null,
            });
            
            page = await context.newPage();
           // await page.setViewportSize({ width: 1920, height: 1080 });
            
            this.context = context;
            this.page = page;
            this.loginPage = new LoginPage(page);
            this.auth = new Authentication(page, context);

            // Login and save state
            await page.goto(url!);
            await this.auth.login(username, password);
            await page.waitForLoadState('networkidle');
            
            // Save state after successful login
            await context.storageState({ path: 'auth.json' });
            isFirstRun = false;

        } else {
            // Subsequent runs - reuse saved state
            try {
                context = await browser.newContext({
                    viewport: null,
                    storageState: 'auth.json'
                });
                
                page = await context.newPage();
                await page.goto(process.env.BASE_URL!);
                await page.waitForLoadState('networkidle');
                
                this.context = context;
                this.page = page;
                this.loginPage = new LoginPage(page);
                this.auth = new Authentication(page, context);
                
            } catch (error) {
                console.error('Failed to restore auth state:', error);
                // Fallback to fresh login if restore fails
                isFirstRun = true;
                throw error;
            }
        }
    } catch (error) {
        console.error('Error in @task hook:', error);
        throw error;
    }
});

After(async function() {
    if (this.page) {
        const client = await this.page.context().newCDPSession(this.page);
        await Promise.all([
            client.send('Network.clearBrowserCache'),
            client.send('Network.clearBrowserCookies')
        ]);
        await this.page.close();
    }
    
    if (this.context) {
        await this.context.clearCookies();
        await this.context.close();
    }
});

AfterAll(async function() {
    await browser.close();
});