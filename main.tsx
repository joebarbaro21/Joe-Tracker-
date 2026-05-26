import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Register PWA service worker (vite-plugin-pwa injects this)
import { registerSW } from "virtual:pwa-register";
registerSW({
  onNeedRefresh() {
    // Show update banner — handled inside App via window event
    window.dispatchEvent(new Event("pwa-update-available"));
  },
  onOfflineReady() {
    console.log("[PWA] App ready for offline use");
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
