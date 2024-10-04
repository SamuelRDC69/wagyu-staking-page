import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enable source maps for easier debugging
    chunkSizeWarningLimit: 500, // Adjust chunk size limit if needed
    rollupOptions: {
      output: {
        manualChunks(id) {
          // This is optional and allows you to break large chunks into smaller ones
          if (id.includes('node_modules')) {
            return 'vendor'; // Move vendor files to a separate chunk
          }
        },
      },
    },
  },
})
