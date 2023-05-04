class SignInPage {
  static get hash() {
    return '#/signin';
  }

  fillUsername(value) {
    cy.get('input[name="identification"]').type(value);

    return this;
  }

  fillPassword(value) {
    cy.get('input[name="password"]').type(value);

    return this;
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }
}

export default SignInPage;
