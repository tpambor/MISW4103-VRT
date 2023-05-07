import TagListPage from "./TagListPage";
import PageListPage from "./PageListPage";
import EditarPerfil from "./EditarPerfilPage";
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

  goToPerfil() {
    //cy.get('nav li a').contains('staff/').click()
    return new EditarPerfil();
  }
}
  
export default Navigation;
  