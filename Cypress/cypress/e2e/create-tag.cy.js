import { faker } from '@faker-js/faker'
import Navigation from "../pages/Navigation"
import Modal from '../pages/Modal'

describe('Create tag tests', () => {
  it('Create a tag with a name', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
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

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate()

    // When I navigate to the tags page
    const tagList = nav.goToTags();

    tagList.getNumberOfTags().then((numberOfTagsBefore) => {
      // And I create a new tag
      const createTag = tagList.createNewTag();

      createTag
        // And save
        .save()
        // Then it is not saved
        .should('be.false')

      // And I see an error message indicating that I must specify a name for the tag
      createTag.getErrorMessage().should('contain', 'You must specify a name for the tag.')

      // And in the list of tags I see the same number of tags as before
      cy.visit('/ghost/')
      nav.goToTags()
        .getNumberOfTags().should('eq', numberOfTagsBefore)
    })
  })

  it('Create a tag with a name and a color', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate()

    // When I navigate to the tags page
    const createTag = nav.goToTags()
      // And I create a new tag
      .createNewTag();

    createTag
      // And I fill in the name
      .fillName(faker.lorem.words(2))
      // And I fill in the color
      .fillColor(faker.color.rgb({ prefix: '' }))
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

  it('Create a tag with a name and a invalid color', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate()

    // When I navigate to the tags page
    const tagList = nav.goToTags();

    tagList.getNumberOfTags().then((numberOfTagsBefore) => {
      // And I create a new tag
      const createTag = tagList.createNewTag();

      createTag
        // And I fill in the name
        .fillName(faker.lorem.words(2))
        // And I fill in the color with a word instead of a color
        .fillColor(faker.lorem.word(6))
        // And save
        .save()
        // Then it is not saved
        .should('be.false')

      // And I see an error message indicating that the color should be in hex format
      createTag.getErrorMessage().should('contain', 'The color should be in valid hex format')

      // And in the list of tags I see the same number of tags as before
      cy.visit('/ghost/')
      nav.goToTags()
        .getNumberOfTags().should('eq', numberOfTagsBefore)
    })
  })

  it('Create a tag with a name and a short description', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate()

    // When I navigate to the tags page
    const createTag = nav.goToTags()
      // And I create a new tag
      .createNewTag();

    createTag
      // And I fill in the name
      .fillName(faker.lorem.words(2))
      // And I fill in the description
      .fillDescription(faker.lorem.lines(1))
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

  it('Create a tag with a name and a very long description', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate()

    // When I navigate to the tags page
    const tagList = nav.goToTags();

    tagList.getNumberOfTags().then((numberOfTagsBefore) => {
      // And I create a new tag
      const createTag = tagList.createNewTag();

      createTag
        // And I fill in the name
        .fillName(faker.lorem.words(2))
        // And I fill in the description
        .fillDescription(faker.lorem.lines(15))
        // And save
        .save()
        // Then it is not saved
        .should('be.false')

      // And I see an error message indicating that the description cannot be longer than 500 characters
      createTag.getErrorMessage().should('contain', 'Description cannot be longer than 500 characters.')

      // And in the list of tags I see the same number of tags as before
      cy.visit('/ghost/')
      nav.goToTags()
        .getNumberOfTags().should('eq', numberOfTagsBefore)
    })
  })

  it('Discard a new tag', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate()

    // When I navigate to the tags page
    const tagList = nav.goToTags();

    tagList.getNumberOfTags().then((numberOfTagsBefore) => {
      // And I create a new tag
      const createTag = tagList.createNewTag();

      createTag
        // And I fill in the name
        .fillName(faker.lorem.words(2))

      // And I navigate to the page list
      nav.goToPages()

      // Then I see a modal where I can confirm that I don't want to save my changes
      const modal = new Modal;
      modal.getMessage().contains("It looks like you didn't save the changes you made.")
      modal.leave()

      // And in the list of tags I see the same number of tags as before
      nav.goToTags()
        .getNumberOfTags().should('eq', numberOfTagsBefore)
    })
  })
})
