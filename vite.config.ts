// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // todo lo que empiece con /api se redirige a tu backend
      "/api": {
        target: "http://localhost:3000", // <-- cambia al puerto de tu NestJS
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      "a95b-2802-8010-9906-3f01-d983-5dc9-cdab-f199.ngrok-free.app",
    ],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
