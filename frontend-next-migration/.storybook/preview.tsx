import type { Preview } from "@storybook/react";
import {I18nextProvider} from "react-i18next";
import i18n from "./mockI18n";
import { Providers } from '../src/app/_providers';
import '../src/app/_styles/index.scss';


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
          <Providers>
          <Story />
          </Providers>
        </I18nextProvider>
    ),
  ],
};

export default preview;
