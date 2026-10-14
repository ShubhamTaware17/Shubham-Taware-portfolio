import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Three.js is only imported by the lazy-loaded hero scene, so Vite splits it
// into its own chunk and it never blocks the first paint.
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
  },
});
