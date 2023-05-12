import { faker } from '@faker-js/faker'
import Navigation from "../pages/Navigation"
import PageFactory from '../pages/PageFactory';

describe('Editar Perfil tests', () => {
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

  it('Edit Profile with full name', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)
    
    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the full name
        .fillFullName(faker.name.fullName())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })

  it('Edit Profile with Facebook Url', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the Facebook url
        .fillFacebook('https://www.facebook.com/' + faker.name.fullName())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })  
  })

  it('Edit Profile with Location', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill location with city
        .fillLocation(faker.address.city())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })

  it('Edit Profile with Website', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in website
        .fillWebsite(faker.internet.url())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })
  
  it('Edit Profile with Twitter Url', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the twitter
        .fillTwitter('https://www.twitter.com/' + faker.name.firstName())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })

  it('Edit Profile with a short biography', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the biography
        .fillBio(faker.lorem.lines(1))
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })

  it('Edit Profile with a very long biography', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the biography
        .fillBio(faker.lorem.lines(15))
        // And I save
        .save()
        // Then it is not saved
        .should('be.false')
    })
  })

  it('Save a Profile without making changes', () => {
    const nav = new Navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })
})
 