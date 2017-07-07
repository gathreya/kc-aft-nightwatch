module.exports = {
    '@disabled': true,

    'PD test' : function (client) {
        client
            .url(`${client.globals.baseUrl}/kc-dev/`)
            .waitForElementVisible('body', 1000)
            .assert.title('Kuali ::')
            .assert.visible('input[type=text]')
            .setValue('input[type=text]', 'quickstart')
            .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
            .click('button[id=Rice-LoginButton]')
            .pause(1000)
            .useXpath()     // every selector now must be XPath
            .click("//*[contains(text(), 'RESEARCHER')]")
            .click("//*[contains(text(), 'Create Proposal')]")
            .useCss()
            .click('select[name="document.developmentProposal.proposalTypeCode"] option[value="1"]')
            .pause(1000)

            .click('button[class="btn dropdown-toggle selectpicker btn-default"]')
            .pause(1000)
            .useXpath()     // every selector now must be XPath
            .click("//*[contains(text(), '000001 - University')]")
            .useCss()
            .pause(1000)

            .click('select[name="document.developmentProposal.activityTypeCode"] option[value="4"]')
            .pause(1000)

            .setValue('input[name="document.developmentProposal.requestedStartDateInitial"]', '04/01/2017')
            .setValue('input[name="document.developmentProposal.requestedEndDateInitial"]', '04/30/2017')
            .setValue('textArea[name="document.developmentProposal.title"]', 'Test')
            .click('button[id=ufuknm4]')
            .pause(1000)

        //.end();
    }
};
