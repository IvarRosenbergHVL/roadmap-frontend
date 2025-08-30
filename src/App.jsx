

import React from "react";
import AppList from "./components/AppList";

export default function App() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--ds-color-surface-subtle)",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        maxWidth: 480,
        padding: "2rem",
        background: "var(--ds-color-surface-default)",
        borderRadius: "1rem",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
          color: "var(--ds-color-text-default)"
        }}>Roadmap</h1>
        <p style={{
          fontSize: "1.15rem",
          color: "var(--ds-color-text-subtle)",
          marginBottom: "2rem"
        }}>
          Se status og funksjonsønsker for alle apper. Velg en app for å se detaljer og bidra med nye forslag!
        </p>
        <AppList />
      </div>
    </main>
  );
}
