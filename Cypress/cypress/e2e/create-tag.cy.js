import { faker } from '@faker-js/faker'
import PageFactory from '../pages/PageFactory';
import PageBase from '../pages/PageBase';

describe('Create tag tests', () => {
  let pageFactory;

  before(() => {
    cy.request('/').then((response) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(response.body, 'text/html')
      const version = doc.querySelector('meta[name="generator"]').content
      pageFactory = new PageFactory(version)
      return version
    }).should('contain', 'Ghost')
  })

  beforeEach(() => {
    PageBase.resetStepCounter();
  })

  it('ESC07 - Create a tag with a name', () => {
    faker.seed(1007);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the tags page
    const createTag = nav.goToTags()
      // And I create a new tag
      .createNewTag();

    const tagName = faker.lorem.words(2);

    createTag
      // And I fill in the name
      .fillName(tagName)
      // And I save
      .save()
      // Then it is saved
      .should('be.true')

    // And I see the tag in the list of tags
    nav.goToTags()
      .getTagNames().contains(tagName)
  })

  it('ESC08 - Create a tag without a name', () => {
    faker.seed(1008);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

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

  it('ESC09 - Create a tag with a name and a color', () => {
    faker.seed(1009);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the tags page
    const createTag = nav.goToTags()
      // And I create a new tag
      .createNewTag();

    const tagName = faker.lorem.words(2);

    createTag
      // And I fill in the name
      .fillName(tagName)
      // And I fill in the color
      .fillColor(faker.color.rgb({ prefix: '' }))
      // And I save
      .save()
      // Then it is saved
      .should('be.true')

    // And I see the tag in the list of tags
    nav.goToTags()
      .getTagNames().contains(tagName)
  })

  it('ESC10 - Create a tag with a name and a invalid color', () => {
    faker.seed(1010);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

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
      createTag.getErrorMessage().should('contain', 'should be in valid hex format')

      // And in the list of tags I see the same number of tags as before
      cy.visit('/ghost/')
      nav.goToTags()
        .getNumberOfTags().should('eq', numberOfTagsBefore)
    })
  })

  it('ESC11 - Create a tag with a name and a short description', () => {
    faker.seed(1011);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the tags page
    const createTag = nav.goToTags()
      // And I create a new tag
      .createNewTag();

    const tagName = faker.lorem.words(2);

    createTag
      // And I fill in the name
      .fillName(tagName)
      // And I fill in the description
      .fillDescription(faker.lorem.lines(1))
      // And I save
      .save()
      // Then it is saved
      .should('be.true')

    // And I see the tag in the list of tags
    nav.goToTags()
      .getTagNames().contains(tagName)
  })

  it('ESC12 - Create a tag with a name and a very long description', () => {
    faker.seed(1012);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

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

  it('ESC13 - Discard a new tag', () => {
    faker.seed(1013);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

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
      const modal = pageFactory.modal();
      modal.getMessage().contains("It looks like you didn't save the changes you made.")
      modal.leave()

      // And in the list of tags I see the same number of tags as before
      nav.goToTags()
        .getNumberOfTags().should('eq', numberOfTagsBefore)
    })
  })
})
