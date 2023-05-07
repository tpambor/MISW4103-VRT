class EditProfilePage {
  fillFullName(value) {
    cy.get('input#user-name').clear({force: true}).type(value, {scrollBehavior: 'center'});
    
    return this;
  }

  fillSlug(value) {
    cy.get('input[name="user"]').clear({force: true}).type(value, {scrollBehavior: 'center'});

    return this;
  }

  getSlug() {
    return cy.get('input[name="user"]');
  }

  fillEmail(value) {
    cy.get('input[name="email"]').clear({force: true}).type(value, {scrollBehavior: 'center'});

    return this;
  }

  fillLocation(value) {
    cy.get('input#user-location').clear({force: true}).type(value, {scrollBehavior: 'center'});

    return this;
  }

  fillWebsite(value) {
    cy.get('input#user-website').clear({force: true}).type(value, {scrollBehavior: 'center'});

    return this;
  }

  fillFacebook(value) {
    cy.get('input[name="user[facebook]"]').clear({force: true}).type(value, {scrollBehavior: 'center'});

    return this;
  }

  fillTwitter(value) {
    cy.get('input[name="user[twitter]"]').clear({force: true}).type(value, {scrollBehavior: 'center'});

    return this;
  }

  fillBio(value) {
    cy.get('textarea#user-bio').clear({force: true}).type(value, {scrollBehavior: 'center'});

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
}

export default EditProfilePage;
