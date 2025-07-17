import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/shiguemori.github.io/',
  plugins: [react()],
});
