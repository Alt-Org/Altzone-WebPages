import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
      react(),
      svgr({
          // Set it to `true` to export React component as default.
          // Notice that it will overrides the default behavior of Vite.
          exportAsDefault: true,
          //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include. By default all svg files will be included.
          include: '**/*.svg',
      })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

})
