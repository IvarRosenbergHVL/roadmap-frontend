
import nb from '../locales/nb.json';
import nn from '../locales/nn.json';
import en from '../locales/en.json';
import de from '../locales/de.json';
import es from '../locales/es.json';

const resources = {
  nb: { translation: nb },
  nn: { translation: nn },
  en: { translation: en },
  de: { translation: de },
  es: { translation: es }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "nb",
    fallbackLng: ["en", "nb"],
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
