import CreateTagPage from "./CreateTagPage";

class TagListPage {
  createNewTag() {
    cy.contains('a', 'New tag').click()

    return new CreateTagPage()
  }

  getNumberOfTags() {
    return cy.get('li.gh-tags-list-item').its('length');
  }

  getTagNames() {
    return cy.get('h3.gh-tag-list-name');
  }

  getSlugs() {
    return cy.get('.gh-tag-list-slug span');
  }
}
    
export default TagListPage;
