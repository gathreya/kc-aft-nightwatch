const assert = require('assert');

module.exports = {
  '@disabled': false,
  // '@tags': ['authorization', 'admin'],
  before: function (browser) {
  },

  after: function (browser) {
    browser.signout().endSession()
  },

    "Time and Money test": function (client) {
    
    client
    .pause(1000)
    .url(`${client.globals.baseUrl}/kc-dev/awardHome.do?methodToCall=docHandler&command=initiate&docTypeName=AwardDocument&returnLocation=${client.globals.baseUrl}/kc-dev/%2Fkc-krad%2FlandingPage%3FviewId%3DKc-LandingPage-RedirectView`)
    .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
    .setValue('input[type=text]', 'quickstart')
    .click('button[id=Rice-LoginButton]')
    .waitForElementVisible('select[id="document.awardList[0].awardTransactionTypeCode"] option[value="9"]', 3000)
    .click('input[name="methodToCall.showAllTabs"]')
    .click('select[id="document.awardList[0].awardTransactionTypeCode"] option[value="9"]')
    .click('select[id="document.awardList[0].statusCode"] option[value="1"]')
    .click('select[id="document.awardList[0].activityTypeCode"] option[value="1"]')
    .click('select[id="document.awardList[0].awardTypeCode"] option[value="1"]')

    .setValue('input[type="text"][name="document.documentHeader.documentDescription"]', 'Nightwatch Time and Money AFT test')
    .setValue('[name="document.awardList[0].title"]', 'Nightwatch Time and Money AFT test')

    .setValue('input[id="document.awardList[0].unitNumber"]', '000001')
    .setValue('input[id="document.awardList[0].sponsorCode"]', '000340')
    
    .setValue('input[id="document.awardList[0].awardEffectiveDate"]', '04/01/2014')
    .setValue('input[id="document.awardList[0].awardAmountInfos[0].finalExpirationDate"]', '04/30/2017')

    .setValue('input[id="document.awardList[0].awardAmountInfos[0].currentFundEffectiveDate"]', '04/01/2017')
    .setValue('input[id="document.awardList[0].awardAmountInfos[0].obligationExpirationDate"]', '04/30/2017')

    .clearValue('input[id="document.awardList[0].awardAmountInfos[0].amountObligatedToDate"]')
    .clearValue('input[id="document.awardList[0].awardAmountInfos[0].anticipatedTotalAmount"]')
    .setValue('input[id="document.awardList[0].awardAmountInfos[0].amountObligatedToDate"]', '1000')
    .setValue('input[id="document.awardList[0].awardAmountInfos[0].anticipatedTotalAmount"]', '2000')

    .setValue('input[id="document.award.templateCode"]', '1')
    .click('input[name="methodToCall.applySponsorTemplate"]')
    .pause(3000)
    .waitForElementVisible('input[name="methodToCall.processAnswer.button0"]', 1000)
    .click('input[name="methodToCall.processAnswer.button0"]')
    .click('input[name="methodToCall.save"]')
    .click('input[name="methodToCall.timeAndMoney"]')
    .click('input[name="methodToCall.save"]')
    .assert.value('input[id="awardHierarchyNodeItems[1].amountObligatedToDate"]', '1,000.00')
    .end();
    }
};