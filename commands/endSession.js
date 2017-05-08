/* Copyright © 2005-2017 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

const config = require('config')
const request = require('superagent')

function buildBrowserstackURI (username, accessKey, sessionId) {
  return `https://${username}:${accessKey}@www.browserstack.com/automate/sessions/${sessionId}.json`
}

exports.command = function () {
  const browser = this
  const hasErrors = browser.currentTest.results.failed > 0

  this.perform(done => {
    const browserstackURI = buildBrowserstackURI(
      config.get('browserstack.username'),
      config.get('browserstack.accessKey'),
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
