import PageBase from "./PageBase";

export class CreateSiteStepOneV3 extends PageBase {
  NAME = "CreateSite";

  get hash() {
    return '#/setup/one';
  }

  nextStep() {
    cy.contains('a', 'Create your account').click();

    this.screenshot('nextStep');

    return new CreateSiteStepTwoV3();
  }
}

export class CreateSiteStepOneV4 extends PageBase {
  NAME = "CreateSite";

  get hash() {
    return '#/setup';
  }

  nextStep() {
    super.screenshot('nextStep');

    return new CreateSiteStepTwoV4();
  }

  screenshot(func) {
    super.screenshot(func + '_dummy');
  }
}

class CreateSiteStepTwoV3 extends PageBase {
  NAME = "CreateSite";

  fillBlogTitle(value) {
    cy.get('input[name="blog-title"]').type(value);

    this.screenshot('fillBlogTitle');

    return this;
  }

  fillName(value) {
    cy.get('input[name="name"]').type(value);

    this.screenshot('fillName');

    return this;
  }

  fillEmail(value) {
    cy.get('input[name="email"]').type(value);

    this.screenshot('fillEmail');

    return this;
  }

  fillPassword(value) {
    cy.get('input[name="password"]').type(value);

    this.screenshot('fillPassword');

    return this;
  }

  nextStep() {
    cy.get('button[type="submit"]').click();

    cy.wait(10000);
    this.screenshot('nextStep');

    return new CreateSiteStepThreeV3();
  }
}

class CreateSiteStepTwoV4 extends CreateSiteStepTwoV3 {
  nextStep() {
    cy.get('button[type="submit"]').click();

    cy.wait(10000);
    cy.get('.gh-alert-close').click();
    this.screenshot('nextStep');

    return new CreateSiteStepThreeV4();
  }
}


class CreateSiteStepThreeV3 extends PageBase {
  NAME = "CreateSite";

  skip() {
    cy.contains('button', "I'll do this later, take me to my site!").click();

    cy.get('.throbber').click();
    cy.get('a').contains('Skip these tips').click();

    cy.wait(2000);

    cy.get('.gh-alert-close').click();

    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('n.includes is not a function');
  
      return false;
    });

    cy.get('nav span.gh-user-email').click();
    cy.get('button').contains("What's new?").click();
    cy.get('.gh-wn-close').should('have.length', 1).click();

    cy.wait(1000);
    this.screenshot('success');
  }
}

class CreateSiteStepThreeV4 extends PageBase {
  NAME = "CreateSite";

  skip() {
    cy.get('a').contains('Explore Ghost admin').click()
    cy.wait(10000);

    cy.get('nav .gh-user-avatar').click();
    cy.get('a').contains("What's new?").click();
    cy.wait(2000);
    cy.get('a').contains("Dashboard").click();
    cy.wait(2000);
    cy.get('.gh-nav-menu-details-sitetitle').click();

    this.screenshot('success');
  }
}
