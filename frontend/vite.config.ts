import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      // Proxy uploads to backend so editor image previews work in dev
      '/uploads': 'http://localhost:3000'
    }
  }
});
