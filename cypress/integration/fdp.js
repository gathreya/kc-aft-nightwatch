import { v4 as uuid } from 'uuid'

context('Subaward FDP', () => {
  beforeEach(() => {
    cy.task('deleteFile', '/tmp/FDP_CR_2019v2_-_FINAL.pdf')
    cy.login('quickstart', 'password')
  })

  it('can create a new subaward', () => {
    // Create a subaward
    cy.get('a.dropdown-toggle:contains("UNIT")').click()

    cy.get('.dropdown-menu p:contains("Subaward"):visible').parent().children('a.icon-plus').click()

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('input[name="document.documentHeader.documentDescription"]').type('Subaward FDP AFT')
      cy.get('select[name="document.subAwardList[0].subAwardTypeCode"]').select('1')
      cy.get('select[name="document.subAwardList[0].statusCode"]').select('1')
      cy.get('input[name="document.subAwardList[0].requisitionerUserName"]').type('cate')
      cy.get('input[name="document.subAwardList[0].organizationId"]').type('000002')
      cy.get('#tab-FundingSource-div .addline input[title^="Search"]').click()
      cy.awaitProcessing()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#awardNumber').type('001820-00001')
      cy.get('input[title^="search"]').click()
      cy.awaitProcessing()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('a[title^="return value"]').click()
    })

    cy.wait(1000)

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#tab-FundingSource-div input.addButton').click()
      cy.awaitProcessing()
    })

    cy.addSubAwardContact('186', '22')
    cy.addSubAwardContact('235', '37')
    cy.addSubAwardContact('242', '38')
    cy.addSubAwardContact('254', '34')
    cy.addSubAwardContact('257', '35')
    cy.addSubAwardContact('258', '36')

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#globalbuttons input[title="save"]').should('exist')
      cy.get('input[value="Template Information"]').click()
      cy.awaitProcessing()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].rAndD"]').check('true')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].finalStatementDueCd"]').select('PPED')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].includesCostSharing"]').check('false')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].invoiceOrPaymentContact"]').select('Prime Administrative Contact')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].finalStmtOfCostscontact"]').select('Prime Authorized Official')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].changeRequestsContact"]').select('Prime Financial Contact')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].terminationContact"]').select('Principal Investigator')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].noCostExtensionContact"]').select('Prime Administrative Contact')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].carryForwardRequestsSentTo"]').select('Prime Authorized Official')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].irbIacucContact"]').select('Prime Financial Contact')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].invoicesEmailed"]').check('true')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].invoiceEmailDifferent"]').check('false')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].applicableProgramRegulations"]').type('Program regulations text')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].applicableProgramRegsDate"]').type('10/26/2020')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].copyRightType"]').select('1')
      cy.get('input[name="document.subAwardList[0].subAwardTemplateInfo[0].mpiAward"]').check('true')
      cy.get('select[name="document.subAwardList[0].subAwardTemplateInfo[0].mpiLeadershipPlan"]').select('0')
      cy.get('textarea[name="document.subAwardList[0].subAwardTemplateInfo[0].additionalTerms"]').type('Additional terms text')

      cy.get('input[value="Subaward Actions"]').click()
      cy.awaitProcessing()
    })

    cy.get('main iframe.uif-iFrame').iframe(() => {
      cy.get('#tab-Print-imageToggle').click()
      cy.contains('Cost Reimbursement')
      cy.get('select[name="subAwardPrintAgreement.selectedForms"]').select('RESBOOT19')
      cy.get('input[name="methodToCall.printTemplates"]').click()
    })

    const s3Id = uuid()
    cy.fileExists('/tmp/FDP_CR_2019v2_-_FINAL.pdf')
    cy.saveToS3('/tmp/FDP_CR_2019v2_-_FINAL.pdf', `test/fdp/${s3Id}`)
  })
})