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

    async enterFirstName(firstName: string) {
        await this.validateUrl('/erp/my-profile');
        await type(this.selectors.firstNameInput, firstName);
    }

    async chooseCountry(countryName: string) {
        await click(this.selectors.countryInput);
        await isVisible(this.selectors.countryDropdownItem(countryName));
        await click(this.selectors.countryDropdownItem(countryName));
    }

    async clickSaveButton() {
        await isVisible(this.selectors.saveButton);
        await click(this.selectors.saveButton);
    }

    async updateProfile(profileData: any) {
        await this.enterFirstName(profileData['First Name']);
        await this.chooseCountry(profileData['Country']);
        await this.clickSaveButton();
        await waitForLoad(this.selectors.page);
    }

}