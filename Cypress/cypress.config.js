const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:2368',
    env: {
      username: 'pedro.rulfo@example.org',
      password: '0123456789+'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
