const assert = require('assert');

const attachmentFile = process.env.SAMPLE_PDF || '/Users/test1/Documents/documents/pdf-sample1.pdf'

module.exports = {
    '@tags': ['proposalDevelopment', 'smokeTests'],
    '@disabled': false,
    after: client => {
        client.end()
    },

    'PD test' : function (client) {
      let documentNumber
      let documentStatus
        client
            .url(`${client.globals.baseUrl}/`)
            .login()
            .pause(1000)
            .useXpath()     // every selector now must be XPath
            .click("//*[contains(text(), 'RESEARCHER')]")
            .click("//*[contains(text(), 'Create Proposal')]")
            .useCss()

            //detailsPage
            .click('select[name="document.developmentProposal.proposalTypeCode"] option[value="1"]')
            .execute(`document.querySelector('select[name="document.developmentProposal.ownedByUnitNumber"] option[value="IN-CARD"]').selected = true`)
            .execute(`document.querySelector('#uk9itv5_control').value='000340'`)

            .click('select[name="document.developmentProposal.activityTypeCode"] option[value="4"]')

            .setValue('input[name="document.developmentProposal.requestedStartDateInitial"]', '04/01/2017')
            .setValue('input[name="document.developmentProposal.requestedEndDateInitial"]', '04/30/2017')
            .setValue('textArea[name="document.developmentProposal.title"]', 'Test Nightwatch AFT')
            // continue button
            .click('button[id=ufuknm4]')
            .waitForElementVisible('#PropDev-Menu > ul > li.active > a')
            .click('#PropDev-Menu > ul > li.active > a')
            // data validation
            .execute(`document.querySelector('#u19btjw4').click()`)
            .waitForElementVisible('button[id=u3m9tmm]')
            // turn on validation
            .execute(`document.querySelector('button[id=u3m9tmm]').click()`)
            .waitForElementVisible('#ubneuwx_line3')
            // supplemental section error link and fill out
            .execute(`document.querySelector('#ubneuwx_line3').click()`)
            .waitForElementVisible('input[id="AdditionalData_BillingElement_control"]')
            .setValue('input[id="AdditionalData_BillingElement_control"]', '23')
            .waitForElementVisible('#u1iquhuk_Personnel_Items_for_Review_tab')
            .execute(`document.querySelector('#u1iquhuk_Personnel_Items_for_Review_tab').click()`)
            .waitForElementVisible('input[id="PersonnelItemsforReview_GraduateStudentCount_control"]')
            .setValue('input[id="PersonnelItemsforReview_GraduateStudentCount_control"]', '5')
            // click save
            .click('#uzko2r3')
            .waitForElementVisible('#u19btjw4')
            // click on data validation
            .execute(`document.querySelector('#u19btjw4').click()`)
            .waitForElementVisible('#ubneuwx_line1')
            // follow key personnel link
            .execute(`document.querySelector('#ubneuwx_line1').click()`)
            // add person button
            .waitForElementVisible('button[id=u18fzd9v]')
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .click('button[id=u18fzd9v]')
            .waitForElementVisible('input[type="text"][id="uxa59ej_control"]')
            .setValue('input[type="text"][id="uxa59ej_control"]', 'aemcafee')
            //search
            .click('button[id=u9iouos]')
            .waitForElementVisible('#uouorvl_line0_control_0')
            .click('#uouorvl_line0_control_0')
            // clicking continue after selection
            .click('button[id=u1s266pn]')
            // add person
            .waitForElementVisible('button[id=u1bkjgre]')
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .click('button[id=u1bkjgre]')
            // add second person
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('button[id=u18fzd9v]')
            .click('button[id=u18fzd9v]')
            .waitForElementVisible('input[type="text"][id="uxa59ej_control"]')
            .setValue('input[type="text"][id="uxa59ej_control"]', 'cbernal')
            //search
            .click('button[id=u9iouos]')
            //select
            .waitForElementVisible('#uouorvl_line0_control_0')
            .click('#uouorvl_line0_control_0')
            // clicking continue after selection
            .click('button[id=u1s266pn]')
            // select coi
            .waitForElementVisible('#PropDev-PersonnelPage-WizardPage3-personRoleRadio_control_1')
            .click('#PropDev-PersonnelPage-WizardPage3-personRoleRadio_control_1')
            // add person
            .click('button[id=u1bkjgre]')
            // eraCommons
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('#u13t9vqj_line0_toggle')
            .execute(`document.querySelector('#u13t9vqj_line0_toggle').click()`)
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('input[type="text"][name="document.developmentProposal.proposalPersons[0].eraCommonsUserName"]', 5000)
            .setValue('input[type="text"][name="document.developmentProposal.proposalPersons[0].eraCommonsUserName"]', 'aemcafee')
            //fill certification
            // go to cert tab
            .execute(`document.querySelector('#personnelQuestionnaire_line0_tab').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line0_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line0_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line1_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line1_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line2_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line2_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line3_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line3_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line4_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line4_line0_control_0').click()`)

            .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line5_line0_control_0', 10000)
            .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line5_line0_control_0').click()`)

            // close pi details
            .execute(`document.querySelector('#u13t9vqj_line0_toggle').click()`)

            // credit allocation
            .execute(`document.querySelector('#u3s0ek4').click()`)
            .waitForElementVisible('input[name="creditSplitListItems[0].creditSplits[0].credit"]')
            //aemcafee credits
            .clearValue('input[name="creditSplitListItems[0].creditSplits[0].credit"]')
            .setValue('input[name="creditSplitListItems[0].creditSplits[0].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[0].creditSplits[1].credit"]')
            .setValue('input[name="creditSplitListItems[0].creditSplits[1].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[0].creditSplits[2].credit"]')
            .setValue('input[name="creditSplitListItems[0].creditSplits[2].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[0].creditSplits[3].credit"]')
            .setValue('input[name="creditSplitListItems[0].creditSplits[3].credit"]', '50.00')

            //000001 - University credits
            .clearValue('input[name="creditSplitListItems[1].creditSplits[0].credit"]')
            .setValue('input[name="creditSplitListItems[1].creditSplits[0].credit"]', '0.00')

            .clearValue('input[name="creditSplitListItems[1].creditSplits[1].credit"]')
            .setValue('input[name="creditSplitListItems[1].creditSplits[1].credit"]', '0.00')

            .clearValue('input[name="creditSplitListItems[1].creditSplits[2].credit"]')
            .setValue('input[name="creditSplitListItems[1].creditSplits[2].credit"]', '0.00')

            .clearValue('input[name="creditSplitListItems[1].creditSplits[3].credit"]')
            .setValue('input[name="creditSplitListItems[1].creditSplits[3].credit"]', '0.00')

            //BL-BL - Princeton CAMPUS credits
            .clearValue('input[name="creditSplitListItems[2].creditSplits[0].credit"]')
            .setValue('input[name="creditSplitListItems[2].creditSplits[0].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[2].creditSplits[1].credit"]')
            .setValue('input[name="creditSplitListItems[2].creditSplits[1].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[2].creditSplits[2].credit"]')
            .setValue('input[name="creditSplitListItems[2].creditSplits[2].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[2].creditSplits[3].credit"]')
            .setValue('input[name="creditSplitListItems[2].creditSplits[3].credit"]', '100.00')


            // CONCETTA BERNAL credit split
            .clearValue('input[name="creditSplitListItems[4].creditSplits[0].credit"]')
            .setValue('input[name="creditSplitListItems[4].creditSplits[0].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[4].creditSplits[1].credit"]')
            .setValue('input[name="creditSplitListItems[4].creditSplits[1].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[4].creditSplits[2].credit"]')
            .setValue('input[name="creditSplitListItems[4].creditSplits[2].credit"]', '50.00')

            .clearValue('input[name="creditSplitListItems[4].creditSplits[3].credit"]')
            .setValue('input[name="creditSplitListItems[4].creditSplits[3].credit"]', '50.00')

            // CONCETTA BERNAL 000001 - University credit split
            .clearValue('input[name="creditSplitListItems[5].creditSplits[0].credit"]')
            .setValue('input[name="creditSplitListItems[5].creditSplits[0].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[5].creditSplits[1].credit"]')
            .setValue('input[name="creditSplitListItems[5].creditSplits[1].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[5].creditSplits[2].credit"]')
            .setValue('input[name="creditSplitListItems[5].creditSplits[2].credit"]', '100.00')

            .clearValue('input[name="creditSplitListItems[5].creditSplits[3].credit"]')
            .setValue('input[name="creditSplitListItems[5].creditSplits[3].credit"]', '100.00')

            //save
            .click('#uz1wa5n')
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('#PropDev-Menu > ul > li:nth-child(1) > a')
            .execute(`document.querySelector('#PropDev-Menu > ul > li:nth-child(1) > a').click()`)
            // s2s page
            .waitForElementVisible('#ua6f5f')
            .execute(`document.querySelector('#ua6f5f').click()`)
            // add opportunity
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('button[id="udi4ayd_quickfinder_act"]')
            .click('button[id="udi4ayd_quickfinder_act"]')
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .frame('uzdraaz')
            .waitForElementVisible('select[id="u19le2rl_control"]')
            .execute(`document.querySelector('select[id="u19le2rl_control"]').value='1'`)
            .execute(`document.querySelector('#u19le2tb_control').value='PA-C-R01'`)
            .execute(`document.querySelector('#ufuknop').click()`)
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('#u1ywkycz_line0')
            .execute(`document.querySelector('#u1ywkycz_line0').click()`)

            // questionnaire
            // click on data validation
            .execute(`document.querySelector('#u19btjw4').click()`)
            // PHS questionnaire
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('#ubneuwx_line5')
            .execute(`document.querySelector('#ubneuwx_line5').click()`)
            // answer questions
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('#u1xg9194_line0_line0_control_1')
            .execute(`document.querySelector('#u1xg9194_line0_line0_control_1').click()`)

            .waitForElementVisible('#u1xg9194_line0_line0_control_1')
            .execute(`document.querySelector('#u1xg9194_line0_line2_control_1').click()`)
            .waitForElementVisible('#u1xg9194_line0_line6_control_1')
            .execute(`document.querySelector('#u1xg9194_line0_line6_control_1').click()`)
            .waitForElementVisible('#u1xg9194_line0_line9_control_1')
            .execute(`document.querySelector('#u1xg9194_line0_line9_control_1').click()`)
            .waitForElementVisible('#u1xg9194_line0_line12_control_1')
            .execute(`document.querySelector('#u1xg9194_line0_line12_control_1').click()`)
            .waitForElementVisible('#u1xg9194_line0_line14_control_1')
            .execute(`document.querySelector('#u1xg9194_line0_line14_control_1').click()`)
            // s2s questionnaire
            .execute(`document.querySelector('#PropDev-QuestionnairePage-GrantsgovS2SQuestionnaire_tab').click()`)
            .waitForElementNotPresent('.blockUI.blockOverlay')

            //fill answers
            .waitForElementVisible('#uqjpr13_line0_line53_control_1')
            .execute(`document.querySelector('#uqjpr13_line0_line53_control_1').click()`)
            .waitForElementVisible('#uqjpr13_line0_line54_control_1')
            .execute(`document.querySelector('#uqjpr13_line0_line54_control_1').click()`)
            .waitForElementVisible('#uqjpr13_line0_line58_control_1')
            .execute(`document.querySelector('#uqjpr13_line0_line58_control_1').click()`)
            .waitForElementVisible('#uqjpr13_line0_line60_control_1')
            .execute(`document.querySelector('#uqjpr13_line0_line60_control_1').click()`)
            .waitForElementVisible('#uqjpr13_line0_line63_control_1')
            .execute(`document.querySelector('#uqjpr13_line0_line63_control_1').click()`)
            .waitForElementVisible('#uqjpr13_line0_line66_control_1')
            .execute(`document.querySelector('#uqjpr13_line0_line66_control_1').click()`)
            .execute(`document.querySelector('select[name="questionnaireHelper.answerHeaders[0].questions[70].answers[0].answer"]').value='Not Covered'
"Not Covered"`)

            //save
            .click('button[id=udhoe1a]')

            // navigate to attachments page
            .waitForElementVisible('#u79gej4')
            .execute(`document.querySelector('#u79gej4').click()`)
            //click add
            .waitForElementVisible('#ua9nlo4')
            .execute(`document.querySelector('#ua9nlo4').click()`)
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('#uk8qcpq_control')
            .setValue('input[type="file"]', require('path').resolve(attachmentFile))
            // close out
            .click('button[id=u1rb81qh]')
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('select[id="u8pwnkp_line0_control"]')
            .pause(2000)
            .execute(`document.querySelector('select[id="u8pwnkp_line0_control"]').value='111'`)
            .execute(`document.querySelector('select[id="u8pwnlk_line0_control"]').value='C'`)
            .pause(500)

            .execute(`document.querySelector('#ua9nlo4').click()`)
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('#uk8qcpq_control')
            .setValue('input[type="file"]', require('path').resolve(attachmentFile))
            //close out
            .click('button[id=u1rb81qh]')
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('select[id="u8pwnkp_line0_control"]')
            .pause(2000)
            .execute(`document.querySelector('select[id="u8pwnkp_line0_control"]').value='1'`)
            .execute(`document.querySelector('select[id="u8pwnlk_line0_control"]').value='C'`)
            .pause(500)

            .execute(`document.querySelector('#ua9nlo4').click()`)
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('#uk8qcpq_control')
            .setValue('input[type="file"]', require('path').resolve(attachmentFile))
            //close out
            .click('button[id=u1rb81qh]')
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .waitForElementVisible('select[id="u8pwnkp_line0_control"]')
            .pause(2000)
            .execute(`document.querySelector('select[id="u8pwnkp_line0_control"]').value='5'`)
            .execute(`document.querySelector('select[id="u8pwnlk_line0_control"]').value='C'`)
            .pause(500)
            .click('button[id=utzb3zj]')
            //summary submit page
            .waitForElementVisible('#u79genf')
            .execute(`document.querySelector('#u79genf').click()`)
            .waitForElementVisible('#uj31ctp')
            .waitForElementNotPresent('.blockUI.blockOverlay')
            .execute(`document.querySelector('#uj31ctp').click()`)

            //.end();
            // doc number div
            .getText('#u7lh763', function(result) {
                  documentNumber = result.value
                  console.log(documentNumber)
            })
            .perform(function(client, done) {
                  client
                  //submit with warnings
                  .waitForElementVisible('#u1gno7ha')
                  .waitForElementNotPresent('.blockUI.blockOverlay')
                  .execute(`document.querySelector('#u1gno7ha').click()`)
                  .waitForElementVisible('#u1aynkz7')
                  .waitForElementNotPresent('.blockUI.blockOverlay')
                  .execute(`document.querySelector('#u1aynkz7').click()`)
                  .waitForElementNotPresent('.blockUI.blockOverlay')
                  // wait for workflow
                  // logout, login as shields and approves
                  .url(`${client.globals.baseUrl}/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  // wait for workflow
                  .pause(2000)
                  .url(`${client.globals.baseUrl}/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)

                  .waitForElementVisible('input[data-test="username"]')
                  .maximizeWindow()
                  .setValue('input[data-test="username"]', 'shields')
                  .setValue('input[data-test="password"]', 'password')
                  .click('button[data-test="login"]')

                  .waitForElementVisible('button[id=uj31cvf]')
                  .waitForElementNotPresent('.blockUI.blockOverlay')
                  .click('button[id=uj31cvf]')
                  .waitForElementVisible('#u1aynkyc')
                  .waitForElementNotPresent('.blockUI.blockOverlay')
                  .click('#u1aynkyc')
                  .waitForElementNotPresent('.blockUI.blockOverlay')


                  // logout, login as aemcafee and approves
                  .url(`${client.globals.baseUrl}/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  .pause(2000)
                  .url(`${client.globals.baseUrl}/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)

                   .waitForElementVisible('input[data-test="username"]', 1000)
                  .maximizeWindow()
                  .setValue('input[data-test="username"]', 'aemcafee')
                  .setValue('input[data-test="password"]', 'password')
                  .click('button[data-test="login"]')
                  .waitForElementVisible('button[id=uj31cvf]')
                  //approve
                  .waitForElementNotPresent('.blockUI.blockOverlay')
                  .click('button[id=uj31cvf]')
                  .waitForElementNotPresent('.blockUI.blockOverlay')

                  //approve as cbernal
                  .url(`${client.globals.baseUrl}/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  .pause(2000)
                  .url(`${client.globals.baseUrl}/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)

                  .waitForElementVisible('input[data-test="username"]', 1000)
                  .maximizeWindow()
                  .setValue('input[data-test="username"]', 'cbernal')
                  .setValue('input[data-test="password"]', 'password')
                  .click('button[data-test="login"]')

                  .waitForElementVisible('button[id=uj31cvf]')

                  //navigate to cert pages
                  .execute(`document.querySelector('#PropDev-Menu > ul > li:nth-child(2) > a').click()`)
                  .waitForElementNotPresent('.blockUI.blockOverlay')
                  .execute(`document.querySelector('#u3s0ej9').click()`)
                  .waitForElementNotPresent('.blockUI.blockOverlay')

                  // cbernal certification
                  .waitForElementVisible('#u13t9vqj_line1_toggle_col', 1000)
                  .execute(`document.querySelector('#u13t9vqj_line1_toggle_col').click()`)
                  .waitForElementVisible('#personnelQuestionnaire_line1_tab')
                  .execute(`document.querySelector('#personnelQuestionnaire_line1_tab').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line0_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line0_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line1_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line1_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line2_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line2_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line3_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line3_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line4_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line4_line1_control_0').click()`)

                  .waitForElementVisible('#proposalPersonQuestionnaire-InputField_line0_line5_line1_control_0', 10000)
                  .execute(`document.querySelector('#proposalPersonQuestionnaire-InputField_line0_line5_line1_control_0').click()`)

                  // save
                  .execute(`document.querySelector('#u8f37v6').click()`)

                  //back to submit page
                  .waitForElementVisible('#u79genf')
                  .execute(`document.querySelector('#u79genf').click()`)
                  //approve

                  .waitForElementVisible('button[id=uj31cvf]')
                  .waitForElementNotPresent('.blockUI.blockOverlay')
                  .click('button[id=uj31cvf]')
                  .waitForElementNotPresent('.blockUI.blockOverlay')

                  // quickstart approves
                  .url(`${client.globals.baseUrl}/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  .pause(2000)
                  .url(`${client.globals.baseUrl}/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)

                  .waitForElementVisible('input[data-test="username"]', 1000)
                  .maximizeWindow()
                  .setValue('input[data-test="username"]', 'quickstart')
                  .setValue('input[data-test="password"]', 'password')
                  .click('button[data-test="login"]')

                  //approve
                  .waitForElementVisible('button[id=uj31cvf]')
                  .waitForElementNotPresent('.blockUI.blockOverlay')
                  .click('button[id=uj31cvf]')
                  .waitForElementNotPresent('.blockUI.blockOverlay')

                  //logout
                  .url(`${client.globals.baseUrl}/kc-krad/landingPage?viewId=Kc-LandingPage-DefaultView&methodToCall=logout`)
                  .pause(2000)
                  .url(`${client.globals.baseUrl}/kew/DocHandler.do?command=displayDocSearchView&docId=${documentNumber}`)
                  //login as quickstart to check status

                  .waitForElementVisible('input[data-test="username"]', 1000)
                  .setValue('input[data-test="username"]', 'quickstart')
                  .setValue('input[data-test="password"]', 'password')
                  .click('button[data-test="login"]')
                  .waitForElementNotPresent('.blockUI.blockOverlay')
                  .waitForElementVisible('#u1wvlcrs', 5000)
                  .getText('#u1wvlcrs', function(result) {
                        documentStatus = result.value
                  })
                  .perform(function(client, done2) {
                        console.log('status is ' + JSON.stringify(documentStatus))
                        assert(documentStatus === "Approval Granted")
                        done2()
                        done()
                  })
            })
      }
};
