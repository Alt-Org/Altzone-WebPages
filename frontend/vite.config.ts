import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";
import svgr from 'vite-plugin-svgr';
import i18nextLoader from 'vite-plugin-i18next-loader';


export default defineConfig({

    // base : "http://localhost:3000/",

    plugins: [
      react(),
      svgr({
          // Set it to `true` to export React component as default.
          // Notice that it will overrides the default behavior of Vite.
          exportAsDefault: true,
          //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include. By default all svg files will be included.
          include: '**/*.svg',
      }),
        // i18nextLoader({
        //     include: ['**/*.json'],
        //     paths: ['/locales'],
        //     namespaceResolution: 'basename'
        // })

    ],

  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'),
    },
  },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/app/styles/variables/global.scss";`
            }
        }
    },



})
