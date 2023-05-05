import TagListPage from "./TagListPage";
import PageListPage from "./PageListPage";

class Navigation {
  getUsername() {
    return cy.get('nav span.gh-user-email')
  }

  goToTags() {
    cy.get('nav li a').contains('Tags').click()

    return new TagListPage()
  }

  goToPages() {
    cy.get('nav li a').contains('Pages').click()

    return new PageListPage();
  }
}
  
export default Navigation;
  