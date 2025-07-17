import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'extension',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteComponent': './src/RemoteComponent',
      },
      shared: [
        'react',
        'react-dom',
        'react-router',
        'react-i18next',
        'chart.js',
        'quill',
      ],
    }),
  ],
  server: {
    cors: {
      origin: [
        'https://admin.emporix.io',
        'https://dev-admin.emporix.io',
        'https://stage-admin.emporix.io',
        
      ],
      credentials: true,
    },
  },
  preview: {
    cors: {
      origin: [
        'https://admin.emporix.io',
        'https://dev-admin.emporix.io',
        'https://stage-admin.emporix.io',
      ],
      credentials: true,
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
