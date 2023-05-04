class CreateSiteStepOne {
  static get hash() {
    return '#/setup/one';
  }

  nextStep() {
    cy.contains('a', 'Create your account').click();

    return new CreateSiteStepTwo();
  }
}

class CreateSiteStepTwo {
  fillBlogTitle(value) {
    cy.get('input[name="blog-title"]').type(value);

    return this;
  }

  fillName(value) {
    cy.get('input[name="name"]').type(value);

    return this;
  }

  fillEmail(value) {
    cy.get('input[name="email"]').type(value);

    return this;
  }

  fillPassword(value) {
    cy.get('input[name="password"]').type(value);

    return this;
  }

  nextStep() {
    cy.get('button[type="submit"]').click()

    return new CreateSiteStepThree();
  }
}

class CreateSiteStepThree {
  skip() {
    cy.contains('button', "I'll do this later, take me to my site!").click()
  }
}

export default CreateSiteStepOne;
