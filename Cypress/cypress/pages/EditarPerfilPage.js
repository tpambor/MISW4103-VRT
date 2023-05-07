class EditarPerfilPage {

  getSlugDetail() {
   // cy.get('div.apps-grid-cell a', { timeout: 10000 }).eq(1).invoke('attr', 'href').then(hrefValue => {
      // Hacer lo que necesites con el valor del atributo href
      //console.log(hrefValue);
    //});
    return cy.get('div.apps-grid a.ember-view')
    .eq(1)
    .invoke('attr', 'href');


    //return this;
  }

    fillFullName(value) {
      cy.get('[placeholder="Full Name"]').clear({force: true}).should('be.visible').type(value, { parseSpecialCharSequences: false, force: true });
      return this;
      }
      fillSlug(value) {
        cy.get('input[name="user"]').type(value);
    
        return this;
      }

      fillEmail(value) {
        cy.get('input[name="email"]').clear({force: true}).type(value);
    
        return this;
      }

      fillLocation(value) {
        cy.get('#user-location').clear({force: true}).type(value.toString(), {force: true});
    
        return this;
      }

      fillWebSite(value) {
        cy.get('input[id="user-website"]').clear({force: true}).type(value.toString(), {force: true});
    
        return this;
      }

      fillFacebook(value) {
        cy.get('input[name="user[facebook]"]')
        .clear({force: true})
        .type('https://www.facebook.com/'+value.toString(), { parseSpecialCharSequences: false, force: true });
        return this;
      }

      fillTwitter(value) {
        cy.get('input[name="user[twitter]"]')
        .clear({force: true})
        .type('https://www.twitter.com/'+value.toString(), { parseSpecialCharSequences: false, force: true });
    
        return this;
      }

      fillBio(value) {
        cy.get('#user-bio').clear({force: true}).type(value, {force: true});
    
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

    getSlug() {
      return cy.get('input[name="user"]');
    }

    getSlugs() {
      return cy.get('.gh-tag-list-slug span');
    }
}

export default EditarPerfilPage;