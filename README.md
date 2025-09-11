# Roadmap Frontend

**Roadmap Frontend** er et brukervennlig og moderne verktøy for idéhåndtering, prioritering og oversikt over utviklingsarbeid – typisk brukt til produkt-roadmaps, funksjonsønsker eller idébanker i et team eller en organisasjon.

Med denne løsningen kan du:
- Samle inn, strukturere og organisere idéer, forslag og tilbakemeldinger fra brukere eller ansatte.
- Administrere og gruppere funksjonsønsker og forbedringsforslag basert på status, kategori eller versjon.
- La brukere stemme på de viktigste forslagene og kommentere på idéer eller funksjoner.
- Holde oversikt over hvilke forslag som er under vurdering, planlagt, under utvikling eller ferdigstilt – alt i en oversiktlig og tilgjengelig visning.
- Kommunisere tydelig fremdrift og prioriteringer, slik at alle interessenter har et oppdatert bilde av status for ulike initiativer.

Roadmap Frontend er bygget for å være tilgjengelig, flerspråklig og lett å ta i bruk, med et rent og responsivt grensesnitt. Løsningen kan brukes internt i virksomheter, i offentlige prosjekter, eller i åpne fellesskap der man ønsker å la brukere påvirke retningen på utviklingen.

---

## Teknologi

- **React 18+** (kun ES-moduler, Vite)
- **Redux Toolkit + RTK Query** for global state og API-integrasjon
- **React Router v6**
- **designsystemet.no**  
  - `@digdir/designsystemet-react`, `-css`, `-theme`
  - `@navikt/aksel-icons`
- **i18n**: `react-i18next` med støtte for norsk bokmål, nynorsk, engelsk, tysk og spansk
- **Inter font** via CDN

---

## Mappestruktur

```
src/
  app/         # store, router, i18n
  features/    # redux slices + feature-spesifikke komponenter
  services/    # RTK Query api-definisjoner
  pages/       # route views
  components/  # delte UI-komponenter
  hooks/       # delte custom hooks
  lib/         # utils, constants
  styles/      # global css (DS imports + overrides)
  locales/     # i18n JSON-filer
```

---

## Hovedflows

- **Onboarding**: Opprett app, status og første feature
- **Admin**: CRUD for status og features, tabs, versjonshåndtering
- **Roadmap**: Hierarkisk visning av features, stemmer, kommentarer
- **Feature**: Opprett/rediger feature med alle felter, status, error handling, loading states
- **User Requests**: Opprett, stem, kommenter og promoter brukerforespørsler (idébank)

---

## Komponenter

- **AppList**: Viser alle apper, DS `<Button>`, `<Spinner>`, `<Alert>`
- **FeatureList**: Viser features for valgt app, DS `<Tag>`
- **FeatureDetails**: Detaljvisning inkl. status, stemmer, kommentarer
- **NewFeatureForm**: Skjema for oppretting/redigering av feature, DS `<Textfield>`, `<Select>`, `<Checkbox>`
- **VersionAdmin**: Admin for versjoner/status, DS `<Button>`, `<Tag>`
- **RoadmapWithVersions**: Roadmap med grouping/hierarki, DS `<Tag>`, `<Button>`
- **Tabs**: Custom/DS tabs for admin
- **VoteButton**: Stemmeknapp med optimistisk UI
- **CommentList/AddComment**: Kommentarvisning og oppretting, DS `<Textfield>`, `<Button>`
- **LanguageAdminTable**: UI for oversettelser/admin av i18n

Se mer i [`docs/COMPONENTS.md`](docs/COMPONENTS.md).

---

## API-integrasjon

Alle API-kall går via RTK Query ([`src/services/api.js`](src/services/api.js)):
- **Endepunkter**: Apps, statuses, features, votes, comments, user requests
- **CRUD**: Henting, oppretting, endring, sletting
- **Error handling**: via `<Alert>`
- **Loading states**: via `<Spinner>`

Eksempel på API-kall finnes i [`docs/frontend-instructions.md`](docs/frontend-instructions.md).

---

## Internasjonalisering (i18n)

- Full støtte for **flerspråklig UI**: norsk bokmål, nynorsk, engelsk, tysk, spansk
- Språkvelger i hoved-UI (`main.jsx`)
- Oversettelser i `src/locales/*.json`
- Egen komponent for administrasjon/visning av oversettelser: `LanguageAdminTable`

---

## Designsystem og tilgjengelighet

- DS CSS og tema importeres globalt i `main.jsx`
- Alle inputs, knapper, alerts m.m. bruker DS-komponenter
- Ikoner fra Aksel brukes i relevante knapper
- Alle inputs har `label`, DS-komponenter har innebygd ARIA
- Testet med tastatur og skjermleser

---

## Testing

> **Automatisert testing er ikke etablert i repoet per nå**

- Det finnes **ingen automatiserte tester** (ingen Cypress, Jest, Vitest, MSW eller Testing Library).
- All testing skjer gjennom **manuell test av brukerflows mot backend**, se [`docs/API_FLOW_TESTLOG.md`](docs/API_FLOW_TESTLOG.md) for detaljer.
- Standarder og planer for Cypress/MSW er nevnt i `.github/instructions/copilot.instructions.md`, men ikke implementert.
- Koden er strukturert for å gjøre det enkelt å innføre testing i fremtiden (isolerte komponenter, RTK Query, etc.).

---

## Kom-i-gang

1. Installer avhengigheter:  
   ```bash
   npm install
   ```
2. Start dev-server:  
   ```bash
   npm run dev
   ```
3. Sørg for at backend kjører på `http://localhost:8080/v1`
4. Åpne roadmap og admin på `/app/:appId` og `/app/:appId/admin`

---

## Videre arbeid

- Sette opp automatisert testing (Cypress, MSW, Vitest eller Jest/React Testing Library)
- Dokumentere alle hovedflows og UI-komponenter mer detaljert
- Fullfør og test stemme- og kommentarflyt for brukerforespørsler
- Implementer paginering/infinite scroll og evt. realtime oppdateringer (polling/websockets)
- Utvide filtering/sorting og admin-funksjoner
- **Integrasjon mot GitHub API og GitHub Projects API**
  - Synkronisere features, bugs, versjoner og status direkte fra GitHub issues/projects
  - Mulighet for å importere/eksportere roadmap-data mellom Roadmap Frontend og GitHub
  - Støtte for mapping av labels, milestones, epics m.m. fra GitHub
  - Vise og oppdatere status på features/bugs basert på GitHub Project boards
  - (Planlagt: kobling mellom roadmap og faktisk kode/pull requests via GitHub)

---

For mer info, se [`docs/frontend-instructions.md`](docs/frontend-instructions.md) og åpne issues på GitHub ved spørsmål eller forslag!