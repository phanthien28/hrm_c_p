@login
Feature: Login system

    Background: 
        Given user navigates to the application "https://hrm.anhtester.com/erp/login"

    Scenario Outline: Login with valid credentials
        When user enter username "<username>" and password "<password>"
        And user click login button
        Then <expected_result>
    
    Examples: Login with different credentials
        | username          | password         | expected_result                |
        | admin_example     | 123456           | user redirects dashboard       |
        | admin_example     | wrong_password   | system display error message   |
        | admin_example     |                  | display alert                  |

    Scenario Outline: Login with only username
        When user enter username "<username>"
        And user click login button
        Then <expected_result>

    Examples:
        | email                     | expected_result           |
        | admin_example             | display input password    |
        |                           | display alert1            |