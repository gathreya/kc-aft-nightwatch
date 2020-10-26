context('Subaward FDP', () => {
  beforeEach(() => {
    cy.login('quickstart', 'password')
  })

  it('can create a new subaward', () => {
    cy.visit('/')

    cy.contains('#kualiForm')
  })
})