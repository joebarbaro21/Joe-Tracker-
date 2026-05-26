import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Set base to your repo name for GitHub Pages:
//   https://USERNAME.github.io/REPO_NAME/
// Change "fitness-tracker" to your actual repo name.
const BASE = process.env.VITE_BASE ?? "/fitness-tracker/";

export default defineConfig({
  base: BASE,

  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/*.png", "icons/*.svg"],

      manifest: {
        name:             "Fitness Tracker",
        short_name:       "Трекер",
        description:      "Дневник питания и тренировок — body recomposition tracker",
        start_url:        BASE,
        display:          "standalone",
        orientation:      "portrait",
        background_color: "#030712",
        theme_color:      "#030712",
        lang:             "ru",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
          { src: "icons/icon-180.png", sizes: "180x180", type: "image/png", purpose: "any" },
        ],
        shortcuts: [
          { name: "Дневник",   url: BASE + "?tab=0", icons: [{ src: "icons/icon-192.png", sizes: "192x192" }] },
          { name: "Аналитика", url: BASE + "?tab=2", icons: [{ src: "icons/icon-192.png", sizes: "192x192" }] },
        ],
      },

      workbox: {
        // Cache shell + assets
        globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
        // Runtime caching for Google Fonts
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],

  build: {
    target:         "es2020",
    outDir:         "dist",
    sourcemap:      false,
    rollupOptions: {
      output: {
        // Split vendor chunk so app updates don't bust the React cache
        manualChunks: { vendor: ["react", "react-dom"] },
      },
    },
  },
});
