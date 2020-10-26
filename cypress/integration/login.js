context('Subaward FDP', () => {
  beforeEach(() => {
    cy.login('quickstart', 'password')
  })

  it('can create a new subaward', () => {
    // Create a subaward
    cy.get('a.dropdown-toggle:contains("UNIT")').click()

    cy.get('.dropdown-menu p:contains("Subaward"):visible').parent().children('a.icon-plus').click()

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#document\\.documentHeader\\.documentDescription').type('Subaward FDP AFT')
      cy.get('#document\\.subAwardList\\[0\\]\\.subAwardTypeCode').select('1')
      cy.get('#document\\.subAwardList\\[0\\]\\.statusCode').select('1')
      cy.get('#document\\.subAwardList\\[0\\]\\.requisitionerUserName').type('cate')
      cy.get('#document\\.subAwardList\\[0\\]\\.organizationId').type('000002')
    })

    cy.addSubAwardContact('186', '22')
    cy.addSubAwardContact('235', '37')
    cy.addSubAwardContact('242', '38')
    cy.addSubAwardContact('254', '34')
    cy.addSubAwardContact('257', '35')
    cy.addSubAwardContact('258', '36')
  })
})