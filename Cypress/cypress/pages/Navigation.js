import TagListPage from "./TagListPage";
import PageListPage from "./PageListPage";
import StaffListPage from "./StaffListPage";
import PostListPage from "./PostListPage";

class Navigation {
  getSitename() {
    return cy.get('.gh-nav-menu-details-blog');
  }

  goToTags() {
    cy.get('nav li a').contains('Tags').click()

    return new TagListPage()
  }

  goToPosts() {
    cy.get('nav li a').contains('Posts').click()

    return new PostListPage();
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

export class NavigationV4 extends Navigation {
  getSitename() {
    return cy.get('.gh-nav-menu-details-sitetitle');
  }
}
  
export default Navigation;
  