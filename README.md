# Roadmap Frontend – README og Komponentdokumentasjon

Dette prosjektet er en moderne frontend for Roadmap-backend, bygget med Vite, React, Redux Toolkit, RTK Query og designsystemet.no.

## Teknologi
- React 18+ (kun ES-moduler)
- Redux Toolkit + RTK Query
- React Router v6
- @digdir/designsystemet-react, -css, -theme
- @navikt/aksel-icons
- Inter font via CDN

## Mappestruktur
```
src/
  app/         # store, providers
  features/    # Redux slices + feature-spesifikke komponenter
  services/    # RTK Query api-definisjoner
  pages/       # route views
  components/  # delte UI-komponenter
  hooks/       # delte custom hooks
  lib/         # utils, constants
  styles/      # global css (DS imports + overrides)
```

## Hovedflows
- Onboarding: Opprett app, status, første feature
- Admin: CRUD for status og features, tabs, versjonshåndtering
- Roadmap: Hierarkisk visning av features, stemmer, kommentarer
- Feature: Opprett/rediger med alle felter, error handling, loading states

## Komponenter
- **AppList**: Viser alle apper
- **FeatureList**: Viser features for valgt app
- **FeatureDetails**: Detaljvisning med status, kommentarer, stemmer
- **NewFeatureForm**: Skjema for oppretting/redigering av feature
- **VersionAdmin**: Admin for versjoner/status
- **RoadmapWithVersions**: Roadmap med grouping og hierarki
- **Tabs**: Custom/DS tabs for admin
- **VoteButton**: Stemmeknapp med optimistisk UI
- **CommentList/AddComment**: Kommentarvisning og oppretting

## API-integrasjon
Alle API-kall går via RTK Query (`src/services/api.js`).
- Henting, oppretting, endring, sletting av apps, features, status, votes, comments
- Error handling med `<Alert>`
- Loading states med `<Spinner>`

## Designsystemet
- DS CSS og tema importeres globalt i `main.jsx`
- Alle inputs, buttons, alerts, spinner, tags bruker DS-komponenter
- Ikoner fra Aksel brukes i relevante knapper

## Tilgjengelighet
- Alle inputs har label
- DS-komponenter har innebygd ARIA
- Testet med tastatur og skjermleser

## Testing
- Kritiske flows testes med Cypress/MSW
- API-mocking via MSW
- E2E: Opprett/rediger/slett feature, stem, kommenter

## Kom-i-gang
1. Installer avhengigheter: `npm install`
2. Start dev-server: `npm run dev`
3. Backend må kjøre på `http://localhost:8080/v1`
4. Se roadmap og admin på `/app/:appId` og `/app/:appId/admin`

## Videre arbeid
- Dokumenter alle hovedflows og UI-komponenter
- Test API-flows mot backend
- Implementer i18n (norsk/engelsk)
- Fullfør stemme- og kommentarflyt
- Paginering/infinite scroll for features/comments
- Realtime oppdateringer

---
For mer info, se `docs/frontend-instructions.md` og åpne issues på GitHub.
