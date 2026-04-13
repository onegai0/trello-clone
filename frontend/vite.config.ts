import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_URL ?? 'https://localhost:5254',
        changeOrigin: true,
        secure: false,
      },
    },
  },}
})