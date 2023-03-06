import { addDecorator } from "@storybook/react";
import { withThemes } from "storybook-addon-themes";
import { RouterDecorator } from "./__mocks__/RouterDecorator";
import "../../src/app/styles/index.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: "light",
    list: [
      { name: "light", class: ["app", "app_light_theme"], color: "#bda692" },
      { name: "dark", class: ["app", "app_dark_theme"], color: "#111110" },
    ],
  },

};

addDecorator(withThemes);
// addDecorator(TranslationDecorator);
addDecorator(RouterDecorator);
