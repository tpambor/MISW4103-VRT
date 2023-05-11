import PageBase from "./PageBase";
import PostListPage from "./PostListPage";
import PostSettings from "./PostSettings";

class CreateEditPostPage extends PageBase {
  NAME = "CreateEditPost";

  fillTitle(value) {
    cy.get('textarea.gh-editor-title').clear({force: true}).type(value);
    this.screenshot('fillTitle');

    return this;
  }

  fillContent(value) {
    let editor = cy.get('div.koenig-editor__editor');
    editor.click();
    if (value != "") {
      editor.clear({force: true}).type(value);
      this.screenshot('fillContent');
    }

    return this;
  }

  goToPosts() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('a').contains('Posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');
    this.screenshot('goToPosts');

    return new PostListPage();
  }

  publish() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('.gh-publishmenu-trigger').click();
    cy.get('.gh-publishmenu-radio-label').should('exist');
    this.screenshot('publishMenu');
    cy.get('.gh-publishmenu-radio-label').contains('Set it live now').click();
    this.screenshot('publishSelectLive')

    cy.get('.gh-publishmenu-button').click();

    cy.get('.gh-notification-title').contains('Published');
    this.screenshot('publish');
    
    cy.get('.gh-notification-title', { timeout: 10000 }).should('not.exist');
    return this;
  }

  publishLater() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('.gh-publishmenu-trigger').click();
    this.screenshot('publishMenu');
    cy.get('.gh-publishmenu-radio-label').contains('Schedule it for later').click();
    this.screenshot('publishSelectLater')

    cy.get('.gh-publishmenu-button').click();
    cy.get('.gh-notification-title').contains('Scheduled');
    this.screenshot('schedule');

    cy.get('.gh-notification-title', { timeout: 10000 }).should('not.exist');
    return this;
  }

  openSettings() {
    cy.get('span.midgrey-l2').click();
    cy.wait(3000);
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('button[title="Settings"]').click();
    cy.get('.settings-menu-header').should('be.visible');
    this.screenshot('openSettings');

    return new PostSettings();
  }
}

export default CreateEditPostPage;
