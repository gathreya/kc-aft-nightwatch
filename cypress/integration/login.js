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
      cy.get('#newSubAwardContact\\.rolodex\\.rolodexId').type('186')
      cy.get('#newSubAwardContact\\.contactTypeCode').select('22')
      cy.get('#subAward-contacts-table input.addButton').click()
      cy.get('#subAward-contacts-table').first('td').first('div').should('contain', 'Moyer, Kathy')
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#newSubAwardContact\\.rolodex\\.rolodexId').type('235')
      cy.get('#newSubAwardContact\\.contactTypeCode').select('37')
      cy.get('#subAward-contacts-table input.addButton').click()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#newSubAwardContact\\.rolodex\\.rolodexId').type('242')
      cy.get('#newSubAwardContact\\.contactTypeCode').select('38')
      cy.get('#subAward-contacts-table input.addButton').click()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#newSubAwardContact\\.rolodex\\.rolodexId').type('254')
      cy.get('#newSubAwardContact\\.contactTypeCode').select('34')
      cy.get('#subAward-contacts-table input.addButton').click()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#newSubAwardContact\\.rolodex\\.rolodexId').type('257')
      cy.get('#newSubAwardContact\\.contactTypeCode').select('35')
      cy.get('#subAward-contacts-table input.addButton').click()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#newSubAwardContact\\.rolodex\\.rolodexId').type('258')
      cy.get('#newSubAwardContact\\.contactTypeCode').select('36')
      cy.get('#subAward-contacts-table input.addButton').click()
    })
  })
})