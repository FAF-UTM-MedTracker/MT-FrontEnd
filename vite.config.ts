import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, './')
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // emptyOutDir: true,
    
    rollupOptions: {
      // external:['prop-types'],
      // input: {
      //   main: resolve(root, 'index.html'),
      // }
    }
  }
})
