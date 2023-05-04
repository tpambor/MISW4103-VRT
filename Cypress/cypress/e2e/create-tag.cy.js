import { faker } from '@faker-js/faker'
import Navigation from "../pages/Navigation"

describe('Create tag tests', () => {
  it('Create a valid tag', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user
    cy.authenticate()

    // When I navigate to the tags page
    const createTag = nav.goToTags()
      // And I create a new tag
      .createNewTag();

    createTag
      // And I fill in the name
      .fillName(faker.lorem.words(2))
      // And I save
      .save()
      // Then it is saved
      .should('be.true')

   createTag.getSlug().invoke('val').then((slug) => {
      // And I see the tag in the list of tags
      nav.goToTags()
        .getSlugs().contains(slug)
    })
  })

  it('Create a tag without a name', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user
    cy.authenticate()

    // When I navigate to the tags page
    const createTag = nav.goToTags()
      // And I create a new tag
      .createNewTag();

    createTag
      // And save
      .save()
      // Then it is not saved
      .should('be.false')

    // And I see an error message indicating that I must specify a name for the tag
    createTag.getErrorMessage().should('contain', 'You must specify a name for the tag.')
  })
})
