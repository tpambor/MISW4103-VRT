import CreateEditPostPage from "./CreateEditPostPage";
import PageBase from "./PageBase";

class PostListPage extends PageBase {
  NAME = "PostList";

  createNewPost() {
    cy.contains('a', 'New post').click();

    this.screenshot('createNewPost');

    return new CreateEditPostPage();
  }

  getPostNames() {
    return cy.get('h3.gh-content-entry-title');
  }

  filterDraftPosts() {
    cy.get('h3.gh-content-entry-title').should('exist');
    cy.get('.gh-contentfilter-type').click();
    this.screenshot('openTypeFilter');

    cy.get('li.ember-power-select-option').contains('Draft posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');
    this.screenshot('filterDraftPosts');

    return this;
  }

  filterPublishedPosts() {
    cy.get('h3.gh-content-entry-title').should('exist');
    cy.get('.gh-contentfilter-type').click();
    this.screenshot('openTypeFilter');

    cy.get('li.ember-power-select-option').contains('Published posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');
    this.screenshot('filterPublishedPosts');

    return this;
  }

  filterScheduledPosts() {
    cy.get('h3.gh-content-entry-title').should('exist');
    cy.get('.gh-contentfilter-type').click();
    this.screenshot('openTypeFilter');

    cy.get('li.ember-power-select-option').contains('Scheduled posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');
    this.screenshot('filterScheduledPosts');

    return this;
  }

  filterByTag(value) {
    cy.get('h3.gh-content-entry-title').should('exist');
    cy.get('.gh-contentfilter-tag').click();
    this.screenshot('openTagFilter');

    cy.get('li.ember-power-select-option').contains(value).click();
    cy.get('h3.gh-content-entry-title').should('exist');
    this.screenshot('filterPostsByTag');

    return this;
  }
}
    
export default PostListPage;
