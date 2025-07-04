import { type Locator, type Page } from "@playwright/test";

export class ProfileSelector {
    readonly page: Page;
    readonly accountSettingsButton: Locator;
    readonly basicInfoButton: Locator;
    readonly firstNameInput: Locator;
    readonly cityInput: Locator;
    //readonly countryDropdownItem: (countryName: string) => Locator;
    //readonly saveButton: Locator;
  
    constructor(page: Page) {
        this.page = page;
        this.accountSettingsButton = page.locator("//a[@class = 'pc-head-link active arrow-none mr-0'  and @data-original-title = 'Account Settings']");
        this.basicInfoButton = page.locator("//a[@id = 'user-set-basicinfo-tab']")
        this.firstNameInput = page.locator('input[type="text"][name="first_name"]');
        this.cityInput = page.locator("input[name='city']");
        //this.countryDropdownItem = (countryName: string) => page.locator(`//li[contains(text(), '${countryName}')]`);
       // this.saveButton = page.locator("//div[@class = 'card-body']//div[@class = 'card-footer text-right']//span[@class = 'ladda-label']");
    }

}