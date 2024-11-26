import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://ww2.lu",
        changeOrigin: true,
      },
    },
  },

  plugins: [react()],
  assetsInclude: ['**/*.gltf', '**/*.glb'],
  define: {
    "process.env": {},
  },
});
