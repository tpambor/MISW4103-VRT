import PageBase from "./PageBase";

class EditProfilePage extends PageBase {
  NAME = "EditProfile";

  fillFullName(value) {
    cy.get('input#user-name').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillFullName');
    
    return this;
  }

  fillSlug(value) {
    cy.get('input[name="user"]').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillSlug');

    return this;
  }

  getSlug() {
    return cy.get('input[name="user"]');
  }

  fillEmail(value) {
    cy.get('input[name="email"]').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillEmail');

    return this;
  }

  fillLocation(value) {
    cy.get('input#user-location').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillLocation');

    return this;
  }

  fillWebsite(value) {
    cy.get('input#user-website').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillFullName');

    return this;
  }

  fillFacebook(value) {
    cy.get('input[name="user[facebook]"]').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillFacebook');

    return this;
  }

  fillTwitter(value) {
    cy.get('input[name="user[twitter]"]').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillTwitter');

    return this;
  }

  fillBio(value) {
    cy.get('textarea#user-bio').clear({force: true}).type(value, {scrollBehavior: 'center'});
    this.screenshot('fillBio');

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
}

export default EditProfilePage;
