import TagListPage from "./TagListPage";
import PageListPage from "./PageListPage";
import StaffListPage from "./StaffListPage";
import PostListPage from "./PostListPage";
import PageBase from "./PageBase";

class Navigation extends PageBase {
  NAME = "Navigation";

  goToTags() {
    cy.get('nav li a').contains('Tags').click();
    cy.get('h3.gh-tag-list-name').should('exist');

    this.screenshot('goToTags');

    return new TagListPage();
  }

  goToPosts() {
    cy.get('nav li a').contains('Posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');

    this.screenshot('goToPosts');

    return new PostListPage();
  }

  goToPages() {
    cy.get('nav li a').contains('Pages').click();

    return new PageListPage();
  }

  goToStaff() {
    cy.get('nav li a').contains('Staff').click();

    return new StaffListPage();
  }
}

export class NavigationV4 extends Navigation {
  getSitename() {
    return cy.get('.gh-nav-menu-details-sitetitle');
  }
}
  
export default Navigation;
  