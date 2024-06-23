import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom'
  },
  jest: {
    setupFiles: ["jest-canvas-mock"]
  }
})