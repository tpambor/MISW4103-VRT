Feature: Gestionar Posts

@user1 @web
Scenario: Create a draft post, with only the title
  Given I navigate to page "<BASE_URL>"
  And I wait for 2 seconds
  And I sign in with "<EMAIL>" and "<PASSWORD>"
  And I wait for 2 seconds
  When I navigate to page "<TAGS_PAGE>"
  And I navigate to page "<POSTS_PAGE>"
  And I wait for 2 seconds
  And I create new Post
  And I wait for 2 seconds
  And I put as title "$string_1"
  And I click on other area
  And I click on posts link
  And I wait for 2 seconds
  Then I see the post "$$string_1" in the list
