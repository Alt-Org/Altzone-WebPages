import type { Preview } from "@storybook/react";
import {I18nextProvider} from "react-i18next";
import i18n from "./mockI18n";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
    ),
  ],
};

export default preview;
