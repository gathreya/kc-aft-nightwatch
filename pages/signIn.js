/* Copyright © 2005-2017 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

const authCommands = {
  authenticate () {
    const page = this
    const browser = this.api

    page
      .waitForElementVisible('@submit')
      .setValue('@username', 'quickstart')
      .setValue('@password', 'password')
      .click('@submit')

    browser.pause(2000)

    return this
  }
}

module.exports = {
  commands: [authCommands],

  elements: {
    username: 'input[data-test="username"]',
    password: 'input[data-test="password"]',
    submit: 'button[data-test="login"]'
  },

  url () {
    return `${this.api.globals.baseUrl}`
  }
}
