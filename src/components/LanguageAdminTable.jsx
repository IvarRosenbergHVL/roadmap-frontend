import React, { useState } from "react";
import { Button, Table, TableRow, TableCell, TableHead, TableBody, Textfield } from "@digdir/designsystemet-react";
import nb from "../locales/nb.json";
import nn from "../locales/nn.json";
import en from "../locales/en.json";
import de from "../locales/de.json";
import es from "../locales/es.json";

const languages = [
  { code: "nb", label: "Norsk" },
  { code: "nn", label: "Nynorsk" },
  { code: "en", label: "Engelsk" },
  { code: "de", label: "Tysk" },
  { code: "es", label: "Spansk" }
];

const initialTranslations = {
  nb: { ...nb },
  nn: { ...nn },
  en: { ...en },
  de: { ...de },
  es: { ...es }
};

const allKeys = Array.from(
  new Set(
    Object.keys(nb)
      .concat(Object.keys(nn))
      .concat(Object.keys(en))
      .concat(Object.keys(de))
      .concat(Object.keys(es))
  )
);

export default function LanguageAdminTable() {
  const [translations, setTranslations] = useState(initialTranslations);
  const [editing, setEditing] = useState({});

  const handleEdit = (key, lang, value) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: value
      }
    }));
    setEditing((prev) => ({ ...prev, [`${key}_${lang}`]: false }));
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nøkkel</TableCell>
            {languages.map((lang) => (
              <TableCell key={lang.code}>{lang.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {allKeys.map((key) => (
            <TableRow key={key}>
              <TableCell style={{ fontWeight: "bold" }}>{key}</TableCell>
              {languages.map((lang) => (
                <TableCell key={lang.code}>
                  {editing[`${key}_${lang.code}`] ? (
                    <Textfield
                      size="small"
                      value={translations[lang.code][key] || ""}
                      onChange={(e) => handleEdit(key, lang.code, e.target.value)}
                      onBlur={() => setEditing((prev) => ({ ...prev, [`${key}_${lang.code}`]: false }))}
                      autoFocus
                    />
                  ) : (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setEditing((prev) => ({ ...prev, [`${key}_${lang.code}`]: true }))}
                      title={t("languageadmin.editTooltip")}
                    >
                      {translations[lang.code][key] || <span style={{ color: "#888" }}>–</span>}
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ marginTop: 16 }}>
        <Button variant="primary" disabled>
          Lagre endringer (kun frontend-demo)
        </Button>
      </div>
    </div>
  );
}
