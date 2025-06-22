// src/client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist', // サーバー側が読めるように調整（重要！）
    emptyOutDir: true
  }
});
