import { Given, When, Then } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import { TaskPage } from "../pages/page-objects/TaskPage";
import { NavigationPage } from "../pages/page-objects/NavigationPage";

let taskPage: TaskPage;
let navigationPage: NavigationPage;

Given('user is logged in', async function () {
    taskPage = new TaskPage(this.page);
    await this.page.waitForURL('**/erp/desk', { timeout: 15000 });
    await expect(this.page).toHaveURL(/.*\/erp\/desk/);
});

Given('user has access to the task management system', async function () {
    navigationPage = new NavigationPage(this.page);
    await navigationPage.clickTasks();
    await this.page.waitForURL('**/my-tasks-list', { timeout: 15000 });
    await expect(this.page).toHaveURL(/.*\/erp\/my-tasks-list/);
});

When('user creates a new task with the following details:', async function (dataTable) {
    const taskData = dataTable.hashes()[0]; 
    await taskPage.createNewTask(taskData);
});

Then('task should be saved successfully', async function () {
    const addednewMessage = await taskPage.getaddednewMessage();
    await expect(addednewMessage).toBeVisible();
});

Then('task should be displayed in the task list', async function () {
    const taskInList = await taskPage.getTaskInList();
    await expect(taskInList).toBeVisible();
});
