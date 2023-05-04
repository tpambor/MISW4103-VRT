import CreateTagPage from "./CreateTagPage";

class TagListPage {
  createNewTag() {
    cy.contains('a', 'New tag').click()

    return new CreateTagPage()
  }

  getSlugs() {
    return cy.get('.gh-tag-list-slug span');
  }
}
    
export default TagListPage;
