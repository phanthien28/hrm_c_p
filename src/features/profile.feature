@profile
Feature: Account Settings
  Background:
    Given user is login home page
    And user has access to the account settings page

    Scenario: Update profile information
        When user changes the First Name and City and user clicks the Save button
        | First Name | City        |
        | Paul       | London      |
        Then the profile information should be updated successfully