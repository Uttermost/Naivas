import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Base path matches the GitHub Pages project site URL (/<repo-name>/)
export default defineConfig({
  plugins: [react()],
  base: '/Naivas/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        rewards: resolve(__dirname, 'rewards/index.html'),
        online: resolve(__dirname, 'online/index.html'),
        delivery: resolve(__dirname, 'delivery/index.html'),
        opsDashboard: resolve(__dirname, 'ops-dashboard/index.html'),
      },
    },
  },
})
