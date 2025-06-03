import {BeforeAll, AfterAll, Before, After, setDefaultTimeout, BeforeStep, AfterStep} from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { LoginPage } from '../pages/page-objects/LoginPage';

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(60 * 1000);

BeforeAll(async function() {
    browser = await chromium.launch({
        headless: false, // Set to true for headless mode
        //args: [ '--start-maximized' ],
        args: ['--window-size=1920,1080','--start-maximized'],
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