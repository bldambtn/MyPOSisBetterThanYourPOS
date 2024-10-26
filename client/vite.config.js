import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3001, // Dynamically set port
    open: true,
    proxy: {
      "/graphql": {
        target: `http://localhost:${process.env.PORT || 3000}`, // Ensures backend connection
        secure: false,
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
