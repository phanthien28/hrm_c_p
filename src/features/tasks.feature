@task
Feature: Task Management

  Background:
    Given user is logged in
    And user has access to the task management system

  Scenario: Create a new task with full details
    When user creates a new task with the following details:
      | Title                    | Start Date  | End Date    | Estimated Hour | Project Name          | Summary                                                        | Description                          |
      | Write testcase loginpage | 05-06-2025  | 06-06-2025  | 8              | Project Testing       | Draft the final detailed report for the project submission now.| This is a detailed project report    |
    Then task should be saved successfully
    And task should be displayed in the task list

#   Scenario: Edit task
#     Given a task with title "Complete project report" exists
#     When the user edits the task to change the title to "Complete project report - Final Draft"
#     Then the task should be updated successfully
#     And the updated title should appear in the task list

#   Scenario: Delete task
#     Given a task with title "Complete project report - Final Draft" exists
#     When the user deletes the task
#     Then the task should be removed from the task list