import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRouter from "./app/router";
import "@digdir/designsystemet-css/index.css";
import "@digdir/designsystemet-theme";
import "./app/i18n";
import "./styles/global-overrides.css";
import "./styles/global-overrides.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <LanguageSelector />
    <AppRouter />
  </Provider>

function LanguageSelector() {
  const langs = [
    { code: "nb", label: "Norsk bokmål" },
    { code: "nn", label: "Nynorsk" },
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "es", label: "Español" }
  ];
  const { i18n } = require("react-i18next");
  return (
    <div style={{ position: "absolute", top: 12, right: 18, zIndex: 99 }}>
      <select value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)} style={{ padding: 4 }}>
        {langs.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </div>
  );
}
);
