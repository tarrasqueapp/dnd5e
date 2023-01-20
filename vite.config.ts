import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: path.resolve('src', 'index.ts'),
      name: 'TarrasqueD&D5ePlugin',
      fileName: (format) => `tarrasque-dnd5e-plugin.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@emotion/react', '@emotion/styled', '@mui/material'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
