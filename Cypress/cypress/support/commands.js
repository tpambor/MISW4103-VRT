import { faker } from '@faker-js/faker'

Cypress.Commands.add('authenticate', (pageFactory) => {
  // Go to the administration interface
  cy.visit('/ghost/')

  const createSite = pageFactory.createSitePage();
  const signIn = pageFactory.signInPage();

  // If we aren't already logged in we will be redirected to
  //   - the sign in page, if a site already has been created
  //   - the site creation wizard, if a site hasn't yet been created
  cy.hash().should('be.oneOf', [signIn.hash, createSite.hash])
  cy.hash().then((hash) => {
    if(hash === createSite.hash) {
      createSite
        .nextStep()
        .fillBlogTitle(faker.company.name())
        .fillName(faker.name.fullName())
        .fillEmail(Cypress.env('username'))
        .fillPassword(Cypress.env('password'))
        .nextStep()
        .skip()
    } else if(hash === signIn.hash) {
      signIn
        .fillUsername(Cypress.env('username'))
        .fillPassword(Cypress.env('password'))
        .submit()
    }
  })

  // Make sure that we have successfully logged in
  const nav = pageFactory.navigation()
  nav.getSitename().should('exist')
  cy.wait(1000)
})
