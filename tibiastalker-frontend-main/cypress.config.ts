import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    indexHtmlFile: "cypress/support/component-index.html",
  },

  env: {
    NEXT_TELEMETRY_DISABLED: 1,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
