const browserstack = require('browserstack-local')
const nightwatch = require('nightwatch')
const config = require('config')

const log = message => console.log(`[LOCAL RUNNER] ${message}`)
const noop = () => {}

try {
  process.mainModule.filename = './node_modules/nightwatch/bin/nightwatch'

  const local = new browserstack.Local()
  const opts = {
    force: 'true',
    forceLocal: 'true',
    key: config.get('browserstack.accessKey')
  }

  nightwatch.local = local

  log('Connecting using Browserstack local')

  local.start(opts, function (err) {
    if (err) throw err
    log('Connected. Now Testing...')

    nightwatch.cli(function (argv) {
      nightwatch
        .CliRunner(argv)
        .setup(() => local.stop(noop))
        .runTests(() => local.stop(noop))
    })
  })
} catch (err) {
  log('Error starting the test runner')
  process.stderr.write(err.stack + '\n')
  process.exit(2)
}
