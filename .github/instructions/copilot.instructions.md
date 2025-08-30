---
applyTo: "**/*"
description: "HVL Assistants Frontend – prosjektstandarder for Vite + React + Redux Toolkit + Designsystemet.no"
---

# 🚀 Prosjektstandarder (Alltid aktive)

> **Hvordan det virker**  
> Denne filen lastes automatisk inn av GitHub Copilot Chat hver gang du stiller et spørsmål i repoet.  
> Bruk «Plan Mode» eller «PRD Mode» hvis du ønsker dypere analyse eller kravspesifikasjon.

---

## 🛠️ Tech-stack

| Lag       | Teknologi / bibliotek                     | Notater |
|-----------|--------------------------------------------|---------|
| UI        | **React 18+** (funksjonelle komponenter, hooks) | Bruk `React.lazy` + Suspense for kode-splitting |
| State     | **Redux Toolkit (RTK)** + **RTK Query**    | Slices per feature, RTK Query for serverdata |
| Routing   | **React Router v6**                       | Declarative routes |
| Styling   | **designsystemet.no**                     | `@digdir/designsystemet-react`, `@digdir/designsystemet-css`, `@digdir/designsystemet-theme` |
| Ikoner    | **Aksel icons**                           | `@navikt/aksel-icons` |
| I18n      | **react-i18next**                         | Norsk default, engelsk fallback |
| Test      | **Vitest + React Testing Library**        | MSW for mock API, Cypress for e2e |
| Font      | **Inter** via CDN                         | Sett globalt i `index.html` |

---

## 📐 Kode­stil & arkitektur

### Komponent­prinsipper
- Funksjonelle komponenter, ingen `React.FC`.
- Maks ~150 linjer per komponent.
- Props dokumenteres med JSDoc eller PropTypes.
- Bruk Designsystemet-komponenter først, før du bygger egne.

### State-retningslinjer
- Redux Toolkit `createSlice` for app-state.
- RTK Query for API-endepunkter (`builder.query` og `builder.mutation`).
- Optimistic updates i mutations når naturlig.
- Lokal UI-state med `useState` / `useReducer`.

### Styling
- Importér DS CSS/tema én gang i `main.jsx`.
- Overstyr med små `*.module.css` filer ved behov.
- Bruk DS sine tokens/temaer fremfor egne.

### Mappestruktur
src/
app/ # store, providers
features/ # Redux slices + feature-spesifikke komponenter
services/ # RTK Query api-definisjoner
pages/ # route views
components/ # delte UI-komponenter
hooks/ # delte custom hooks
lib/ # utils, constants
styles/ # global css (DS imports + overrides)


### Testing
- Test **oppførsel**, ikke implementasjon.
- Kritiske flows med Cypress.
- MSW for API mocking.

### Tilgjengelighet
- Alltid labels på inputs.
- Bruk `aria-` attributter når nødvendig.
- DS-komponenter gir gode defaults, men test med tastatur og skjermleser.

---

## 📌 Husk
- **Alltid** ES-moduler (`import/export`), ikke TypeScript.  
- Bruk Designsystemet-komponenter og Aksel-ikoner som default.  
- RTK Query for alt som henter/skriver data til API.  
- Inter font lastes inn via CDN.  

---

