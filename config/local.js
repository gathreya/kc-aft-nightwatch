const BINPATH = './node_modules/nightwatch/bin/'
const getenv = require('getenv')
/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 /the following code checks for the existence of `selenium.jar` before trying to run our tests.
 */
require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      if (error) throw new Error(error) // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH)
    });
  }
});

const nwConfig = {
    src_folders: ["tests"],
    globals_path: 'globals',
    custom_commands_path: "commands",
    page_objects_path: "pages",
    disable_colors: getenv.bool('DISABLE_COLORS', false),
    selenium: {
        start_process: true,
        server_path: "./node_modules/nightwatch/bin/selenium.jar",
        host: "127.0.0.1",
        port: 4444,
        cli_args: {
            "webdriver.chrome.driver" : "./node_modules/nightwatch/bin/chromedriver"
        }
    },
    desiredCapabilities: {
        browserName: "chrome"
    },
    test_settings: {
        default: {
            acceptSslCerts: true,
            silent: true,
            desiredCapabilities: {
                "browserName": "chrome"
            }
        },
        chrome: {
            desiredCapabilities: {
                browserName: "chrome",
                javascriptEnabled: true
            }
        }
    }
}

if (process.env.ONLY_RUN) {
  nwConfig.test_settings.default.filter = `tests/${process.env.ONLY_RUN}`
}

module.exports = nwConfig
