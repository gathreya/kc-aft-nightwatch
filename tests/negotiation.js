const assert = require('assert');

module.exports = {
   '@disabled': false,
  // '@tags': ['authorization', 'admin'],
  before: function (browser) {
    const signInPage = browser.page.signIn()
    signInPage.navigate().authenticate()
  },

  after: function (browser) {
    browser.signout().endSession()
  },

   /*
     Given Users exist with the following roles: Negotiation Administrator, Negotiation Creator
    And the Negotiation Creator creates a Negotiation
    When an activity is added to the Negotiation
    Then the Negotiation Administrator can add an attachment to the Activity
    And give the Negotiation an end date and mark it complete
    */
   'Negotiation Test' : function (client) {
    let negotiationDocumentNumber
    let negotiationDocumentStatus

    client
    .url(`${client.globals.baseUrl}/kc-dev/negotiationNegotiation.do?methodToCall=docHandler&amp;command=initiate&amp;docTypeName=NegotiationDocument`)
    .click('input[name="methodToCall.showAllTabs"]')
    .setValue('input[name="document.documentHeader.documentDescription"]', 'Negotiation AFT')
    .click('select[name="document.negotiationList[0].negotiationStatusId"] option[value="2"]')
    .setValue('input[type="text"][name="document.negotiationList[0].negotiatorUserName"]', 'aemcafee')
    .click('select[name="document.negotiationList[0].negotiationAgreementTypeId"] option[value="1"]')
    .click('select[name="document.negotiationList[0].negotiationAssociationTypeId"] option[value="1"]')
    .setValue('input[type="text"][id="customDataHelper.customDataList[0].value"]', '5')
    .setValue('input[type="text"][id="customDataHelper.customDataList[3].value"]', '5')

    .getText('td', function(result) {
            negotiationDocumentNumber = result.value
    })
    .click('input[name="methodToCall.save"]')
    .perform(function(client, done) { 
        client     
        .url(`${client.globals.baseUrl}/kc-dev/kew/DocHandler.do?command=displayDocSearchView&docId=${negotiationDocumentNumber}`)
        .getText('table', function(result) {
            negotiationDocumentStatus = result.value.split(/\s+/g)[5]
            assert.equal(negotiationDocumentStatus, 'FINAL')
        })
    })
        
    .end();
    }
};