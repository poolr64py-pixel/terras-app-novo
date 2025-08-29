import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['./src/components/UI/LanguageSelector', './src/components/UI/WhatsAppButton'],
          contexts: ['./src/contexts/LanguageContext', './src/contexts/PropertiesContext'],
          pages: ['./src/pages/HomePage', './src/pages/PropertiesPage', './src/pages/ServicesPage']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5173,
    open: true
  }
})