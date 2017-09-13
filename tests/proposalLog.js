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
     Attempt to create a new Proposal Log Document with a missing required field
    Given the Create Proposal Log user creates a Proposal Log but misses a required field
    When  the Create Proposal Log user submits the Proposal Log
    Then  an error should appear saying the field is required
    */
    "Proposal Log and Institutional Proposal Test": function (client) {
        let proposalNumber
        let proposalDocumentNumber
        let proposalDocumentStatus
        client
            .url(`${client.globals.baseUrl}/kr/maintenance.do?methodToCall=start&businessObjectClassName=org.kuali.kra.institutionalproposal.proposallog.ProposalLog&returnLocation=${client.globals.baseUrl}/%2Fkc-krad%2FlandingPage%3FviewId%3DKc-LandingPage-RedirectView`)
            .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
            .setValue('input[type=text]', 'quickstart')
            .click('button[id=Rice-LoginButton]')

            .pause(1000)
            .waitForElementVisible('input[id="document.documentHeader.documentDescription"]', 3000)
            .setValue('input[id="document.documentHeader.documentDescription"]', 'Proposal Log AFT')
            .click('select[id="document.newMaintainableObject.proposalLogTypeCode"] option[value="1"]')
            .click('select[id="document.newMaintainableObject.proposalTypeCode"] option[value="1"]')
            .setValue('input[id="document.newMaintainableObject.title"]', 'Proposal Log AFT')
            .setValue('input[id="document.newMaintainableObject.leadUnit"]', '000001')
            .click('input[name="methodToCall.blanketApprove"]')
            .waitForElementVisible('div[class="kul-error"]', 1000)

            /* Scenario: Create a new Proposal Log Document
            When  the Create Proposal Log user creates a Proposal Log
            Then  the status of the Proposal Log should be INITIATED
            And   the Proposal Log status should be Pending */

            .setValue('input[id="document.newMaintainableObject.person.userName"]', 'quickstart')
            .setValue('input[id="document.newMaintainableObject.rolodexId"]', '')
            .getText('span', function(result) {
                proposalNumber = result.value.trim()
            })
            .pause(5000)
            .click('input[name="methodToCall.blanketApprove"]')
            /* Scenario: Create an IP document from the proposal log */
            .perform(function(client, done) {      
                client

                    .url(`${client.globals.baseUrl}/institutionalProposalHome.do?proposalNumber=${proposalNumber}&docTypeName=InstitutionalProposalDocument&methodToCall=docHandler&command=initiate#topOfForm`)
                    .element('css selector', '[id=Rice-LoginButton]', function(result) {
                        if(result.status != -1) {
                            client.setValue('input[type=text]', 'quickstart')
                            client.click('button[id=Rice-LoginButton]')        
                        }
                    })

                    .pause(1000)
                    .click('input[name="methodToCall.showAllTabs"]')
                    .setValue('input[name="document.documentHeader.documentDescription"]', 'AFT Institutional Proposal')
                    .setValue('input[name="document.institutionalProposalList[0].sponsorCode"]', '000340')
                    .click('select[id="document.institutionalProposalList[0].activityTypeCode"] option[value="1"]')
                    .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.contacts"]')
                    .pause(1000)
                    .click('input[name="methodToCall.showAllTabs"]')

                    .clearValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].creditSplit[0].credit"]')
                    .setValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].creditSplit[0].credit"]', '100.00')    
                    .clearValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].creditSplit[1].credit"]')
                    .setValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].creditSplit[1].credit"]', '100.00')    
                    .clearValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].creditSplit[2].credit"]')
                    .setValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].creditSplit[2].credit"]', '100.00')
                    .clearValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].creditSplit[3].credit"]')
                    .setValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].creditSplit[3].credit"]', '100.00')

                    .clearValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].unit[0].creditSplit[0].credit"]')
                    .setValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].unit[0].creditSplit[0].credit"]', '100.00')
                    .clearValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].unit[0].creditSplit[1].credit"]')
                    .setValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].unit[0].creditSplit[1].credit"]', '100.00')
                    .clearValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].unit[0].creditSplit[2].credit"]')
                    .setValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].unit[0].creditSplit[2].credit"]', '100.00')
                    .clearValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].unit[0].creditSplit[3].credit"]')    
                    .setValue('input[id="document.institutionalProposalList[0].personsSelectedForCreditSplit[0].unit[0].creditSplit[3].credit"]', '100.00')

                    .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.customData"]')
                    .click('input[name="methodToCall.showAllTabs"]')
                    .setValue('input[id="customDataHelper.customDataList[1].value"]', '3')
                    .setValue('input[id="customDataHelper.customDataList[4].value"]', '5')

                    .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.distribution"]')
                    .click('input[name="methodToCall.showAllTabs"]')
                // cost share values
                    .setValue('input[id="institutionalProposalCostShareBean.newInstitutionalProposalCostShare.projectPeriod"]', '1')
                    .setValue('input[id="institutionalProposalCostShareBean.newInstitutionalProposalCostShare.costSharePercentage"]', '100.00')
                    .setValue('input[id="institutionalProposalCostShareBean.newInstitutionalProposalCostShare.sourceAccount"]', '12345')
                    .setValue('input[id="institutionalProposalCostShareBean.newInstitutionalProposalCostShare.amount"]', '220.96')
                    .setValue('input[id="institutionalProposalCostShareBean.newInstitutionalProposalCostShare.unitNumber"]', '000001')
                    .click('input[name="methodToCall.addCostShare.anchorCostSharing"]')
                // unrecovered f&a
                    .setValue('input[id="institutionalProposalUnrecoveredFandABean.newInstitutionalProposalUnrecoveredFandA.fiscalYear"]', '2017')
                    .click('select[name="institutionalProposalUnrecoveredFandABean.newInstitutionalProposalUnrecoveredFandA.indirectcostRateTypeCode"] option[value="1"]')
                    .setValue('input[id="institutionalProposalUnrecoveredFandABean.newInstitutionalProposalUnrecoveredFandA.applicableIndirectcostRate"]', '10')
                    .setValue('input[id="institutionalProposalUnrecoveredFandABean.newInstitutionalProposalUnrecoveredFandA.sourceAccount"]', '1234')
                    .setValue('input[id="institutionalProposalUnrecoveredFandABean.newInstitutionalProposalUnrecoveredFandA.underrecoveryOfIndirectcost"]', '550.23')
                    .click('input[name="methodToCall.addUnrecoveredFandA.anchorUnrecoveredFA"]')
                    .getText('td', function(result) {
                        proposalDocumentNumber = result.value
                    })
                    .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.institutionalProposalActions"]')
                    .click('input[name="methodToCall.route"]')
                    .perform(function(client, done) { 
                        client     
                            .pause(3000)
                            .url(`${client.globals.baseUrl}/kew/DocHandler.do?command=displayDocSearchView&docId=${proposalDocumentNumber}`)
                            .element('css selector', '[id=Rice-LoginButton]', function(result) {
                                if(result.status != -1) {
                                    client.setValue('input[type=text]', 'quickstart')
                                    client.click('button[id=Rice-LoginButton]')        
                                }
                            })
                            .getText('table', function(result) {
                                proposalDocumentStatus = result.value.split(/\s+/g)[5]
                                assert.equal(proposalDocumentStatus, 'FINAL')
                                done()
                            })
                    })
                done()
            })
    }
};
