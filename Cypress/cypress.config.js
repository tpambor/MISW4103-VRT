const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  scrollBehavior: 'center',
  e2e: {
    baseUrl: 'http://localhost:2368',
    env: {
      username: 'pedro.rulfo@example.org',
      password: '0123456789+',
      fullName: 'Pedro Rulfo',
      blogTitle: 'Mi blog de literatura'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
