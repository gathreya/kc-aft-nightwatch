const assert = require('assert');

module.exports = {
    '@disabled': false,
    // '@tags': ['authorization', 'admin'],
    before: function (browser) {
    },

    after: client => {
        client.end()
    },

    "Award and Award Budget test": function (client) {
        let documentNumber
        let awardIdAccount
        let awardNumber
        let hierarchyNumber
        let tabNumber
        let transactionAdd

        client
            .pause(1000)
            .url(`${client.globals.baseUrl}/awardHome.do?methodToCall=docHandler&command=initiate&docTypeName=AwardDocument&returnLocation=${client.globals.baseUrl}/%2Fkc-krad%2FlandingPage%3FviewId%3DKc-LandingPage-RedirectView`)
            .login()

            .waitForElementVisible('select[id="document.awardList[0].awardTransactionTypeCode"] option[value="9"]')
            .click('input[name="methodToCall.showAllTabs"]')
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

            .setValue('input[id="document.award.templateCode"]', '1')
            .click('input[name="methodToCall.applySponsorTemplate"]')
            .pause(3000)
            .waitForElementVisible('input[name="methodToCall.processAnswer.button0"]')
            .click('input[name="methodToCall.processAnswer.button0"]')

        // contacts tab
            .pause(1000)
            .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.contacts"]')
            .pause(1000)
            .getText('#docIdAndStatus', function(result) {
                documentNumber = result.value.split(':')[0]
                budgetDocumentNumber = Number(documentNumber) + 2
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
            .useXpath()
            .setValue("//th[contains(text(),'Billing Element:')]/following-sibling::td//input", '5')
            .useCss()
            .click('input[name="methodToCall.toggleTab.tabPersonnelItemsforReview"]')
            .useXpath()
            .setValue("//th[contains(text(),'Graduate Student Count:')]/following-sibling::td//input", '5')
            .useCss()

            .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.awardActions"]')
            .pause(1000)
            .click('input[name="methodToCall.blanketApprove"]')
            .pause(1000)
            .perform(function(client, done) {
                // potentially other async stuff going on
                // on finished, call the done callback
                client
                    .url(`${client.globals.baseUrl}/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)

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
                            .url(`${client.globals.baseUrl}/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)
                            .pause(1000)
                            .click('input[name="methodToCall.headerTab.headerDispatch.reload.navigateTo.budgets"]')
                            .setValue('input[name="newBudgetVersionName"]', 'Award Budget AFT')
                            .click('input[name="methodToCall.addBudgetVersion"]')
                            .pause(1000)
                            .sendKeys('input[name="methodToCall.openBudgetVersion.line0"]', client.Keys.ENTER)
                            .waitForElementVisible('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.parameters"]')
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
                            .click('input[name="methodToCall.showAllTabs"]')

                            .click('select[name="newBudgetLineItems[2].costElement"] option[value="420333"]')
                            .clearValue('input[id="newBudgetLineItems[2].lineItemCost"]')
                            .setValue('input[id="newBudgetLineItems[2].lineItemCost"]', '5000.00')
                            .click('input[name="methodToCall.addBudgetLineItem.budgetCategoryTypeCodeS.catTypeIndex2.anchorParticipantSupport"]')


                            .click('select[name="viewBudgetPeriod"] option[value="2"]')
                            .click('input[name="methodToCall.updateBudgetPeriodView"]')
                            .pause(1000)
                            .click('select[name="newBudgetLineItems[0].costElement"] option[value="421818"]')
                            .clearValue('input[id="newBudgetLineItems[0].lineItemCost"]')
                            .setValue('input[id="newBudgetLineItems[0].lineItemCost"]', '5000.00')
                            .click('input[name="methodToCall.addBudgetLineItem.budgetCategoryTypeCodeE.catTypeIndex0.anchorEquipment"]')

                            .click('select[name="newBudgetLineItems[2].costElement"] option[value="420333"]')
                            .clearValue('input[id="newBudgetLineItems[2].lineItemCost"]')
                            .setValue('input[id="newBudgetLineItems[2].lineItemCost"]', '5000.00')
                            .click('input[name="methodToCall.addBudgetLineItem.budgetCategoryTypeCodeS.catTypeIndex2.anchorParticipantSupport"]')


                            .click('select[name="viewBudgetPeriod"] option[value="3"]')
                            .click('input[name="methodToCall.updateBudgetPeriodView"]')
                            .pause(1000)
                            .click('select[name="newBudgetLineItems[0].costElement"] option[value="421818"]')
                            .clearValue('input[id="newBudgetLineItems[0].lineItemCost"]')
                            .setValue('input[id="newBudgetLineItems[0].lineItemCost"]', '5000.00')
                            .click('input[name="methodToCall.addBudgetLineItem.budgetCategoryTypeCodeE.catTypeIndex0.anchorEquipment"]')

                            .click('select[name="newBudgetLineItems[2].costElement"] option[value="420333"]')
                            .clearValue('input[id="newBudgetLineItems[2].lineItemCost"]')
                            .setValue('input[id="newBudgetLineItems[2].lineItemCost"]', '5000.00')
                            .click('input[name="methodToCall.addBudgetLineItem.budgetCategoryTypeCodeS.catTypeIndex2.anchorParticipantSupport"]')


                            .click('select[name="viewBudgetPeriod"] option[value="4"]')
                            .click('input[name="methodToCall.updateBudgetPeriodView"]')
                            .pause(1000)
                            .click('select[name="newBudgetLineItems[0].costElement"] option[value="421818"]')
                            .clearValue('input[id="newBudgetLineItems[0].lineItemCost"]')
                            .setValue('input[id="newBudgetLineItems[0].lineItemCost"]', '5000.00')
                            .click('input[name="methodToCall.addBudgetLineItem.budgetCategoryTypeCodeE.catTypeIndex0.anchorEquipment"]')

                            .click('select[name="newBudgetLineItems[2].costElement"] option[value="420333"]')
                            .clearValue('input[id="newBudgetLineItems[2].lineItemCost"]')
                            .setValue('input[id="newBudgetLineItems[2].lineItemCost"]', '5000.00')
                            .click('input[name="methodToCall.addBudgetLineItem.budgetCategoryTypeCodeS.catTypeIndex2.anchorParticipantSupport"]')


                            // adding personnel line items
                            .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.personnel"]')
                            .pause(3000)

                            .click('select[name="viewBudgetPeriod"] option[value="1"]')
                            .click('input[name="methodToCall.updateBudgetPeriodView"]')
                            .pause(1000)
                            .click('input[name="methodToCall.showAllTabs"]')

                            .waitForElementVisible('input[name="document.budget.budgetPersons[0].calculationBase"]')
                            .clearValue('input[name="document.budget.budgetPersons[0].calculationBase"]')
                            .setValue('input[name="document.budget.budgetPersons[0].calculationBase"]', '5000')
                            .pause(1000)

                            .clearValue('input[name="document.budget.budgetPersons[1].calculationBase"]')
                            .setValue('input[name="document.budget.budgetPersons[1].calculationBase"]', '5000')
                            .pause(1000)
                            .click('input[name="methodToCall.showAllTabs"]')
                            .click('select[name="newBudgetPersonnelDetails.personSequenceNumber"] option[value="1"]')
                            .click('select[name="newBudgetLineItems[0].costElement"] option[value="400250"]')
                            .click(".addButton")
                            .pause(1000)
                            .click('input[name="methodToCall.showAllTabs"]')
                            .pause(3000)
                            .waitForElementVisible('input[id="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentEffort"]')
                            .clearValue('input[id="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentEffort"]')
                            .setValue('input[id="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentEffort"]', '100.00')
                            .waitForElementVisible('input[name="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentCharged"]')
                            .clearValue('input[name="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentCharged"]')
                            .setValue('input[name="document.budget.budgetPeriod[0].budgetLineItem[0].budgetPersonnelDetailsList[0].percentCharged"]', '100.00')
                            .click('input[name="methodToCall.showAllTabs"]')

                            // disable inflation
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].applyInRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].applyInRateFlag"]', client.Keys.SPACE)
                            // disable la rates
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[1].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[1].applyRateFlag"]', client.Keys.SPACE)

                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[2].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[2].applyRateFlag"]', client.Keys.SPACE)
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[3].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[3].applyRateFlag"]', client.Keys.SPACE)
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[4].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[4].applyRateFlag"]', client.Keys.SPACE)
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[5].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[5].applyRateFlag"]', client.Keys.SPACE)
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[0].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[0].budgetLineItemCalculatedAmounts[0].applyRateFlag"]', client.Keys.SPACE)

                            .click('input[name^="methodToCall.calculateSalary.line0"]')
                            .click('input[name="methodToCall.showAllTabs"]')
                            .waitForElementVisible('input[name^="methodToCall.applyToLaterPeriods.line0"]')
                            .sendKeys('input[name^="methodToCall.applyToLaterPeriods.line0"]', client.Keys.ENTER)

                            .click('select[name="newBudgetPersonnelDetails.personSequenceNumber"] option[value="2"]')
                            .click('select[name="newBudgetLineItems[0].costElement"] option[value="400025"]')
                            .click(".addButton")
                            .waitForElementVisible('input[name="document.budget.budgetPeriod[0].budgetLineItem[2].budgetPersonnelDetailsList[0].percentEffort"]')
                            .clearValue('input[name="document.budget.budgetPeriod[0].budgetLineItem[2].budgetPersonnelDetailsList[0].percentEffort"]')
                            .setValue('input[name="document.budget.budgetPeriod[0].budgetLineItem[2].budgetPersonnelDetailsList[0].percentEffort"]', '100.00')
                            .waitForElementVisible('input[name="document.budget.budgetPeriod[0].budgetLineItem[2].budgetPersonnelDetailsList[0].percentCharged"]')
                            .clearValue('input[name="document.budget.budgetPeriod[0].budgetLineItem[2].budgetPersonnelDetailsList[0].percentCharged"]')
                            .setValue('input[name="document.budget.budgetPeriod[0].budgetLineItem[2].budgetPersonnelDetailsList[0].percentCharged"]', '100.00')

                            // disable inflation
                            .click('input[name="methodToCall.showAllTabs"]')
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].applyInRateFlag"]', 1000)
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].applyInRateFlag"]', client.Keys.SPACE)

                            // disable la rates
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].budgetLineItemCalculatedAmounts[1].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].budgetLineItemCalculatedAmounts[1].applyRateFlag"]', client.Keys.SPACE)
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].budgetLineItemCalculatedAmounts[2].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].budgetLineItemCalculatedAmounts[2].applyRateFlag"]', client.Keys.SPACE)
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].budgetLineItemCalculatedAmounts[3].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].budgetLineItemCalculatedAmounts[3].applyRateFlag"]', client.Keys.SPACE)
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].budgetLineItemCalculatedAmounts[4].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].budgetLineItemCalculatedAmounts[4].applyRateFlag"]', client.Keys.SPACE)
                            .waitForElementVisible('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].budgetLineItemCalculatedAmounts[0].applyRateFlag"]')
                            .sendKeys('input[id="document.budget.budgetPeriods[0].budgetLineItems[2].budgetLineItemCalculatedAmounts[0].applyRateFlag"]', client.Keys.SPACE)

                            .click('input[name^="methodToCall.calculateSalary.line2"]')
                            .click('input[name="methodToCall.showAllTabs"]')
                            .waitForElementVisible('input[name^="methodToCall.applyToLaterPeriods.line2"]')
                            .sendKeys('input[name^="methodToCall.applyToLaterPeriods.line2"]', client.Keys.ENTER)
                            .pause(1000)
                            // adjusting indirect and fringe since fringe for personnel is complicated
                            .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.summaryTotals"]')
                            .pause(1000)
                            .clearValue('input[name="document.budget.budgetPeriods[0].totalFringeAmount"]')
                            .setValue('input[name="document.budget.budgetPeriods[0].totalFringeAmount"]', '771.00')
                            .clearValue('input[name="document.budget.budgetPeriods[1].totalFringeAmount"]')
                            .setValue('input[name="document.budget.budgetPeriods[1].totalFringeAmount"]', '653.00')
                            .clearValue('input[name="document.budget.budgetPeriods[2].totalFringeAmount"]')
                            .setValue('input[name="document.budget.budgetPeriods[2].totalFringeAmount"]', '653.00')
                            .clearValue('input[name="document.budget.budgetPeriods[3].totalFringeAmount"]')
                            .setValue('input[name="document.budget.budgetPeriods[3].totalFringeAmount"]', '480.25')

                            .clearValue('input[name="document.budget.budgetPeriods[0].totalIndirectCost"]')
                            .setValue('input[name="document.budget.budgetPeriods[0].totalIndirectCost"]', '4229.00')
                            .clearValue('input[name="document.budget.budgetPeriods[1].totalIndirectCost"]')
                            .setValue('input[name="document.budget.budgetPeriods[1].totalIndirectCost"]', '4347.00')
                            .clearValue('input[name="document.budget.budgetPeriods[2].totalIndirectCost"]')
                            .setValue('input[name="document.budget.budgetPeriods[2].totalIndirectCost"]', '4347.00')
                            .clearValue('input[name="document.budget.budgetPeriods[3].totalIndirectCost"]')
                            .setValue('input[name="document.budget.budgetPeriods[3].totalIndirectCost"]', '13686.41')
                            .click('input[name="methodToCall.save"]')
                            .pause(1000)

                            // adjusting indirect and fringe since fringe for personnel is complicated
                            .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.distributionAndIncome"]')
                            .pause(1000)
                            .click('input[name="methodToCall.showAllTabs"]')

                            .clearValue('input[id="document.budget.budgetUnrecoveredFandA[0].sourceAccount"]')
                            .setValue('input[id="document.budget.budgetUnrecoveredFandA[0].sourceAccount"]', '1234')
                            .clearValue('input[id="document.budget.budgetUnrecoveredFandA[0].amount"]')
                            .setValue('input[id="document.budget.budgetUnrecoveredFandA[0].amount"]', '14800.00')

                            .clearValue('input[id="document.budget.budgetUnrecoveredFandA[1].sourceAccount"]')
                            .setValue('input[id="document.budget.budgetUnrecoveredFandA[1].sourceAccount"]', '1234')

                            .clearValue('input[id="document.budget.budgetUnrecoveredFandA[2].sourceAccount"]')
                            .setValue('input[id="document.budget.budgetUnrecoveredFandA[2].sourceAccount"]', '1234')

                            .clearValue('input[id="document.budget.budgetUnrecoveredFandA[3].sourceAccount"]')
                            .setValue('input[id="document.budget.budgetUnrecoveredFandA[3].sourceAccount"]', '1234')

                            .clearValue('input[id="document.budget.budgetUnrecoveredFandA[4].sourceAccount"]')
                            .setValue('input[id="document.budget.budgetUnrecoveredFandA[4].sourceAccount"]', '1234')

                            .clearValue('input[id="document.budget.budgetUnrecoveredFandA[5].sourceAccount"]')
                            .setValue('input[id="document.budget.budgetUnrecoveredFandA[5].sourceAccount"]', '1234')

                            .clearValue('input[id="document.budget.budgetUnrecoveredFandA[6].sourceAccount"]')
                            .setValue('input[id="document.budget.budgetUnrecoveredFandA[6].sourceAccount"]', '1234')

                            .clearValue('input[id="document.budget.budgetUnrecoveredFandA[7].sourceAccount"]')
                            .setValue('input[id="document.budget.budgetUnrecoveredFandA[7].sourceAccount"]', '1234')

                            .click('input[name="methodToCall.headerTab.headerDispatch.save.navigateTo.budgetActions"]')
                            .click('input[name="methodToCall.route"]')
                            .pause(5000)

                            .url(`${client.globals.baseUrl}/kew/DocHandler.do?command=displayDocSearchView&docId=${budgetDocumentNumber}`)


                            .getText('#awardBudgetStatus', function(result) {
                                budgetStatus = result.value
                                console.log("Budget status is " + JSON.stringify(budgetStatus))
                                assert(budgetStatus === "Submitted" || budgetStatus === "To Be Posted")
                            })
                        done()
                    })
                done();
            })
    }
};
