import { type Page } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { ProfileSelector } from '../selectors/ProfileSelector';
import { click, type, isVisible, waitForLoad, navigate, isEnabled } from '../../common/actionHelpers';

export class ProfilePage extends BasePage {
    private selectors: ProfileSelector;

    constructor(page: Page) {
        super(page);
        this.selectors = new ProfileSelector(page);
    }

    async clickAccountSettingsButton() {
        await isVisible(this.selectors.accountSettingsButton);
        await click(this.selectors.accountSettingsButton);
        await this.validateUrl('/erp/my-profile');
    }

    async clickBasicInfoButton() {
        await isVisible(this.selectors.basicInfoButton);
        await click(this.selectors.basicInfoButton);
    }

    async enterFirstName(firstName: string) {
        await this.validateUrl('/erp/my-profile');
        await type(this.selectors.firstNameInput, firstName);
    }

    async enterCity(city: string) {
        await this.validateUrl('/erp/my-profile');
        await type(this.selectors.cityInput, city);
    }

    // async chooseCountry(countryName: string) {
    //     await click(this.selectors.countryInput);
    //     await isVisible(this.selectors.countryDropdownItem(countryName));
    //     await click(this.selectors.countryDropdownItem(countryName));
    // }

    // async clickSaveButton() {
    //     await isVisible(this.selectors.saveButton);
    //     await click(this.selectors.saveButton);
    // }

    async updateProfile(profileData: any) {
        await this.clickBasicInfoButton();
        await this.enterFirstName(profileData['First Name']);
        await this.enterCity(profileData['City']);
        await this.clickSubmitButton('Update Profile');
        await waitForLoad(this.selectors.page);
    }

}