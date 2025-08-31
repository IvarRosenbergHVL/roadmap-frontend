import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  nb: {
    translation: {
      "Roadmap": "Roadmap",
      "Ny funksjon": "Ny funksjon",
      "Rediger funksjon": "Rediger funksjon",
      "Tittel": "Tittel",
      "Beskrivelse": "Beskrivelse",
      "Utfyllende beskrivelse": "Utfyllende beskrivelse",
      "Velg kategori": "Velg kategori",
      "Tags (kommaseparert)": "Tags (kommaseparert)",
      "Vedlegg (filnavn eller URL)": "Vedlegg (filnavn eller URL)",
      "Prioritet": "Prioritet",
      "Antall stemmer": "Antall stemmer",
      "Sorteringsrekkefølge": "Sorteringsrekkefølge",
      "Privat funksjon (kun synlig for admin)": "Privat funksjon (kun synlig for admin)",
      "Arkivert (skjules fra roadmap)": "Arkivert (skjules fra roadmap)",
      "Bruker-ID (valgfritt)": "Bruker-ID (valgfritt)",
      "Lagre endringer": "Lagre endringer",
      "Opprett funksjon": "Opprett funksjon",
      "Avbryt": "Avbryt",
      "Ingen (hovedfunksjon)": "Ingen (hovedfunksjon)",
      "Velg versjon/status": "Velg versjon/status",
      "Funksjon oppdatert!": "Funksjon oppdatert!",
      "Funksjon opprettet!": "Funksjon opprettet!",
      "Kunne ikke oppdatere funksjon.": "Kunne ikke oppdatere funksjon.",
      "Kunne ikke opprette funksjon. Sjekk at alle felter er fylt ut og gyldige.": "Kunne ikke opprette funksjon. Sjekk at alle felter er fylt ut og gyldige."
    }
  },
  nn: {
    translation: {
      "Roadmap": "Vegkart",
      "Ny funksjon": "Ny funksjon",
      "Rediger funksjon": "Rediger funksjon",
      "Tittel": "Tittel",
      "Beskrivelse": "Skildring",
      "Utfyllende beskrivelse": "Utfyllande skildring",
      "Velg kategori": "Vel kategori",
      "Tags (kommaseparert)": "Tags (kommaseparert)",
      "Vedlegg (filnavn eller URL)": "Vedlegg (filnamn eller URL)",
      "Prioritet": "Prioritet",
      "Antall stemmer": "Tal på stemmer",
      "Sorteringsrekkefølge": "Sorteringsrekkefølgje",
      "Privat funksjon (kun synleg for admin)": "Privat funksjon (kun synleg for admin)",
      "Arkivert (skjules frå vegkart)": "Arkivert (skjules frå vegkart)",
      "Bruker-ID (valfritt)": "Brukar-ID (valfritt)",
      "Lagre endringer": "Lagre endringar",
      "Opprett funksjon": "Opprett funksjon",
      "Avbryt": "Avbryt",
      "Ingen (hovedfunksjon)": "Ingen (hovudfunksjon)",
      "Velg versjon/status": "Vel versjon/status",
      "Funksjon oppdatert!": "Funksjon oppdatert!",
      "Funksjon opprettet!": "Funksjon oppretta!",
      "Kunne ikke oppdatere funksjon.": "Kunne ikkje oppdatere funksjon.",
      "Kunne ikke opprette funksjon. Sjekk at alle felter er fylt ut og gyldige.": "Kunne ikkje opprette funksjon. Sjekk at alle felt er fylt ut og gyldige."
    }
  },
  en: {
    translation: {
      "Roadmap": "Roadmap",
      "Ny funksjon": "New feature",
      "Rediger funksjon": "Edit feature",
      "Tittel": "Title",
      "Beskrivelse": "Description",
      "Utfyllende beskrivelse": "Detailed description",
      "Velg kategori": "Select category",
      "Tags (kommaseparert)": "Tags (comma separated)",
      "Vedlegg (filnavn eller URL)": "Attachment (filename or URL)",
      "Prioritet": "Priority",
      "Antall stemmer": "Votes",
      "Sorteringsrekkefølge": "Sort order",
      "Privat funksjon (kun synlig for admin)": "Private feature (admin only)",
      "Arkivert (skjules fra roadmap)": "Archived (hidden from roadmap)",
      "Bruker-ID (valgfritt)": "User ID (optional)",
      "Lagre endringer": "Save changes",
      "Opprett funksjon": "Create feature",
      "Avbryt": "Cancel",
      "Ingen (hovedfunksjon)": "None (main feature)",
      "Velg versjon/status": "Select version/status",
      "Funksjon oppdatert!": "Feature updated!",
      "Funksjon opprettet!": "Feature created!",
      "Kunne ikke oppdatere funksjon.": "Could not update feature.",
      "Kunne ikke opprette funksjon. Sjekk at alle felter er fylt ut og gyldige.": "Could not create feature. Check that all fields are filled and valid."
    }
  },
  de: {
    translation: {
      "Roadmap": "Fahrplan",
      "Ny funksjon": "Neue Funktion",
      "Rediger funksjon": "Funktion bearbeiten",
      "Tittel": "Titel",
      "Beskrivelse": "Beschreibung",
      "Utfyllende beskrivelse": "Ausführliche Beschreibung",
      "Velg kategori": "Kategorie wählen",
      "Tags (kommaseparert)": "Tags (durch Komma getrennt)",
      "Vedlegg (filnavn eller URL)": "Anhang (Dateiname oder URL)",
      "Prioritet": "Priorität",
      "Antall stemmer": "Stimmen",
      "Sorteringsrekkefølge": "Sortierreihenfolge",
      "Privat funksjon (kun synlig for admin)": "Private Funktion (nur für Admin sichtbar)",
      "Arkivert (skjules fra roadmap)": "Archiviert (aus Fahrplan ausgeblendet)",
      "Bruker-ID (valgfritt)": "Benutzer-ID (optional)",
      "Lagre endringer": "Änderungen speichern",
      "Opprett funksjon": "Funktion erstellen",
      "Avbryt": "Abbrechen",
      "Ingen (hovedfunksjon)": "Keine (Hauptfunktion)",
      "Velg versjon/status": "Version/Status wählen",
      "Funksjon oppdatert!": "Funktion aktualisiert!",
      "Funksjon opprettet!": "Funktion erstellt!",
      "Kunne ikke oppdatere funksjon.": "Funktion konnte nicht aktualisiert werden.",
      "Kunne ikke opprette funksjon. Sjekk at alle felter er fylt ut og gyldige.": "Funktion konnte nicht erstellt werden. Bitte alle Felder ausfüllen und prüfen."
    }
  },
  es: {
    translation: {
      "Roadmap": "Hoja de ruta",
      "Ny funksjon": "Nueva función",
      "Rediger funksjon": "Editar función",
      "Tittel": "Título",
      "Beskrivelse": "Descripción",
      "Utfyllende beskrivelse": "Descripción detallada",
      "Velg kategori": "Seleccionar categoría",
      "Tags (kommaseparert)": "Etiquetas (separadas por coma)",
      "Vedlegg (filnavn eller URL)": "Adjunto (nombre de archivo o URL)",
      "Prioritet": "Prioridad",
      "Antall stemmer": "Votos",
      "Sorteringsrekkefølge": "Orden de clasificación",
      "Privat funksjon (kun synlig for admin)": "Función privada (solo admin)",
      "Arkivert (skjules fra roadmap)": "Archivado (oculto de la hoja de ruta)",
      "Bruker-ID (valgfritt)": "ID de usuario (opcional)",
      "Lagre endringer": "Guardar cambios",
      "Opprett funksjon": "Crear función",
      "Avbryt": "Cancelar",
      "Ingen (hovedfunksjon)": "Ninguna (función principal)",
      "Velg versjon/status": "Seleccionar versión/estado",
      "Funksjon oppdatert!": "¡Función actualizada!",
      "Funksjon opprettet!": "¡Función creada!",
      "Kunne ikke oppdatere funksjon.": "No se pudo actualizar la función.",
      "Kunne ikke opprette funksjon. Sjekk at alle felter er fylt ut og gyldige.": "No se pudo crear la función. Verifique que todos los campos estén completos y sean válidos."
    }
  }
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
