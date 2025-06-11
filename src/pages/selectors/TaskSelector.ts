import {type Locator, type Page} from '@playwright/test';

export class TaskSelector {
    readonly page: Page;
    readonly addNewTaskButton: Locator;
    readonly tilte: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly buttonOkDate: Locator;
    readonly estimatedHours: Locator;
    readonly projectInput: Locator;
    readonly projectDropdownItem: (projectName: string) => Locator; 
    readonly summary: Locator;
    readonly description: Locator;
    //readonly saveButton: Locator;
   // readonly addednewMessage: Locator;
    readonly taskInList: Locator;
    readonly viewDetailButton: Locator;
    readonly editButton: Locator;
   // readonly updateButton: Locator;
    readonly deleteButton: Locator;
   // readonly confirmDeleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addNewTaskButton = page.locator("//a[@class = 'collapsed btn waves-effect waves-light btn-primary btn-sm m-0']");
        this.tilte = page.locator('input[type="text"][name="task_name"]');
        this.startDate = page.locator('input[type="text"][name="start_date"]');
        this.buttonOkDate = page.locator("//div[@class= 'dtp animated fadeIn']//button[@class = 'dtp-btn-ok btn btn-flat btn-primary btn-sm']");
        this.endDate = page.locator('input[type="text"][name="end_date"]');
        this.estimatedHours = page.locator('input[type="text"][name="task_hour"]');

        this.projectInput = page.locator("//span[@class = 'select2-selection__rendered']"); 
        this.projectDropdownItem = (projectName: string) => page.locator(`//li[contains(text(), '${projectName}')]`);

        this.summary = page.locator('textarea[name="summary"]');

        this.description = page.locator("//iframe[@class='k-content']"); //pending

        //this.saveButton = page.locator("//span[contains(text(), 'Save')]");
        //this.addednewMessage = page.locator("//div[@class='toast-message' and contains(text(), 'Task added.')]");
        this.taskInList = page.locator("//td[contains(text(), 'Write testcase loginpage')]");

        this.viewDetailButton = page.locator("//td[@class= 'sorting_1' and contains(text(), 'Write test script')]//button[@class = 'btn icon-btn btn-sm btn-light-primary waves-effect waves-light']");
        this.editButton = page.locator("//div//button[@class = 'btn btn-shadow btn-secondary text-uppercase' and contains(text(), 'Edit')]");
        //this.updateButton = page.locator("//span[contains(text(), 'Update Task')]");
        this.deleteButton = page.locator("//td[@class= 'sorting_1' and contains(text(), 'Write test script')]//button[@class = 'btn icon-btn btn-sm btn-light-danger waves-effect waves-light delete']");
        //this.confirmDeleteButton = page.locator("//span[contains(text(), 'Confirm')]");
    }
}