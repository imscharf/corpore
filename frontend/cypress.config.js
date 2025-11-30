const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://corpore.vercel.app/', // URL onde seu React roda
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});