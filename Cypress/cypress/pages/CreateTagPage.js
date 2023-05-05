class CreateTagPage {
  fillName(value) {
    cy.get('input[name="name"]').type(value);

    return this;
  }

  fillColor(value) {
    cy.get('input[name="accent-color"]').type(value);

    return this;
  }

  fillDescription(value) {
    cy.get('textarea[name="description"]').type(value);

    return this;
  }

  save() {
    let button = cy.contains('button', 'Save');
    button.click();

    return button.invoke('text')
      .should(($text) => {
        expect($text.trim()).to.be.oneOf(['Retry', 'Saved'])
      })
      .then(($text) => $text.trim() === 'Saved');
  }

  getErrorMessage() {
    return cy.get('.error p.response');
  }

  getSlug() {
    return cy.get('input[name="slug"]');
  }
}

export default CreateTagPage;
