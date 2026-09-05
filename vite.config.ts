import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: 'chatRemote',
      filename: 'remoteEntry.js',
      manifest: true,
      dts: false,
      exposes: {
        './ChatWidget': './src/export-remote.ts',
        './Chat': './src/export-remote.ts',
        '.': './src/export-remote.ts',
      },
      shared: {},
    }),
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5002,
    cors: true,
  },
  preview: {
    port: 5002,
    cors: true,
  },
  build: {
    target: 'chrome89',
  },
})
