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
        await click(this.selectors.project);
        await isVisible(this.selectors.projectDropdownItem(projectName));
        await click(this.selectors.projectDropdownItem(projectName));
    }

    async enterSummary(summary: string) {
        await type(this.selectors.summary, summary);
    }

    async enterDescription(description: string) {
        await type(this.selectors.description, description);
    }

    async clickSaveButton() {
        await isVisible(this.selectors.saveButton);
        await click(this.selectors.saveButton);
        await waitForLoad(this.page);
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
        await this.clickSaveButton();
        await waitForLoad(this.page);
    }

    async getaddednewMessage() {
        await isVisible(this.selectors.addednewMessage);
        return this.selectors.addednewMessage;
    }

    async getTaskInList() {
        await isVisible(this.selectors.taskInList);
        return this.selectors.taskInList;
    }

}