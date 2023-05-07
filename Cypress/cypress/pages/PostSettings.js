class PostSettings {
  fillSlug(value) {
    cy.get('input[name="post-setting-slug"]').clear({force: true}).type(value);

    return this;
  }

  close() {
    cy.get('.close.settings-menu-header-action').click();
  }

  selectTag(value) {
    cy.get('#tag-input').click();
    cy.get('li.ember-power-select-option').contains(value).click();

    return this;
  }
}
    
export default PostSettings;
