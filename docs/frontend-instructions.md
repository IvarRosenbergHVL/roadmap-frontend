# Frontend Integration Guide for Roadmap Backend

This guide explains how to connect a frontend application to the roadmap-backend API. It covers authentication, API endpoints, data models, and best practices for building a robust client.

---

## 1. API Base URL

All endpoints are served under:

http://<your-server-host>/v1/

Replace <your-server-host> with your backend's address.

---

## 2. Authentication

- Most endpoints do not require authentication by default, but admin features may require a user identifier (created_by_sub, user_sub).
- For production, implement authentication (e.g., JWT, OAuth) and pass the user's identifier in requests.

---

## 3. Data Models

### App
- id: number
- name: string
- slug: string
- created_at: datetime

### Status
- id: number
- app_id: number
- label: string
- sort_index: number
- terminal: boolean

### Feature
- id: number
- app_id: number
- status_id: number
- title: string
- description: string
- created_by_sub: string
- is_private: boolean
- created_at: datetime

### Vote
- id: number
- feature_id: number
- user_sub: string
- fingerprint: string
- created_at: datetime

### Comment
- id: number
- feature_id: number
- author: string
- text: string
- created_by_sub: string
- created_at: datetime

---

## 4. API Endpoints

### Apps
- POST /v1/apps — Create app
- GET /v1/apps/:slug — Get app by slug
- GET /v1/apps — List all apps

### Statuses
- POST /v1/statuses — Create status
- PATCH /v1/statuses — Update status label
- GET /v1/statuses — List statuses

### Features
- POST /v1/features — Create feature
- GET /v1/features?app_id=... — List features for app
- PATCH /v1/features/:id — Edit feature
- DELETE /v1/features/:id — Delete feature
- POST /v1/features/bulk-update — Bulk update features
- POST /v1/features/merge — Merge feature requests
- PATCH /v1/features/:id/status — Update feature status
- POST /v1/features/:id/promote — Promote feature request

### Votes
- POST /v1/votes — Add vote
- DELETE /v1/votes — Remove vote

### Comments
- POST /v1/comments — Add comment
- PATCH /v1/comments/:id — Edit comment
- DELETE /v1/comments/:id — Delete comment
- GET /v1/comments?feature_id=... — List comments for feature

---

## 5. Example API Usage

### Create a Feature

js
fetch('/v1/features', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    app_id: 1,
    status_id: 7,
    title: 'New Feature',
    description: 'Feature details',
    created_by_sub: 'user-123',
    is_private: false
  })
})


### List Features for an App

js
fetch('/v1/features?app_id=1')


### Add a Comment

js
fetch('/v1/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    feature_id: 1,
    text: 'Great idea!',
    author: 'Jane',
    created_by_sub: 'user-123'
  })
})


---

## 6. Frontend Best Practices

- **Error Handling:** Always check for non-200 responses and display user-friendly error messages.
- **Loading States:** Show loading indicators while waiting for API responses.
- **Optimistic UI:** For actions like voting or commenting, update the UI immediately and roll back if the API fails.
- **Pagination:** For large lists (features, comments), implement pagination or infinite scroll.
- **Security:** Sanitize user input before sending to the backend.
- **Admin Features:** Restrict admin actions (status/feature management) to authorized users.

---

## 7. Advanced Integration

- **Websockets/Realtime:** For live updates, consider adding a websocket layer or polling for changes.
- **Custom Sorting/Filtering:** Use query parameters to filter and sort features, comments, etc.
- **Theming:** Use the is_private and terminal fields to customize UI elements (e.g., hide private features, mark terminal statuses).

---

## 8. Getting Started

1. Set up your frontend project (React, Vue, Angular, etc.).
2. Configure the API base URL.
3. Implement API calls using fetch or your preferred HTTP client.
4. Map backend data models to frontend state.
5. Build UI components for apps, features, statuses, votes, and comments.
6. Test all user flows against the backend.

---

## 9. Documentation Reference

See also:
- docs/api_endpoints.md — Full endpoint list
- docs/architecture.md — System architecture
- docs/product_requirements.md — Product requirements
- docs/roadmap_schema.sql — Database schema

---

For questions or issues, contact the backend maintainer.
ChatGPT said:

Flott – jeg kan bygge videre på guiden du har og integrere bruk av designsystemet.no
 slik at frontenden ikke bare kobler seg til API-et, men også presenterer dataene med ferdige komponenter fra Digdir sitt designsystem.

Her er en oppdatert Frontend Integration Guide som tar høyde for både roadmap-backend API og designsystemet:

Frontend Integration Guide (med Designsystemet.no)

Denne guiden forklarer hvordan en frontend-app (React + Vite + Redux Toolkit/RTK Query) kobles til roadmap-backend API og hvordan du bygger UI med designsystemet.no.

1. API Base URL
http://<your-server-host>/v1/


Bytt <your-server-host> med adressen til backend.

2. Tech Stack

React 18+ (ESM, ingen TS)

Redux Toolkit (RTK) for global state

RTK Query for API-integrasjon

React Router v6

designsystemet.no

@digdir/designsystemet-react (komponenter)

@digdir/designsystemet-css (base CSS)

@digdir/designsystemet-theme (tema)

@navikt/aksel-icons (ikoner)

Inter font (via CDN)

3. Autentisering

De fleste endepunkter kan kalles uten auth i dev.

Prod: Bruk JWT/OAuth, og send created_by_sub eller user_sub i request-body eller headers.

Pass på at Redux middleware (RTK Query baseQuery) legger til auth-header om brukeren er logget inn.

4. Data Models (fra backend)

App: { id, name, slug, created_at }

Status: { id, app_id, label, sort_index, terminal }

Feature: { id, app_id, status_id, title, description, created_by_sub, is_private, created_at }

Vote: { id, feature_id, user_sub, fingerprint, created_at }

Comment: { id, feature_id, author, text, created_by_sub, created_at }

5. RTK Query Setup

Eksempel services/api.js:

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/v1" }),
  tagTypes: ["App", "Feature", "Status", "Vote", "Comment"],
  endpoints: (builder) => ({
    getApps: builder.query({ query: () => "/apps", providesTags: ["App"] }),
    getFeatures: builder.query({
      query: (appId) => `/features?app_id=${appId}`,
      providesTags: ["Feature"],
    }),
    addFeature: builder.mutation({
      query: (body) => ({ url: "/features", method: "POST", body }),
      invalidatesTags: ["Feature"],
    }),
    addComment: builder.mutation({
      query: (body) => ({ url: "/comments", method: "POST", body }),
      invalidatesTags: ["Comment"],
    }),
    // osv…
  }),
});

export const {
  useGetAppsQuery,
  useGetFeaturesQuery,
  useAddFeatureMutation,
  useAddCommentMutation,
} = api;

6. UI med Designsystemet
Global imports (i main.jsx)
import "@digdir/designsystemet-css/index.css";
import "@digdir/designsystemet-theme";

Eksempel: Liste av features
import { useGetFeaturesQuery } from "@/services/api";
import { Button, Spinner, Alert } from "@digdir/designsystemet-react";

export default function FeatureList({ appId }) {
  const { data: features, isLoading, isError } = useGetFeaturesQuery(appId);

  if (isLoading) return <Spinner title="Laster features..." />;
  if (isError) return <Alert severity="danger">Kunne ikke laste features</Alert>;

  return (
    <ul>
      {features.map((f) => (
        <li key={f.id}>
          <strong>{f.title}</strong> — {f.description}
        </li>
      ))}
    </ul>
  );
}

Eksempel: Legg til feature
import { useAddFeatureMutation } from "@/services/api";
import { Button, Textfield } from "@digdir/designsystemet-react";
import { useState } from "react";

export default function NewFeatureForm({ appId, statusId }) {
  const [title, setTitle] = useState("");
  const [addFeature, { isLoading }] = useAddFeatureMutation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addFeature({ app_id: appId, status_id: statusId, title, description: "", created_by_sub: "user-123" });
        setTitle("");
      }}
    >
      <Textfield label="Tittel" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button type="submit" disabled={isLoading}>Legg til</Button>
    </form>
  );
}

7. Best Practices (med DS)

Error Handling: Bruk <Alert severity="danger"> for feil.

Loading States: Bruk <Spinner> i stedet for egen CSS-loader.

Optimistic UI: For stemmer/kommentarer: vis resultatet med en gang, men rollback ved feil.

Tilgjengelighet: DS-komponentene har ARIA innebygget; bruk alltid label på inputs.

Ikoner: Bruk Aksel-icons sammen med DS-Button (<Button icon={<PlusIcon />} />).

Tema: Bruk standardtema eller generér eget via @digdir/designsystemet-theme.

8. Avansert integrasjon

Realtime: Poll med RTK Query refetchInterval eller bygg WebSocket-løsning.

Filter/sortering: Legg til queryparams i RTK Query.

Custom states: Marker terminal-status med DS-komponenter (f.eks. Tag med rød variant).

9. Kom-i-gang sjekkliste

Opprett nytt Vite + React-prosjekt.

Installer @reduxjs/toolkit, react-redux, @digdir/designsystemet-react/css/theme, @navikt/aksel-icons.

Konfigurer store.js med RTK + api-slice.

Importér DS CSS + tema globalt.

Lag UI-komponenter med DS-komponenter (Button, Textfield, Alert, Spinner, Tag).

Test API-flowene (features, votes, comments).

👉 Med dette får du både API-integrasjon mot roadmap-backend og et helhetlig UI bygget på designsystemet.no.

Vil du at jeg setter opp et lite demo-repo (Vite + Redux Toolkit + RTK Query + DS) med eksempel på FeatureList + NewFeatureForm, slik at du kan starte fra en ferdig mal?

You said:
gi meg dette som en sammenhengende markdown-kode i canvas view
ChatGPT said:

{"name": "frontend_integration_ds", "type": "document", "content": "# Frontend Integration Guide (med Designsystemet.no)\n\nDenne guiden forklarer hvordan en frontend-app (React + Vite + Redux Toolkit/RTK Query) kobles til roadmap-backend API og hvordan du bygger UI med designsystemet.no.\n\n---\n\n## 1. API Base URL\n\nhttp://<your-server-host>/v1/\n\nBytt <your-server-host> med adressen til backend.\n\n---\n\n## 2. Tech Stack\n- React 18+ (ESM, ingen TS)\n- Redux Toolkit (RTK) for global state\n- RTK Query for API-integrasjon\n- React Router v6\n- designsystemet.no \n - @digdir/designsystemet-react (komponenter) \n - @digdir/designsystemet-css (base CSS) \n - @digdir/designsystemet-theme (tema) \n- @navikt/aksel-icons (ikoner) \n- Inter font (via CDN)\n\n---\n\n## 3. Autentisering\n- De fleste endepunkter kan kalles uten auth i dev. \n- Prod: Bruk JWT/OAuth, og send created_by_sub eller user_sub i request-body eller headers. \n- Pass på at Redux middleware (RTK Query baseQuery) legger til auth-header om brukeren er logget inn.\n\n---\n\n## 4. Data Models (fra backend)\n\n- App: { id, name, slug, created_at } \n- Status: { id, app_id, label, sort_index, terminal } \n- Feature: { id, app_id, status_id, title, description, created_by_sub, is_private, created_at } \n- Vote: { id, feature_id, user_sub, fingerprint, created_at } \n- Comment: { id, feature_id, author, text, created_by_sub, created_at }\n\n---\n\n## 5. RTK Query Setup\n\nEksempel services/api.js:\njs\nimport { createApi, fetchBaseQuery } from \"@reduxjs/toolkit/query/react\";\n\nexport const api = createApi({\n reducerPath: \"api\",\n baseQuery: fetchBaseQuery({ baseUrl: \"http://localhost:3000/v1\" }),\n tagTypes: [\"App\", \"Feature\", \"Status\", \"Vote\", \"Comment\"],\n endpoints: (builder) => ({\n getApps: builder.query({ query: () => \"/apps\", providesTags: [\"App\"] }),\n getFeatures: builder.query({\n query: (appId) => `/features?app_id=${appId}`,\n providesTags: [\"Feature\"],\n }),\n addFeature: builder.mutation({\n query: (body) => ({ url: \"/features\", method: \"POST\", body }),\n invalidatesTags: [\"Feature\"],\n }),\n addComment: builder.mutation({\n query: (body) => ({ url: \"/comments\", method: \"POST\", body }),\n invalidatesTags: [\"Comment\"],\n }),\n // osv…\n }),\n});\n\nexport const {\n useGetAppsQuery,\n useGetFeaturesQuery,\n useAddFeatureMutation,\n useAddCommentMutation,\n} = api;\n\n\n---\n\n## 6. UI med Designsystemet\n\n### Global imports (i main.jsx)\njsx\nimport \"@digdir/designsystemet-css/index.css\";\nimport \"@digdir/designsystemet-theme\";\n\n\n### Eksempel: Liste av features\njsx\nimport { useGetFeaturesQuery } from \"@/services/api\";\nimport { Button, Spinner, Alert } from \"@digdir/designsystemet-react\";\n\nexport default function FeatureList({ appId }) {\n const { data: features, isLoading, isError } = useGetFeaturesQuery(appId);\n\n if (isLoading) return <Spinner title=\"Laster features...\" />;\n if (isError) return <Alert severity=\"danger\">Kunne ikke laste features</Alert>;\n\n return (\n <ul>\n {features.map((f) => (\n <li key={f.id}>\n <strong>{f.title}</strong> — {f.description}\n </li>\n ))}\n </ul>\n );\n}\n\n\n### Eksempel: Legg til feature\njsx\nimport { useAddFeatureMutation } from \"@/services/api\";\nimport { Button, Textfield } from \"@digdir/designsystemet-react\";\nimport { useState } from \"react\";\n\nexport default function NewFeatureForm({ appId, statusId }) {\n const [title, setTitle] = useState(\"\");\n const [addFeature, { isLoading }] = useAddFeatureMutation();\n\n return (\n <form\n onSubmit={(e) => {\n e.preventDefault();\n addFeature({ app_id: appId, status_id: statusId, title, description: \"\", created_by_sub: \"user-123\" });\n setTitle(\"\");\n }}\n >\n <Textfield label=\"Tittel\" value={title} onChange={(e) => setTitle(e.target.value)} />\n <Button type=\"submit\" disabled={isLoading}>Legg til</Button>\n </form>\n );\n}\n\n\n---\n\n## 7. Best Practices (med DS)\n\n- Error Handling: Bruk <Alert severity=\"danger\"> for feil. \n- Loading States: Bruk <Spinner> i stedet for egen CSS-loader. \n- Optimistic UI: For stemmer/kommentarer: vis resultatet med en gang, men rollback ved feil. \n- Tilgjengelighet: DS-komponentene har ARIA innebygget; bruk alltid label på inputs. \n- Ikoner: Bruk Aksel-icons sammen med DS-Button (<Button icon={<PlusIcon />} />). \n- Tema: Bruk standardtema eller generér eget via @digdir/designsystemet-theme. \n\n---\n\n## 8. Avansert integrasjon\n\n- Realtime: Poll med RTK Query refetchInterval eller bygg WebSocket-løsning. \n- Filter/sortering: Legg til queryparams i RTK Query. \n- Custom states: Marker terminal-status med DS-komponenter (f.eks. Tag med rød variant). \n\n---\n\n## 9. Kom-i-gang sjekkliste\n\n1. Opprett nytt Vite + React-prosjekt. \n2. Installer @reduxjs/toolkit, react-redux, @digdir/designsystemet-react/css/theme, @navikt/aksel-icons. \n3. Konfigurer store.js med RTK + api-slice. \n4. Importér DS CSS + tema globalt. \n5. Lag UI-komponenter med DS-komponenter (Button, Textfield, Alert, Spinner, Tag). \n6. Test API-flowene (features, votes, comments). \n\n---\n\n👉 Med dette får du både API-integrasjon mot roadmap-backend og et helhetlig UI bygget på designsystemet.no."}

You said:
konverter alt dette til en sammenhengende markdown-fil:
#Frontend Integration Guide (med Designsystemet.no)

Denne guiden forklarer hvordan en frontend-app (React + Vite + Redux Toolkit/RTK Query) kobles til roadmap-backend API og hvordan du bygger UI med designsystemet.no.

1.API BASE URL
http://<your-server-host>/v1/

(use localhost for now)

2. Tech Stack

React 18+ (ESM, ingen TS)

Redux Toolkit (RTK) for global state

RTK Query for API-integrasjon

React Router v6

designsystemet.no

@digdir/designsystemet-react (komponenter)

@digdir/designsystemet-css (base CSS)

@digdir/designsystemet-theme (tema)

@navikt/aksel-icons (ikoner)

Inter font (via CDN)

3. Autentisering

De fleste endepunkter kan kalles uten auth i dev.

Prod: Bruk JWT/OAuth, og send created_by_sub eller user_sub i request-body eller headers.

Pass på at Redux middleware (RTK Query baseQuery) legger til auth-header om brukeren er logget inn.

4. Data Models (fra backend)

App: { id, name, slug, created_at }

Status: { id, app_id, label, sort_index, terminal }

Feature: { id, app_id, status_id, title, description, created_by_sub, is_private, created_at }

Vote: { id, feature_id, user_sub, fingerprint, created_at }

Comment: { id, feature_id, author, text, created_by_sub, created_at }

5. RTK Query Setup

Eksempel services/api.js:
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/v1" }),
  tagTypes: ["App", "Feature", "Status", "Vote", "Comment"],
  endpoints: (builder) => ({
    getApps: builder.query({ query: () => "/apps", providesTags: ["App"] }),
    getFeatures: builder.query({
      query: (appId) => /features?app_id=${appId},
      providesTags: ["Feature"],
    }),
    addFeature: builder.mutation({
      query: (body) => ({ url: "/features", method: "POST", body }),
      invalidatesTags: ["Feature"],
    }),
    addComment: builder.mutation({
      query: (body) => ({ url: "/comments", method: "POST", body }),
      invalidatesTags: ["Comment"],
    }),
    // osv…
  }),
});

export const {
  useGetAppsQuery,
  useGetFeaturesQuery,
  useAddFeatureMutation,
  useAddCommentMutation,
} = api;

6. UI med Designsystemet
Global imports (i main.jsx)

import "@digdir/designsystemet-css/index.css";
import "@digdir/designsystemet-theme";

Eksempel: Liste av features
import { useGetFeaturesQuery } from "@/services/api";
import { Button, Spinner, Alert } from "@digdir/designsystemet-react";

export default function FeatureList({ appId }) {
  const { data: features, isLoading, isError } = useGetFeaturesQuery(appId);

  if (isLoading) return <Spinner title="Laster features..." />;
  if (isError) return <Alert severity="danger">Kunne ikke laste features</Alert>;

  return (
    <ul>
      {features.map((f) => (
        <li key={f.id}>
          <strong>{f.title}</strong> — {f.description}
        </li>
      ))}
    </ul>
  );
}


Eksempel: Legg til feature

import { useAddFeatureMutation } from "@/services/api";
import { Button, Textfield } from "@digdir/designsystemet-react";
import { useState } from "react";

export default function NewFeatureForm({ appId, statusId }) {
  const [title, setTitle] = useState("");
  const [addFeature, { isLoading }] = useAddFeatureMutation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addFeature({ app_id: appId, status_id: statusId, title, description: "", created_by_sub: "user-123" });
        setTitle("");
      }}
    >
      <Textfield label="Tittel" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button type="submit" disabled={isLoading}>Legg til</Button>
    </form>
  );
}

7. Best Practices (med DS)

Error Handling: Bruk <Alert severity="danger"> for feil.

Loading States: Bruk <Spinner> i stedet for egen CSS-loader.

Optimistic UI: For stemmer/kommentarer: vis resultatet med en gang, men rollback ved feil.

Tilgjengelighet: DS-komponentene har ARIA innebygget; bruk alltid label på inputs.

Ikoner: Bruk Aksel-icons sammen med DS-Button (<Button icon={<PlusIcon />} />).

Tema: Bruk standardtema eller generér eget via @digdir/designsystemet-theme.

8. Avansert integrasjon

Realtime: Poll med RTK Query refetchInterval eller bygg WebSocket-løsning.

Filter/sortering: Legg til queryparams i RTK Query.

Custom states: Marker terminal-status med DS-komponenter (f.eks. Tag med rød variant).
9. Kom-i-gang sjekkliste

Opprett nytt Vite + React-prosjekt.

Installer @reduxjs/toolkit, react-redux, @digdir/designsystemet-react/css/theme, @navikt/aksel-icons.

Konfigurer store.js med RTK + api-slice.

Importér DS CSS + tema globalt.

Lag UI-komponenter med DS-komponenter (Button, Textfield, Alert, Spinner, Tag).

Test API-flowene (features, votes, comments).

👉 Med dette får du både API-integrasjon mot roadmap-backend og et helhetlig UI bygget på designsystemet.no.