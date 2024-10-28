Feature: Browser Windows

  Scenario: Open a new browser window and validate the message
    Given I am on the DemoQA website
    When I choose Alerts, Frame & Windows
    And I click on Browser Windows
    Then I click and close the new window
    And I should see the message "This is a sample page"
