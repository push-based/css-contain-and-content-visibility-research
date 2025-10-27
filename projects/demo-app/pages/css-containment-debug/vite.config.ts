export default {
  root: ".",
  publicDir: "public",
  server: {
    port: 3001,
    open: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "dist",
  },
};
