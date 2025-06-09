import { type Locator, type Page } from "@playwright/test";

export class ProfileSelector {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly countryInput: Locator;
    readonly countryDropdownItem: (countryName: string) => Locator;
    readonly saveButton: Locator;
  
    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('input[type="text"][name="first_name"]');
        this.countryInput = page.locator("//div[@class = 'col-md-8']//span[@class = 'select2-selection__rendered']");
        this.countryDropdownItem = (countryName: string) => page.locator(`//li[contains(text(), '${countryName}')]`);
        this.saveButton = page.locator("//span[contains(text(), 'Save')]");
    }


}