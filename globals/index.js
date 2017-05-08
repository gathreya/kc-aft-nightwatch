const config = require('config')

module.exports = {
  baseUrl: config.get('nightwatch.baseUrl'),

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
