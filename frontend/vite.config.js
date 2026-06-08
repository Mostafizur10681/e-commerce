import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 0, // auto-select a free port
    strictPort: false, // allow fallback
    open: false,
  },
});
