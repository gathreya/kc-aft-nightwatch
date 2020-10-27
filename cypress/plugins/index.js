/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fs = require('fs');
const { saveToS3 } = require('../support/s3')

const checkFileExists = (path, timeLeft = 30000) => {
  const delay = 100
  return new Promise((resolve, reject) => {
    if (timeLeft < 0) {
      return reject(new Error(`File ${path} not found`))
    }
    if (fs.existsSync(path)) {
      return resolve('File exists')
    }
    setTimeout(() => {
      checkFileExists(path, timeLeft - delay).then(resolve, reject)
    }, delay)
  })
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('before:browser:launch', (browser, options) => {
    if (browser.family === 'chromium') {
      options.preferences.default.profile = {
        content_settings: {
          exceptions: {
            automatic_downloads: {
              '*': { setting: 1 }
            }
          }
        },
        default_content_settings: { popups: 0 }
      }

      options.preferences.default['download'] =
      {
        default_directory: '/tmp/',
        prompt_for_download: false
      }

      return options;
    }
  });

  on('task', {
    saveToS3({ sourcePath, destinationPath }) {
      return saveToS3(sourcePath, destinationPath)
    },
    fileExists(path) {
      return checkFileExists(path)
    },
    deleteFile(path, failOnNotExists = false) {
      return new Promise((resolve, reject) => {
        fs.unlink(path, err => {
          if (err && failOnNotExists) reject(`Unable to delete ${path}`)
          resolve(true)
        })
      })
    }
  })
}
