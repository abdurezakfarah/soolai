import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,
    proxy: {
      "/api": process.env.VITE_SERVER_BASE_URL!
    },
  },
  root: "./",
  base: "/"
})
