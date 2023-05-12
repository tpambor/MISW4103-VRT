import PageBase from "./PageBase";

export class PostSettingsV3 extends PageBase {
  NAME = "PostSettings";

  fillSlug(value) {
    cy.get('input[name="post-setting-slug"]').clear({force: true}).type(value);

    this.screenshot('fillSlug');

    return this;
  }

  close() {
    cy.get('.close.settings-menu-header-action').click();

    cy.wait(1000);

    this.screenshot('close');
  }

  selectTag(value) {
    cy.get('#tag-input').click();
    cy.get('li.ember-power-select-option').should('exist');
    this.screenshot('tagMenu');

    cy.get('li.ember-power-select-option').contains(value).click();
    this.screenshot('selectTag');

    return this;
  }
}
    
export class PostSettingsV4 extends PostSettingsV3 {
  close() {
    cy.get('button.settings-menu-toggle').click();
    
    cy.wait(1000);

    this.screenshot('close');
  }
}
