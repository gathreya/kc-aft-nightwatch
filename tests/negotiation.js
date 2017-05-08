const assert = require('assert');

module.exports = {
   '@disabled': true,
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
    .url('http://127.0.0.1:8081/kc-dev/kc-krad/landingPage?viewId=Kc-Header-IframeView&href=http%3A%2F%2F127.0.0.1%3A8081%2Fkc-dev%2FnegotiationNegotiation.do%3FmethodToCall%3DdocHandler%26command%3Dinitiate%26docTypeName%3DNegotiationDocument&methodToCall=start')
    .frame(0)
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
        .url("http://127.0.0.1:8081/kc-dev/kew/DocHandler.do?command=displayDocSearchView&docId=" + negotiationDocumentNumber)
        .getText('table', function(result) {
            negotiationDocumentStatus = result.value.split(/\s+/g)[5]
            assert.equal(negotiationDocumentStatus, 'FINAL')
        })
    })
        
    .end();
    }
};