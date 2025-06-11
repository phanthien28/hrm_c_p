import { type Page } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { TaskSelector } from '../selectors/TaskSelector';
import { click, type, isVisible, waitForLoad, navigate, isEnabled } from '../../common/actionHelpers';

export class TaskPage extends BasePage {
    private selectors: TaskSelector;

    constructor(page: Page) {
        super(page);
        this.selectors = new TaskSelector(page);
    }

    async clickAddNewTask() {
        await this.validateUrl('/erp/my-tasks-list');
        await click(this.selectors.addNewTaskButton);
        await isVisible(this.selectors.tilte);
    }

    async enterTitle(title: string) {
        await type(this.selectors.tilte, title);
    }

    async chooseStartDate(date: string) {
        const startDateInput = await this.selectors.startDate;
        await startDateInput.evaluate((element, date) => {
            (element as HTMLInputElement).value = date;
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }, date);
    }

    async chooseEndDate(date: string) {
        const endDateInput = await this.selectors.endDate;
        await endDateInput.evaluate((element, date) => {
            (element as HTMLInputElement).value = date;
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }, date);
    }

    async enterEstimatedHours(hours: string) {
        await type(this.selectors.estimatedHours, hours);
    }

    async chooseProject(projectName: string) {
        await click(this.selectors.projectInput);
        await isVisible(this.selectors.projectDropdownItem(projectName));
        await click(this.selectors.projectDropdownItem(projectName));
    }

    async enterSummary(summary: string) {
        await type(this.selectors.summary, summary);
    }

    async enterDescription(description: string) {
        await type(this.selectors.description, description);
    }

    // async clickSaveButton() {
    //     await isVisible(this.selectors.saveButton);
    //     await click(this.selectors.saveButton);
    //     await waitForLoad(this.page);
    // }

    async clickViewDetailButton() {
        await isVisible(this.selectors.viewDetailButton);
        await click(this.selectors.viewDetailButton);
    }

    async clickEditButton() {
        await isVisible(this.selectors.editButton);
        await click(this.selectors.editButton);
    }

    async clickDeleteButton() {
        await isVisible(this.selectors.deleteButton);
        await click(this.selectors.deleteButton);
    }

    //funtion create new task
    async createNewTask(taskData: any) {
        await this.clickAddNewTask();
        await this.enterTitle(taskData['Title']);
        await this.chooseStartDate(taskData['Start Date']); 
        await this.chooseEndDate(taskData['End Date']); 
        await this.enterEstimatedHours(taskData['Estimated Hour']);
        await this.chooseProject(taskData['Project Name']);
        await this.enterSummary(taskData['Summary']);
        //await this.enterDescription(taskData['Description']);
        await this.clickSubmitButton('Save');
        await waitForLoad(this.page);
    }

    // async getaddednewMessage() {
    //     await isVisible(this.selectors.addednewMessage);
    //     return this.selectors.addednewMessage;
    // }

    async getTaskInList() {
        await isVisible(this.selectors.taskInList);
        return this.selectors.taskInList;
    }

    async editTask(title: string, hours: string) {
        await this.clickViewDetailButton();
        await this.clickEditButton();
        await this.enterTitle(title);
        await this.enterEstimatedHours(hours);
        await this.clickSubmitButton('Update');
        await waitForLoad(this.page);
    }

    async deleteTask() {
        await this.clickDeleteButton();
        await this.clickSubmitButton('Confirm');
        await waitForLoad(this.page);
    }
}