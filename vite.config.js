
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({ 
  server: {host: '0.0.0.0'},
  base: "https://upbeat-bhaskara.51-91-223-66.plesk.page/",
  plugins: [
    react()
  ],
  define: {
    'process.env': {}
  },
})
