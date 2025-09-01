import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRouter from "./app/router";
import "@digdir/designsystemet-css/index.css";
import "@digdir/designsystemet-theme";
import "./styles/custom-theme.css";
import "./app/i18n";
import "./styles/global-overrides.css";
import "./styles/global-overrides.css";

import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const langs = [
    { code: "nb", label: "Norsk bokmål" },
    { code: "nn", label: "Nynorsk" },
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "es", label: "Español" }
  ];
  const { i18n } = useTranslation();

  // On mount, set language from localStorage if present
  React.useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div style={{ position: "absolute", top: 12, right: 18, zIndex: 99 }}>
      <select value={i18n.language} onChange={handleChange} style={{ padding: 4 }}>
        {langs.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <LanguageSelector />
    <AppRouter />
  </Provider>
);
// End of file
