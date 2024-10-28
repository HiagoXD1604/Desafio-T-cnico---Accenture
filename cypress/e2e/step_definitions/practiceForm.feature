Feature: Student Registration Form

  As a user
  I want to fill out the student registration form
  So that I can submit it and see a confirmation modal

  Background:
    Given I am on the Practice Form page

  Scenario: Successfully submitting the student registration form with random data
    When I fill out the form with random data
    And I submit the form
    Then I should be able to close the submission modal
