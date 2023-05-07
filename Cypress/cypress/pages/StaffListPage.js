import EditProfilePage from "./EditProfilePage";

class StaffListPage {
  getUsernames() {
    return cy.get('.gh-active-users .apps-card-app-title');
  }

  editProfile(value) {
    cy.get('.gh-active-users .apps-card-app-title').contains(value).click();

    return new EditProfilePage();
  }
}
    
export default StaffListPage;
