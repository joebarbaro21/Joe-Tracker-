import { useEffect, useState } from "react";
import Tracker from "./Tracker";
import { getLogs, saveLogs, addLog } from "./lib/supabase";

export default function App() {
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    const handler = () => setUpdateReady(true);
    window.addEventListener("pwa-update-available", handler);
    return () => window.removeEventListener("pwa-update-available", handler);
  }, []);

  return (
    <>
      {updateReady && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 16px",
          background: "#0d0d0d", borderBottom: "1px solid #1a1a1a",
        }}>
          <span style={{ flex: 1, fontSize: 13, color: "#9ca3af" }}>
            🔄 Доступна новая версия
          </span>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "6px 14px", borderRadius: 8,
              background: "#60a5fa", color: "#000",
              border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}
          >
            Обновить
          </button>
        </div>
      )}

      {/*
        Supabase helpers passed as props so Tracker stays
        storage-agnostic and testable without a live DB.
      */}
      <Tracker
        onCloudLoad={getLogs}
        onCloudSave={saveLogs}
        onCloudLogUpdate={addLog}
      />
    </>
  );
}
