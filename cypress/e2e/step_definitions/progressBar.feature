Feature: Progress Bar Management

  Scenario: Control the progress bar and validate its state
    Given I am on the DemoQA website
    When I navigate to Widgets
    And I select Progress Bar
    And I start the progress bar
    Then I stop it before it reaches 25%
    And the progress should be 25% or less
    When I resume the progress bar
    Then I wait until it reaches 100%
    And I reset the progress bar
