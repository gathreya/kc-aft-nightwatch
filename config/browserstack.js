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

const SELENIUM_HOST = 'hub-cloud.browserstack.com'
const SELENIUM_PORT = 80

function buildTestEnv (capabilities = {}) {
  return {
    acceptSslCerts: true,
    desiredCapabilities: Object.assign(
      {
        build: pkg.version,
        'browserstack.user': getenv.string('BROWSERSTACK_USERNAME'),
        'browserstack.key': getenv.string('BROWSERSTACK_ACCESS_KEY'),
        'browserstack.debug': getenv.bool('NIGHTWATCH_DEBUG', false),
        javascriptEnabled: true,
        project: `Research Admin: ${getenv.string('NODE_ENV')}`
      },
      capabilities
    ),
    end_session_on_fail: false,
    launch_url: 'http://hub.browserstack',
    selenium_host: SELENIUM_HOST,
    selenium_port: SELENIUM_PORT,
    skip_testcases_on_fail: false,
    resolution: '1280x1024'
  }
}

const nwConfig = {
  src_folders: ['tests'],
  output_folder: 'reports',

  globals_path: 'globals',
  page_objects_path: 'pages',
  custom_commands_path: 'commands',
  custom_assertions_path: 'assertions',
  disable_colors: getenv.bool('DISABLE_COLORS', false),

  selenium: {
    start_process: false,
    server_path: './node_modules/nightwatch/bin/selenium.jar',
    host: SELENIUM_HOST,
    port: SELENIUM_PORT,
  },

  test_workers: getenv.bool('NIGHTWATCH_RUN_IN_PARALLEL', false),

  test_settings: {
    default: buildTestEnv({ browser: 'chrome', platform: 'MAC' }),

    chrome: buildTestEnv({ browser: 'chrome' }),
    edge: buildTestEnv({ browser: 'edge' }),
    firefox: buildTestEnv({ browser: 'firefox' }),
    ie: buildTestEnv({ browser: 'IE' }),
    ipad: buildTestEnv({
      device: 'iPad Air',
      os: 'ios',
      os_version: '8.3',
      browser: 'iPhone',
      deviceOrientation: 'landscape'
    }),
    safari: buildTestEnv({ browser: 'safari', browser_version: '10' })
  }
}

if (process.env.ONLY_RUN) {
  nwConfig.test_settings.default.filter = `tests/${process.env.ONLY_RUN}`
}

module.exports = nwConfig
