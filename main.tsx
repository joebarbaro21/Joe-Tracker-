import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// PWA service worker registration (injected by vite-plugin-pwa)
import { registerSW } from "virtual:pwa-register";
registerSW({
  onNeedRefresh() {
    window.dispatchEvent(new Event("pwa-update-available"));
  },
  onOfflineReady() {
    console.log("[PWA] Ready for offline use");
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
