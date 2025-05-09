import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: './',
  publicDir: "public",
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "@": "/src",
    }
  },
});
