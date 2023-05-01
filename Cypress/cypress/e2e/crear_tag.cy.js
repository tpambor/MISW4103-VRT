describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:2368/')
    cy.wait(3000)
  })
})
