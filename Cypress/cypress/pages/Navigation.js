import TagListPage from "./TagListPage";
import PageListPage from "./PageListPage";
import StaffListPage from "./StaffListPage";

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

  goToStaff() {
    cy.get('nav li a').contains('Staff').click()

    return new StaffListPage();
  }
}
  
export default Navigation;
  