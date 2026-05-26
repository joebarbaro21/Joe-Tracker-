import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/Joe-Tracker-/",

  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Joe Tracker",
        short_name: "Трекер",
        start_url: "/Joe-Tracker-/",
        display: "standalone",
        background_color: "#030712",
        theme_color: "#030712",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,woff2}"]
      }
    })
  ],

  build: {
    outDir: "dist",
    rollupOptions: {
      output: { manualChunks: { vendor: ["react", "react-dom"] } }
    }
  }
});
