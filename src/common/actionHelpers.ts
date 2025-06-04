import { Locator, Page, expect } from '@playwright/test';

export async function click(locator: Locator): Promise<void> {
    await locator.waitFor();
    await locator.click();
}

export async function type(locator: Locator, text: string): Promise<void> {
    await locator.waitFor();
    await locator.fill(text);
}

export async function isVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
}

export async function waitForLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
}

export async function navigate(page: Page, url: string): Promise<void> {
    await page.goto(url);
    await waitForLoad(page);
}

export async function isEnabled(locator: Locator): Promise<void> {
    await locator.waitFor();
    await expect(locator).toBeEnabled();
}