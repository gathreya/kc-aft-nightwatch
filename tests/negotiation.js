const assert = require('assert');

module.exports = {
    '@disabled': false,
    // '@tags': ['authorization', 'admin'],
    before: function (browser) {
    },

    after: client => {
        client.end()
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
        const currentDate = new Date()
        const startDate = new Date(currentDate.getTime() - 10368000000)

        client
            .url(`${client.globals.baseUrl}/negotiationNegotiation.do?methodToCall=docHandler&command=initiate&docTypeName=NegotiationDocument`)
            .login()

            .waitForElementVisible('input[name="methodToCall.showAllTabs"]', 1000)
            .click('input[name="methodToCall.showAllTabs"]')
            .setValue('input[name="document.documentHeader.documentDescription"]', 'Negotiation AFT')
            .click('select[name="document.negotiationList[0].negotiationStatusId"] option[value="2"]')
            .setValue('input[type="text"][name="document.negotiationList[0].negotiatorUserName"]', 'aemcafee')
            .click('select[name="document.negotiationList[0].negotiationAgreementTypeId"] option[value="1"]')
            .click('select[name="document.negotiationList[0].negotiationAssociationTypeId"] option[value="1"]')
            .useXpath()
            .setValue("//th[contains(text(),'Billing Element:')]/following-sibling::td//input", '5')
            .setValue("//th[contains(text(),'Graduate Student Count:')]/following-sibling::td//input", '5')
            .useCss()
            .clearValue('input[type="text"][name="document.negotiationList[0].negotiationStartDate"]')
            .setValue('input[type="text"][name="document.negotiationList[0].negotiationStartDate"]',
              `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`)
            .clearValue('input[type="text"][name="document.negotiationList[0].negotiationEndDate"]')
            .setValue('input[type="text"][name="document.negotiationList[0].negotiationEndDate"]',
              `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`)
            .click('input[name="methodToCall.save"]')

            .getText('td', function(result) {
                negotiationDocumentNumber = result.value
            })
            .click('input[name="methodToCall.save"]')
            .pause(5000)
            .perform(function(client, done) {
                client
                    .url(`${client.globals.baseUrl}/kew/DocHandler.do?command=displayDocSearchView&docId=${negotiationDocumentNumber}`)
                    //.waitForElementVisible('input[data-test="username"]', 1000)
                    //.maximizeWindow()
                    //.setValue('input[data-test="username"]', 'quickstart')
                    //.setValue('input[data-test="password"]', 'password')
                    //.click('button[data-test="login"]')

                    .getText('table', function(result) {
                      console.log(result.value)
                        negotiationDocumentStatus = result.value.split(/\s+/g)[5]
                        assert.equal(negotiationDocumentStatus, 'FINAL')
                    })
                done()
            })
    }
};
