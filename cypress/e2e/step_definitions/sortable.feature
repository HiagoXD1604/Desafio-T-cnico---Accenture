Feature: Sort elements on the DemoQA site

  Scenario: Arrange elements in ascending order in the Sortable menu
    Given I access the site's home page
    When I navigate to the Sortable menu
    And I arrange the elements in the specified order
    Then The elements should be in the specified order