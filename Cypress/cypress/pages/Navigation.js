import TagListPage from "./TagListPage";
import PageListPage from "./PageListPage";
import StaffListPage from "./StaffListPage";
import { PostListPageV3, PostListPageV4 } from "./PostListPage";
import PageBase from "./PageBase";

export class NavigationV3 extends PageBase {
  NAME = "Navigation";

  goToTags() {
    cy.wait(2000);
    cy.get('nav li a').contains('Tags').click();
    cy.get('h3.gh-tag-list-name').should('exist');

    this.screenshot('goToTags');

    return new TagListPage();
  }

  goToPosts() {
    cy.wait(2000);
    cy.get('nav li a').contains('Posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');

    this.screenshot('goToPosts');

    return new PostListPageV3();
  }

  goToPages() {
    cy.wait(2000);
    cy.get('nav li a').contains('Pages').click();

    cy.wait(2000);
    this.screenshot('goToPages');

    return new PageListPage();
  }

  goToStaff() {
    cy.wait(2000);
    cy.get('nav li a').contains('Staff').click();

    cy.wait(2000);
    this.screenshot('goToStaff');

    return new StaffListPage();
  }
}

export class NavigationV4 extends NavigationV3 {
  goToPosts() {
    cy.wait(2000);
    cy.get('nav li a').contains('Posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');

    this.screenshot('goToPosts');

    return new PostListPageV4();
  }
  
  getSitename() {
    return cy.get('.gh-nav-menu-details-sitetitle');
  }
}
