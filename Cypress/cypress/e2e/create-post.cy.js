import { faker } from '@faker-js/faker'
import Navigation from "../pages/Navigation"

describe('Create post tests', () => {
  it('Create a draft post with only the title', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate()

    // When I navigate to the posts page
    const createPost = nav.goToPosts()
      // And I create a new post
      .createNewPost();

    const postTitle = faker.lorem.words(2)

    createPost
      // And I fill in the title
      .fillTitle(postTitle)
      // And click on the editor but don't enter text
      .fillContent("")
      // And I go back to posts
      .goToPosts()
      // Then I see the post in the list of posts
      .getPostNames().contains(postTitle)
  })
})
