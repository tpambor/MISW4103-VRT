import { faker } from '@faker-js/faker'
import Navigation from "../pages/Navigation"

describe('Editar Perfil tests', () => {
  
  it('Edit Profile with full name', () => {
    const nav = new Navigation()
    // Given that I am a authenticated user visiting Ghost

    const EditarPerfil = nav.goToPerfil()

    cy.authenticate()
    cy.visit('ghost/#/staff/')
    
    EditarPerfil.getSlugDetail().then((hrefValue) => {
      // Do something with hrefValue
       // When I navigate to the staff page
      cy.visit('ghost/'+hrefValue)
    })
    
    const name = faker.name.fullName();

      EditarPerfil
        // And I fill in the full name
        .fillFullName(name)
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
  })

  it('Edit Profile with Facebook Url', () => {
    const nav = new Navigation()

    const EditarPerfil = nav.goToPerfil()

    cy.authenticate()
    cy.visit('ghost/#/staff/')
    
    EditarPerfil.getSlugDetail().then((hrefValue) => {
      // Do something with hrefValue
       // When I navigate to the staff page
      cy.visit('ghost/'+hrefValue)
    })

    EditarPerfil
        // And I fill in the Facebook url
        .fillFacebook(faker.name.fullName())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')

        
  })

  it('Edit Profile with Location', () => {
    const nav = new Navigation()

    const EditarPerfil = nav.goToPerfil()

    cy.authenticate()
    cy.visit('ghost/#/staff/')
    
    EditarPerfil.getSlugDetail().then((hrefValue) => {
      // Do something with hrefValue
       // When I navigate to the staff page
      cy.visit('ghost/'+hrefValue)
    })
    
    EditarPerfil
      // And I fill location with city
      .fillLocation(faker.address.city())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
  })

  it('Edit Profile without Location', () => {
    const nav = new Navigation()

    const EditarPerfil = nav.goToPerfil()

    cy.authenticate()
    cy.visit('ghost/#/staff/')
    
    EditarPerfil.getSlugDetail().then((hrefValue) => {
      // Do something with hrefValue
       // When I navigate to the staff page
      cy.visit('ghost/'+hrefValue)
    })
    
    EditarPerfil
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
  })
  
  it('Edit Profile with Twitter Url', () => {
    const nav = new Navigation()

    const EditarPerfil = nav.goToPerfil()

    cy.authenticate()
    cy.visit('ghost/#/staff/')
    
    EditarPerfil.getSlugDetail().then((hrefValue) => {
      // Do something with hrefValue
       // When I navigate to the staff page
      cy.visit('ghost/'+hrefValue)
    })

    const user = faker.name.firstName();
    
    EditarPerfil
        // And I fill in the twitter
        .fillTwitter(user)
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
  })

  it('Edit Profile with Twitter Url', () => {
    const nav = new Navigation()

   const EditarPerfil = nav.goToPerfil()

    cy.authenticate()
    cy.visit('ghost/#/staff/')
    
    EditarPerfil.getSlugDetail().then((hrefValue) => {
      // Do something with hrefValue
       // When I navigate to the staff page
      cy.visit('ghost/'+hrefValue)
    })

    EditarPerfil
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
  })

  it('Edit Profile with Bio  with 200 characters', () => {
    const nav = new Navigation()

    const EditarPerfil = nav.goToPerfil()

    cy.authenticate()
    cy.visit('ghost/#/staff/')
    
    EditarPerfil.getSlugDetail().then((hrefValue) => {
      // Do something with hrefValue
       // When I navigate to the staff page
      cy.visit('ghost/'+hrefValue)
    })

    EditarPerfil
        // And I fill in the twitter
        .fillBio(faker.lorem.text(200))
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
  })

  it('Edit Profile with Bio  with 300 characters', () => {
    const nav = new Navigation()

    const EditarPerfil = nav.goToPerfil()

    cy.authenticate()
    cy.visit('ghost/#/staff/')
    
    EditarPerfil.getSlugDetail().then((hrefValue) => {
      // Do something with hrefValue
       // When I navigate to the staff page
      cy.visit('ghost/'+hrefValue)
    })

    EditarPerfil
        // And I fill in the Slug
        .fillBio(faker.lorem.text(300))
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
  })
})
 