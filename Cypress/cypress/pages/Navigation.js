import TagListPage from "./TagListPage";

class Navigation {
  getUsername() {
    return cy.get('nav span.gh-user-email')
  }

  goToTags() {
    cy.get('nav li a').contains('Tags').click()

    return new TagListPage()
  }
}
  
export default Navigation;
  