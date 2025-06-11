@profile
Feature: Account Settings
  Background:
    Given user is login home page
    And user has access to the account settings page

    Scenario: Update profile information
        When user changes the First Name and Country and user clicks the Save button
        | First Name | Country        |
        | John       | United Kingdom |
        Then the profile information should be updated successfully