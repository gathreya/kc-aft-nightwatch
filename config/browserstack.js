/* Copyright © 2005-2017 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

require('dotenv').config()

const getenv = require('getenv')
const pkg = require('../package')

module.exports = {
  browserstack: {
    buildId: pkg.version,
    username: getenv.string('BROWSERSTACK_USERNAME'),
    accessKey: getenv.string('BROWSERSTACK_ACCESS_KEY'),
    project: `Research Admin: ${getenv.string('NODE_ENV')}`
  },
  nightwatch: {
    baseUrl: getenv.string(
      'NIGHTWATCH_BASE_URL',
      'https://res-tst1.kuali.co'
    ),
    debug: getenv.bool('NIGHTWATCH_DEBUG', false),
    local: getenv.bool('NIGHTWATCH_LOCAL', false),
    runInParallel: getenv.bool('NIGHTWATCH_RUN_IN_PARALLEL', false)
  }
}
