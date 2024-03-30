import { defineConfig } from "cypress";
require('dotenv').config({ path: '.env.local' });

export default defineConfig({

  e2e: {
    setupNodeEvents(on, config) {
      config.env.LOCAL_HOST = process.env.NEXT_PUBLIC_LOCAL_HOST
      config.env.LANGUAGES = {
        en: "en",
        fi: "fi",
        ru: "ru"
      };
      return config
    },
  },
})