module.exports = {
  // '@tags': ['authorization', 'admin'],

    "Award test": function (client) {
    let documentNumber
    let awardIdAccount
    let awardNumber
    let hierarchyNumber
    let tabNumber
    let transactionAdd

    client
    .url('http://127.0.0.1:8081/kc-dev/')
    .waitForElementVisible('body', 1000)
    .assert.title('Kuali ::')
    .assert.visible('input[type=text]')
    .setValue('input[type=text]', 'quickstart')
    .waitForElementVisible('button[id=Rice-LoginButton]', 1000)
    .click('button[id=Rice-LoginButton]')
    .pause(1000)
    .url("http://127.0.0.1:8081/kc-dev/kc-krad/landingPage?viewId=Kc-Header-IframeView&href=http%3A%2F%2F127.0.0.1%3A8081%2Fkc-dev%2FawardHome.do%3FmethodToCall%3DdocHandler%26command%3Dinitiate%26docTypeName%3DAwardDocument%26returnLocation%3Dhttp%3A%2F%2F127.0.0.1%3A8081%2Fkc-dev%252Fkc-krad%252FlandingPage%253FviewId%253DKc-LandingPage-RedirectView&methodToCall=start")
    .frame(0)
    .waitForElementVisible('select[id="document.awardList[0].awardTransactionTypeCode"] option[value="9"]', 1000)
    .click('select[id="document.awardList[0].awardTransactionTypeCode"] option[value="9"]')
    .click('select[id="document.awardList[0].statusCode"] option[value="1"]')
    .click('select[id="document.awardList[0].activityTypeCode"] option[value="1"]')
    .click('select[id="document.awardList[0].awardTypeCode"] option[value="1"]')

    .setValue('input[type="text"][name="document.documentHeader.documentDescription"]', 'Test award')
    .setValue('[name="document.awardList[0].title"]', 'Nightwatch AFT test')

    .setValue('input[id="document.awardList[0].unitNumber"]', '000001')
    .setValue('input[id="document.awardList[0].sponsorCode"]', '000340')
    
    .setValue('input[id="document.awardList[0].awardEffectiveDate"]', '04/01/2014')
    .setValue('input[id="document.awardList[0].awardAmountInfos[0].finalExpirationDate"]', '04/30/2017')

    .click('input[name="methodToCall.toggleTab.tabSponsorTemplate"]')
    .setValue('input[id="document.award.templateCode"]', '1')
    .click('input[name="methodToCall.applySponsorTemplate"]')
    .pause(1000)
    .click('input[name="methodToCall.processAnswer.button0"]')

    // contacts tab
    .pause(1000)
    .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.contacts"]')
    .pause(1000)
    .getText('#docIdAndStatus', function(result) {
        documentNumber = result.value.split(':')[0]
    })
    .click('input[name="methodToCall.toggleTab.tabKeyPersonnelandCreditSplit"]')
    .setValue('input[type="text"][name="projectPersonnelBean.newProjectPerson.person.fullName"]', 'aemcafee')
    .pause(1000)
    .setValue('input[type="text"][name="projectPersonnelBean.newProjectPerson.rolodex.fullName"]', '')
    .pause(1000)
    .click('input[name="methodToCall.addProjectPerson"]')

    .setValue('input[type="text"][name="projectPersonnelBean.newProjectPerson.person.fullName"]', 'quickstart')
    .pause(1000)
    .setValue('input[type="text"][name="projectPersonnelBean.newProjectPerson.rolodex.fullName"]', '')
    .pause(1000)
    .click('select[id="projectPersonnelBean.contactRoleCode"] option[value="MPI"]')
    .pause(1000)
    .click('input[name="methodToCall.addProjectPerson"]')
    .pause(1000)

    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].creditSplits[0].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].creditSplits[0].credit"]', '50.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].creditSplits[1].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].creditSplits[1].credit"]', '50.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].creditSplits[2].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].creditSplits[2].credit"]', '50.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].creditSplits[3].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].creditSplits[3].credit"]', '50.00')

    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].units[0].creditSplits[0].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].units[0].creditSplits[0].credit"]', '100.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].units[0].creditSplits[1].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].units[0].creditSplits[1].credit"]', '100.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].units[0].creditSplits[2].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].units[0].creditSplits[2].credit"]', '100.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].units[0].creditSplits[3].credit"]')    
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[0].units[0].creditSplits[3].credit"]', '100.00')

    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].creditSplits[0].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].creditSplits[0].credit"]', '50.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].creditSplits[1].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].creditSplits[1].credit"]', '50.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].creditSplits[2].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].creditSplits[2].credit"]', '50.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].creditSplits[3].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].creditSplits[3].credit"]', '50.00')

    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].units[0].creditSplits[0].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].units[0].creditSplits[0].credit"]', '100.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].units[0].creditSplits[1].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].units[0].creditSplits[1].credit"]', '100.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].units[0].creditSplits[2].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].units[0].creditSplits[2].credit"]', '100.00')
    .clearValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].units[0].creditSplits[3].credit"]')
    .setValue('input[id="document.awardList[0].personsSelectedForCreditSplit[1].units[0].creditSplits[3].credit"]', '100.00')
    .pause(1000)

    .click('input[name="methodToCall.save"]')

    .pause(1000)
    .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.customData"]')
    .pause(1000)

    .click('input[name="methodToCall.toggleTab.tabAdditionalData"]')
    .setValue('input[id="customDataHelper.customDataList[0].value"]', '5')
    .click('input[name="methodToCall.toggleTab.tabPersonnelItemsforReview"]')
    .setValue('input[id="customDataHelper.customDataList[3].value"]', '5')

    .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.awardActions"]')
    .pause(1000)
    .click('input[name="methodToCall.blanketApprove"]')
    .pause(1000)
    .perform(function(client, done) {      
      client
      .url("http://127.0.0.1:8081/kc-dev/kew/DocHandler.do?command=displayDocSearchView&docId=" + documentNumber)
        .frame(0)
        .click('input[name="methodToCall.timeAndMoney"]')
        .getText('#awardIdAccount', function(result) {
            awardIdAccount = result.value.split(':')[0]
            awardNumber = awardIdAccount.split('-')[0]
            hierarchyNumber = awardIdAccount.split('-')[1]
            transactionTabNumber = "methodToCall.toggleTab.tabTransactions" + awardNumber + hierarchyNumber
            transactionAdd = "methodToCall.addTransaction.anchorTransactions" + awardNumber + hierarchyNumber
        })
        .perform(function(client, done) {
            client
            .setValue('input[id="awardHierarchyNodeItems[1].currentFundEffectiveDate"]', '04/01/2014')
            .setValue('input[id="awardHierarchyNodeItems[1].obligationExpirationDate"]', '04/30/2017')
            // Adding transactions
            .click(`input[name="${transactionTabNumber}"]`)

            .click('select[id="transactionBean.newPendingTransaction.sourceAwardNumber"] option[value="000000-00000"]')
            .click(`select[id="transactionBean.newPendingTransaction.destinationAwardNumber"] option[value="${awardIdAccount}"]`)
            
            .clearValue('input[id="transactionBean.newPendingTransaction.obligatedAmount"]')
            .setValue('input[id="transactionBean.newPendingTransaction.obligatedAmount"]', '100000.00')
            .clearValue('input[id="transactionBean.newPendingTransaction.anticipatedAmount"]')
		    .setValue('input[id="transactionBean.newPendingTransaction.anticipatedAmount"]', '100000.00')
            .click(`input[name="${transactionAdd}"]`)
            .click('input[name="methodToCall.blanketApprove"]')

            .url("http://127.0.0.1:8081/kc-dev/kew/DocHandler.do?command=displayDocSearchView&docId=" + documentNumber)
            .pause(1000)
            .click('input[name="methodToCall.headerTab.headerDispatch.reload.navigateTo.budgets"]')
            .setValue('input[name="newBudgetVersionName"]', 'Award Budget AFT')
            .click('input[name="methodToCall.addBudgetVersion"]')
            .pause(1000)
            .click('input[name="methodToCall.openBudgetVersion.line0"]')
            .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.parameters"]')
            .pause(1000)
            .clearValue('input[id="document.budget.budgetPeriods[0].directCostLimit"]')
            .setValue('input[id="document.budget.budgetPeriods[0].directCostLimit"]', '25000.00')
            .clearValue('input[id="document.budget.budgetPeriods[1].directCostLimit"]')
            .setValue('input[id="document.budget.budgetPeriods[1].directCostLimit"]', '25000.00')
            .clearValue('input[id="document.budget.budgetPeriods[2].directCostLimit"]')
            .setValue('input[id="document.budget.budgetPeriods[2].directCostLimit"]', '25000.00')
            .clearValue('input[id="document.budget.budgetPeriods[3].directCostLimit"]')
            .setValue('input[id="document.budget.budgetPeriods[3].directCostLimit"]', '25000.00')

            .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.expenses"]')
            .pause(1000)
            .click('input[name="methodToCall.toggleTab.tabEquipment"]')

            .click('input[name="methodToCall.toggleTab.tabOtherDirect"]')
            
            // adding non personnel items
            .click('select[name="newBudgetLineItems[0].costElement"] option[value="421818"]')
            .clearValue('input[id="newBudgetLineItems[0].lineItemCost"]')
            .setValue('input[id="newBudgetLineItems[0].lineItemCost"]', '5000.00')
            .click('input[name="methodToCall.addBudgetLineItem.budgetCategoryTypeCodeE.catTypeIndex0.anchorEquipment"]')
            .click('input[name="methodToCall.toggleTab.tab20"]')
            .click('input[name="methodToCall.applyToLaterPeriods.line0.anchor30"]')

            .click('select[name="newBudgetLineItems[3].costElement"] option[value="420226"]')
            .clearValue('input[id="newBudgetLineItems[3].lineItemCost"]')
            .setValue('input[id="newBudgetLineItems[3].lineItemCost"]', '5000.00')
            .click('input[name="methodToCall.addBudgetLineItem.budgetCategoryTypeCodeO.catTypeIndex3.anchorOtherDirect"]')
            .click('input[name="methodToCall.toggleTab.tab48"]')
            .click('input[name="methodToCall.applyToLaterPeriods.line1.anchor58"]')

            // adding personnel line items
            .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.personnel"]')
            .pause(1000)
            .click('input[name="methodToCall.toggleTab.tabPersonnelDetailPeriod1"]')
            
            .click('select[name="newBudgetPersonnelDetails.personSequenceNumber"] option[value="1"]')
            .click('select[name="newBudgetLineItems[0].costElement"] option[value="400250"]')
            .click('input[name="methodToCall.addPersonnelLineItem.budgetCategoryTypeCodeP.catTypeIndex0.anchorPersonnelDetailPeriod1"]')

            .click('select[name="newBudgetPersonnelDetails.personSequenceNumber"] option[value="2"]')
            .click('select[name="newBudgetLineItems[0].costElement"] option[value="400025"]')
            .click('input[name="methodToCall.addPersonnelLineItem.budgetCategoryTypeCodeP.catTypeIndex0.anchorPersonnelDetailPeriod1"]')
            .click('input[name="methodToCall.save"]')

            // entering effort
            .pause(1000)
            .click('input[name="methodToCall.toggleTab.tab34"]')
            .waitForElementVisible('input[name="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentEffort"]', 1000)
            .clearValue('input[name="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentEffort"]')
            .setValue('input[name="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentEffort"]', '100.00')
            .pause(1000)
            .waitForElementVisible('input[name="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentCharged"]', 1000)
            .clearValue('input[name="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentCharged"]')
            .setValue('input[name="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentCharged"]', '100.00')
            .pause(1000)
            .click('input[name="methodToCall.calculateSalary.line0.personnel0.anchor34"]')
            .click('input[name="methodToCall.toggleTab.tab43"]')
            .click('input[name="methodToCall.applyToLaterPeriods.line0.anchor53"]')


        })
      done();
    })
    
    .end();
    }
};