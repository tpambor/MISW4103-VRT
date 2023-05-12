import PageBase from "./PageBase";

class SignInPage extends PageBase {
  NAME = "SignIn";

  get hash() {
    return '#/signin';
  }

  fillUsername(value) {
    cy.get('input[name="identification"]').type(value);
    this.screenshot('fillUsername');

    return this;
  }

  fillPassword(value) {
    cy.get('input[name="password"]').type(value);
    this.screenshot('fillPassword');

    return this;
  }

  submit() {
    cy.get('button[type="submit"]').click();
    this.screenshot('submit');

    cy.get('nav li a').contains('Posts').should('exist');
    cy.wait(1000)
    this.screenshot('success');
  }
}

export default SignInPage;
