context('Subaward FDP', () => {
  beforeEach(() => {
    cy.login('quickstart', 'password')
  })

  it('can create a new subaward', () => {
    cy.visit('/')

    cy.get('a.dropdown-toggle:contains("UNIT")').click()

    cy.get('.dropdown-menu p:contains("Subaward"):visible').parent().children('a.icon-plus').click()
    
    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#document\\.documentHeader\\.documentDescription').type('Subaward FDP AFT')
    })
  })
})