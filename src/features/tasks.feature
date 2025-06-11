@task
Feature: Task Management

  Background:
    Given user is logged in
    And user has access to the task management system

  Scenario: Create a new task with full details
    When user creates a new task with the following details:
      | Title                    | Start Date  | End Date    | Estimated Hour | Project Name          | Summary                                                        | Description                          |
      | Write test script        | 05-06-2025  | 06-06-2025  | 8              | Project Testing       | Draft the final detailed report for the project submission now.| This is a detailed project report    |
    Then task should be saved successfully and dispalyed message

  # Scenario: Edit task
  #   When changes Title of task to "Complete write test script" and changes Estimated hour to "10"
  #   Then the task should be updated successfully and displayed message

  Scenario: Delete task
    When the user deletes the task "Write test script"
    Then the task should be deleted successfully and displayed message