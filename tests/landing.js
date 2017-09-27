const assert = require('assert')
let page;

module.exports = {
    '@disabled': false,

    before: client => {
        page = client.page.landing()
        page
            .navigate()
            .authenticate('quickstart')

    },

    after: client => {
        client.end()
    },

    "login 'quickstart' test": client => {
        page.assert.elementPresent("h1[id=Kc-LandingPage-DefaultView_header]")
    },

    "unitDropdown test": client => {
        page.assert.elementPresent('@unitDropdown')
    },

    "newAward button test": client => {
        page.assert.elementPresent('@newAward')
    },

    "navigate to newAward test": client => {
        let award = page.toNewAward()
        assert(award)
    }
}
