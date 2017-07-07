/* Copyright © 2005-2017 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

const request = require('superagent')
const getenv = require('getenv')

function buildBrowserstackURI (username, accessKey, sessionId) {
  return `https://${username}:${accessKey}@www.browserstack.com/automate/sessions/${sessionId}.json`
}

exports.command = function () {
  const browser = this
  const hasErrors = browser.currentTest.results.failed > 0

  this.perform(done => {
    const browserstackURI = buildBrowserstackURI(
        getenv.string('BROWSERSTACK_USERNAME'),
        getenv.string('BROWSERSTACK_ACCESS_KEY'),
      browser.sessionId
    )

    return request
      .put(browserstackURI)
      .send({
        status: !hasErrors ? 'completed' : 'error',
        reason: ''
      })
      .end(function (err, res) {
        if (err) console.error('Browserstack status request failed', err)

        browser.end()
        if (typeof done === 'function') done.call(this)
      })
  })

  return this
}
