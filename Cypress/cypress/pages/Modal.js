class Modal {
  getMessage() {
    return cy.get('div.modal-body');
  }

  leave() {
    cy.contains('button', "Leave").click()
  }
}
  
export default Modal;
  