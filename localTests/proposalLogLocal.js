module.exports = {
    /*
     Attempt to create a new Proposal Log Document with a missing required field
    Given the Create Proposal Log user creates a Proposal Log but misses a required field
    When  the Create Proposal Log user submits the Proposal Log
    Then  an error should appear saying the field is required
    */
    "Create Proposal Log test": function (client) {
     let proposalNumber

    client
    .url('http://127.0.0.1:8081/kc-dev/')
    .waitForElementVisible('body', 1000)
    .assert.title('Kuali ::')
    .assert.visible('input[type=text]')
    .setValue('input[type=text]', 'quickstart')
    .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
    .click('button[id=Rice-LoginButton]')
    .pause(1000)
    .url("http://127.0.0.1:8081/kc-dev/kc-krad/landingPage?viewId=Kc-Header-IframeView&href=http%3A%2F%2F127.0.0.1%3A8081%2Fkc-dev%2Fkr%2Fmaintenance.do%3FmethodToCall%3Dstart%26businessObjectClassName%3Dorg.kuali.kra.institutionalproposal.proposallog.ProposalLog%26returnLocation%3Dhttp%3A%2F%2F127.0.0.1%3A8081%2Fkc-dev%252Fkc-krad%252FlandingPage%253FviewId%253DKc-LandingPage-RedirectView&methodToCall=start")
    .frame(0)
    .setValue('input[name="document.documentHeader.documentDescription"]', 'Proposal Log AFT')
    .click('select[id="document.newMaintainableObject.proposalLogTypeCode"] option[value="1"]')
    .click('select[id="document.newMaintainableObject.proposalTypeCode"] option[value="1"]')
    .setValue('input[name="document.newMaintainableObject.title"]', 'Proposal Log AFT')
    .setValue('input[name="document.newMaintainableObject.leadUnit"]', '000001')
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
    .perform(function(client, done) {      
        client

        .url("http://127.0.0.1:8081/kc-dev/institutionalProposalHome.do?proposalNumber=" + proposalNumber +
        "&docTypeName=InstitutionalProposalDocument&methodToCall=docHandler&command=initiate#topOfForm")
        .pause(1000)
        .click('input[name="methodToCall.showAllTabs"]')
        .setValue('input[name="document.documentHeader.documentDescription"]', 'AFT Institutional Proposal')
        .setValue('input[name="document.institutionalProposalList[0].sponsorCode"]', '000340')
        .click('select[name="document.institutionalProposalList[0].activityTypeCode"] option[value="1"]')
        .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.contacts"]')
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


    .frame(0)

    })
    //.end();
    }
};