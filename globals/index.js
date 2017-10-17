require('dotenv').config()
const getenv = require('getenv')

module.exports = {
  baseUrl: getenv.string('NIGHTWATCH_BASE_URL'),
  waitForConditionTimeout: 10000,

  users: {
    admin: {
      username: 'coiadmin',
      password: 'password'
    },

    cate: {
      username: 'cate',
      password: 'password'
    },

    reviewer: {
      username: 'coireviewer',
      password: 'password'
    }
  }
}
