# API-flow testlogg – Roadmap Frontend

Her dokumenteres testing av alle brukerflows mot backend. Eventuelle feil/mangler logges fortløpende.

## Testede flows

### 1. Hente apper
- Endpoint: GET /v1/apps
- Resultat: OK – apper hentes og vises i AppList

### 2. Opprette app
- Endpoint: POST /v1/apps
- Resultat: OK – ny app opprettes og vises

### 3. Hente statuser
- Endpoint: GET /v1/statuses?app_id=...
- Resultat: OK – statuser hentes og vises i admin/roadmap

### 4. Opprette status
- Endpoint: POST /v1/statuses
- Resultat: OK – status opprettes og vises

### 5. Endre status
- Endpoint: PATCH /v1/statuses/:id
- Resultat: OK – status oppdateres

### 6. Slette status
- Endpoint: DELETE /v1/statuses/:id
- Resultat: OK – status slettes

### 7. Hente features
- Endpoint: GET /v1/features?app_id=...
- Resultat: OK – features hentes og vises i roadmap

### 8. Opprette feature
- Endpoint: POST /v1/features
- Resultat: OK – feature opprettes med alle felter

### 9. Endre feature
- Endpoint: PATCH /v1/features/:id
- Resultat: OK – alle felter oppdateres, bekreftet i database

### 10. Slette feature
- Endpoint: DELETE /v1/features/:id
- Resultat: OK – feature slettes

### 11. Flytte feature til annen status
- Endpoint: PATCH /v1/features/:id/status
- Resultat: OK – status oppdateres

### 12. Stemmeknapp
- Endpoint: POST /v1/votes, DELETE /v1/votes
- Resultat: OK – stemmer legges til/fjernes, UI oppdateres

### 13. Kommentarer
- Endpoint: POST /v1/comments, PATCH /v1/comments/:id, DELETE /v1/comments/:id, GET /v1/comments?feature_id=...
- Resultat: OK – kommentarer opprettes, endres, slettes og hentes

---

## Feil/mangler
- Ingen kritiske feil funnet
- Alle flows fungerer som forventet
- Error handling og loading states vises med DS-komponenter

## Videre testing
- Test paginering/infinite scroll for features/comments
- Test edge cases (store payloads, feil input, manglende felter)
- Test admin-restriksjoner

---
Se README.md og docs/COMPONENTS.md for oversikt over flows og komponenter.
