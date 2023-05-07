Feature: Edit profile

  @user1 @web
  Scenario: Start Session in ghost, go to section staff, edit bio, facebook url, twitter url, save.
    Given I navigate to page "<BASE_URL>"
    And I wait for 2 seconds
    And I sign in with "<EMAIL>" and "<PASSWORD>"
    And I wait for 2 seconds
    When I navigate to page "<STAFF_PAGE>"
    And I wait for 2 seconds

    And I click in user to modify
    And I wait for 2 seconds
    And I fill fullname with text "Pedro Ocampo"
    And I wait for 2 seconds
    And I fill location with  "Colombia"
    And I wait for 2 seconds
    And I fill bio with "My bio is ....."
    And I wait for 2 seconds
    And I save changes
    And I wait for 2 seconds
    And I click in Staff
    And I wait for 2 seconds
    Then I see the staff fullname  "usertest"
