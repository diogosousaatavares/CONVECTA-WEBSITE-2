import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    // A divisao em pedacos ("chunks") e so para o site no browser. O build de
    // pre-renderizacao (--ssr) deixa o react e companhia de fora do pacote e
    // nao aceita esta lista.
    rollupOptions: isSsrBuild ? {} : {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
          ],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
}));
