import CreateEditPostPage from "./CreateEditPostPage";

class PostListPage {
  createNewPost() {
    cy.contains('a', 'New post').click();

    return new CreateEditPostPage();
  }

  getPostNames() {
    return cy.get('h3.gh-content-entry-title');
  }

  filterDraftPosts() {
    cy.get('h3.gh-content-entry-title').should('exist');
    cy.get('.gh-contentfilter-type').click();
    cy.get('li.ember-power-select-option').contains('Draft posts').click();

    return this;
  }

  filterPublishedPosts() {
    cy.get('h3.gh-content-entry-title').should('exist');
    cy.get('.gh-contentfilter-type').click();
    cy.get('li.ember-power-select-option').contains('Published posts').click();

    return this;
  }

  filterScheduledPosts() {
    cy.get('h3.gh-content-entry-title').should('exist');
    cy.get('.gh-contentfilter-type').click();
    cy.get('li.ember-power-select-option').contains('Scheduled posts').click();

    return this;
  }

  filterByTag(value) {
    cy.get('h3.gh-content-entry-title').should('exist');
    cy.get('.gh-contentfilter-tag').click();
    cy.get('li.ember-power-select-option').contains(value).click();

    return this;
  }
}
    
export default PostListPage;
