import PageBase from "./PageBase";

class Modal extends PageBase {
  NAME = "Modal"

  getMessage() {
    return cy.get('div.modal-body');
  }

  leave() {
    cy.contains('button', "Leave").click();

    cy.wait(1000);
    this.screenshot('leave');
  }
}
  
export default Modal;
  