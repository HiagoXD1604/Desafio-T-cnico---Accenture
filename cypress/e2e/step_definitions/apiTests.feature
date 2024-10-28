# cypress/integration/apiTests.feature
Feature: API Testing

  Scenario: User Creation and Book Reservation
    Given I create a user
    When I generate an access token
    And I check if the user is authorized
    And I list available books
    And I reserve two books
    Then I should list the user details with reserved books
