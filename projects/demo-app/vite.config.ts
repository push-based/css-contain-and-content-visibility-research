import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  publicDir: "public",
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        theory: resolve(__dirname, "pages/theory-demo/index.html"),
        debug: resolve(__dirname, "pages/css-containment-debug/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@css-debug": resolve(__dirname, "pages/css-containment-debug"),
    },
  },
});
