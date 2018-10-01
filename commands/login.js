/* Copyright © 2005-2018 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

const getenv = require('getenv')

exports.command = function () {
  const username = getenv.string('LOGIN_USER', 'quickstart')
  const password = getenv.string('LOGIN_PASSWORD', 'password')

  if (getenv.bool('USE_CORE_AUTH', true)) {
    this
      .waitForElementVisible('input[data-test="username"]')
      .maximizeWindow()
      .setValue('input[data-test="username"]', username)
      .setValue('input[data-test="password"]', password)
      .click('button[data-test="login"]')
  } else {
    this
      .waitForElementVisible('input#Rice-UserName_control')
      .maximizeWindow()
      .setValue('input#Rice-UserName_control', username)
      .click('button#Rice-LoginButton')
  }

  return this
}
