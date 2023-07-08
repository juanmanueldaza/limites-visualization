import { defineConfig } from "vite";

export default defineConfig({
  base: "/limites-visualization/",
  build: {
    assetsDir: "assets",
    rollupOptions: {
      input: "src/main.js",
    },
  },
});
