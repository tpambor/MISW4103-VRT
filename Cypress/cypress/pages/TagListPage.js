import CreateTagPage from "./CreateTagPage";
import PageBase from "./PageBase";

class TagListPage extends PageBase {
  NAME = "TagList"

  createNewTag() {
    cy.contains('a', 'New tag').click()

    this.screenshot('createNewTag');

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
