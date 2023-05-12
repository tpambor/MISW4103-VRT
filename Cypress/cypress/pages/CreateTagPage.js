import PageBase from "./PageBase";

class CreateTagPage extends PageBase {
  NAME = "CreateTag";

  fillName(value) {
    cy.get('input[name="name"]').type(value);
    this.screenshot('fillName');

    return this;
  }

  fillColor(value) {
    cy.get('input[name="accent-color"][type="text"]').type(value);
    cy.get('label[for="accent-color"]').click();
    this.screenshot('fillColor');

    return this;
  }

  fillDescription(value) {
    cy.get('textarea[name="description"]').type(value);
    this.screenshot('fillDescription');

    return this;
  }

  save() {
    let button = cy.contains('button', 'Save');
    button.click();

    let result = "";

    return button.invoke('text')
      .should(($text) => {
        result = $text;
        expect($text.trim()).to.be.oneOf(['Retry', 'Saved'])
      })
      .then(() => this.screenshot('save'))
      .then(() => result.trim() === 'Saved')
  }

  getErrorMessage() {
    return cy.get('.error p.response');
  }
}

export default CreateTagPage;
