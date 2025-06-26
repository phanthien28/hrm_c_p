@login
Feature: Login system

    Background: 
        Given user navigates to the application "https://hrm.anhtester.com"

    Scenario Outline: Login with valid credentials
        When user enter username "<username>" and password "<password>"
        And user click login button
        Then <expected_result>
  
    Examples: Login with different credentials
        | username             | password         | expected_result                |
        | johncarter           | 123456           | user redirects dashboard       |
        | johncarter           | wrong_password   | system display error message   |
        | johncarter           |                  | display alert                  |

    Scenario Outline: Login with only username
        When user enter username "<username>"
        And user click login button
        Then <expected_result>

    Examples:
        | username             | expected_result           |
        | johncarter           | display input password    |
        |                      | display alert1            |

    Scenario Outline: Login with invalid credentials
        When user enter username "<username>" and password "<password>"
        And user click login button
        Then <expected_result>
    Examples:
        | username             | password         | expected_result   |
        | hello                | 098765           | account invalid   |