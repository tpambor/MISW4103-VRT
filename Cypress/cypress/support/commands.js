import { faker } from '@faker-js/faker'
import CreateSiteStepOne from "../pages/CreateSitePage";
import SignInPage from "../pages/SignInPage";
import Navigation from "../pages/Navigation";

Cypress.Commands.add('authenticate', () => {
  // Go to the administration interface
  cy.visit('/ghost/')

  // If we aren't already logged in we will be redirected to
  //   - the sign in page, if a site already has been created
  //   - the site creation wizard, if a site hasn't yet been created
  cy.hash().should('be.oneOf', [SignInPage.hash, CreateSiteStepOne.hash])
  cy.hash().then((hash) => {
    if(hash === CreateSiteStepOne.hash) {
      const createSite = new CreateSiteStepOne();

      createSite
        .nextStep()
        .fillBlogTitle(faker.company.name())
        .fillName(faker.name.fullName())
        .fillEmail(Cypress.env('username'))
        .fillPassword(Cypress.env('password'))
        .nextStep()
        .skip()
    } else if(hash === SignInPage.hash) {
      const signIn = new SignInPage();

      signIn
        .fillUsername(Cypress.env('username'))
        .fillPassword(Cypress.env('password'))
        .submit()
    }
  })

  // Make sure that we have successfully logged in
  const nav = new Navigation()
  cy.get('.gh-nav-menu-details-sitetitle').should('exist');
})
