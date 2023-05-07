import PostListPage from "./PostListPage";
import PostSettings from "./PostSettings";

class CreateEditPostPage {
  fillTitle(value) {
    cy.get('textarea.gh-editor-title').clear({force: true}).type(value);

    return this;
  }

  fillContent(value) {
    let editor = cy.get('div.koenig-editor__editor');
    editor.click();
    if (value != "")
      editor.clear({force: true}).type(value);

    return this;
  }

  goToPosts() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('a').contains('Posts').click();

    return new PostListPage();
  }

  publish() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('.gh-publishmenu-trigger').click();
    cy.get('.gh-publishmenu-radio-label').contains('Set it live now').click();
    cy.get('.gh-publishmenu-button').click();

    return this;
  }

  publishLater() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('.gh-publishmenu-trigger').click();
    cy.get('.gh-publishmenu-radio-label').contains('Schedule it for later').click();
    cy.get('.gh-publishmenu-button').click();

    return this;
  }

  openSettings() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('button[title="Settings"]').click();

    return new PostSettings();
  }
}

export default CreateEditPostPage;
