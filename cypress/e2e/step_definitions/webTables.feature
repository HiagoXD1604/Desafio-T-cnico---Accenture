Feature: Web Tables Management

  Scenario: Create, edit, and delete a single record
    Given I am on the DemoQA website
    When I navigate to Elements
    And I select Web Tables
    And I create a new record
    Then I edit the new record
    And I delete the new record

  Scenario: Dynamically create and delete multiple records
    Given I am on the DemoQA website
    When I navigate to Elements
    And I select Web Tables
    And I create 12 new records dynamically
    Then I delete all the newly created records
