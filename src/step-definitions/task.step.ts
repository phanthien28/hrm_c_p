import { Given, When, Then } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import { TaskPage } from "../pages/page-objects/TaskPage";
import { BasePage } from "../pages/page-objects/base/BasePage";

let taskPage: TaskPage;
let basePage: BasePage;
Given('user is logged in', async function () {
    taskPage = new TaskPage(this.page);
    await this.page.waitForURL('**/erp/desk', { timeout: 15000 });
    await expect(this.page).toHaveURL(/.*\/erp\/desk/);
});

Given('user has access to the task management system', async function () {
    basePage = new BasePage(this.page);
    await basePage.selectSideMenuOfTheLeft('Tasks');
    await this.page.waitForURL('**/my-tasks-list', { timeout: 15000 });
    await expect(this.page).toHaveURL(/.*\/erp\/my-tasks-list/);
});

//create task
When('user creates a new task with the following details:', async function (dataTable) {
    const taskData = dataTable.hashes()[0]; 
    await taskPage.createNewTask(taskData);
});

Then('task should be saved successfully and dispalyed message', async function () {
    await taskPage.verifyToastMessage('Task added.');
});

//edit task
// When('changes Title of task to {string} and changes Estimated hour to {string}', async function (title: string, hours: string) {
//     await taskPage.editTask(title, hours);
// });

// Then('the task should be updated successfully and displayed message', async function () {
//     await taskPage.verifyToastMessage('Task updated.');
// });


//delete task
When('the user deletes the task "Write test script"', async function () {
    await taskPage.deleteTask();
});

Then('the task should be deleted successfully and displayed message', async function () {
    await taskPage.verifyToastMessage('Task deleted.');
});
