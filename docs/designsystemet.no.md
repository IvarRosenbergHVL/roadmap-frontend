# Designsystemet – komponentguide for Copilot (React + Vite)

> **Formål**: Gi GitHub Copilot konsis kontekst om hvordan vi bruker **designsystemet.no** i vårt React-prosjekt (ESM, uten TypeScript), med eksempler og mønstre som Copilot kan følge når den foreslår kode.

---

## 0) Installasjon og grunnoppsett

```bash
npm i @digdir/designsystemet-react @digdir/designsystemet-css @digdir/designsystemet-theme @navikt/aksel-icons
```

**Global import** i `main.jsx`:

```jsx
import "@digdir/designsystemet-css/index.css";
import "@digdir/designsystemet-theme";
```

**Font** (valgfritt, anbefalt Inter) i `index.html`:

```html
<link rel="stylesheet" href="https://altinncdn.no/fonts/inter/v4.1/inter.css" crossorigin="anonymous" />
```

---

## 1) Overordnede prinsipper

* Bruk komponenter fra `@digdir/designsystemet-react` før du lager egne.
* Alle input-komponenter skal ha **label** og eventuelt **description**.
* Tilstand og feilmeldinger vises med **Alert**, **Error Summary** eller feltets egen feilvisning.
* Bruk **Aksel-ikoner** sammen med komponenter som **Button** via `icon`-prop.
* Tilgjengelighet: behold ARIA-attributter som følger med; legg til `aria-*` ved behov.

Katalog over komponenter finnes på designsystemets nettsted, se **Komponenter**-oversikten. citeturn1view0

---

## 2) Grunnleggende bruk (import & pattern)

```jsx
// Eksempel på sammensatt skjermbilde
import { Button, Textfield, Textarea, Select, Radio, Checkbox, Switch, Alert, Spinner, Tag } from "@digdir/designsystemet-react";
import { PlusIcon } from "@navikt/aksel-icons";

export default function ExampleScreen() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Skjemaeksempel</h1>
      <Alert severity="info">Fyll ut feltene under.</Alert>

      <Textfield label="Tittel" />
      <Textarea label="Beskrivelse" />

      <Select label="Kategori">
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>

      <Radio.Group legend="Synlighet">
        <Radio value="public">Offentlig</Radio>
        <Radio value="private">Privat</Radio>
      </Radio.Group>

      <Checkbox>Godta vilkår</Checkbox>
      <Switch>Aktiver funksjon</Switch>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <Button icon={<PlusIcon aria-hidden />}>Lagre</Button>
        <Button variant="secondary">Avbryt</Button>
      </div>

      <div style={{ marginTop: 16 }}>
        <Tag>Beta</Tag>
      </div>

      <Spinner title="Laster eksempel..." />
    </div>
  );
}
```

> **Merk**: Variants/props kan ha flere alternativer – se Storybook for detaljer per komponent. Komponentlisten finnes via **Komponenter**-siden. citeturn1view0

---

## 3) Komponenter – form & feedback

### 3.1 Textfield

* Bruk til enlinjers input.
* Minimum: `label` + kontroller `value`/`onChange` i state.

```jsx
import { Textfield } from "@digdir/designsystemet-react";
<Textfield label="Navn" />
```

### 3.2 Textarea

* Flerlinjers tekst.

```jsx
import { Textarea } from "@digdir/designsystemet-react";
<Textarea label="Beskrivelse" />
```

### 3.3 Select

* Nedtrekksliste; bruk `<option>`-barn.

```jsx
import { Select } from "@digdir/designsystemet-react";
<Select label="Velg">
  <option value="1">En</option>
  <option value="2">To</option>
</Select>
```

### 3.4 Radio & Checkbox

```jsx
import { Radio, Checkbox } from "@digdir/designsystemet-react";
<Radio.Group legend="Synlighet">
  <Radio value="public">Offentlig</Radio>
  <Radio value="private">Privat</Radio>
</Radio.Group>
<Checkbox>Husk meg</Checkbox>
```

### 3.5 Switch

```jsx
import { Switch } from "@digdir/designsystemet-react";
<Switch>Aktiver</Switch>
```

### 3.6 Alert

* Bruk for status/feil/info.

```jsx
import { Alert } from "@digdir/designsystemet-react";
<Alert severity="danger">Noe gikk galt</Alert>
```

### 3.7 Error Summary

* Oppsummer valideringsfeil i skjema.

### 3.8 Spinner & Loaders

* Vis lastetilstand mens data hentes.

---

## 4) Navigasjon & innholdsstruktur

### 4.1 Tabs

* Bytt mellom seksjoner uten å navigere ruten.

### 4.2 Breadcrumbs & Link

* Vis plassering og lenker til foreldre.

### 4.3 Pagination

* Paginering for lister/tabeller.

### 4.4 Skip Link

* Hopp til hovedinnhold (tilgjengelighet).

---

## 5) Layout & visuelle elementer

### 5.1 Card

* Ramme/kort for innhold. Se komponentdokumentasjon for varianter og bruk. (Storybook-side for Card). citeturn1view0

### 5.2 Divider / List / Table / Typography

* Strukturer tekst og data i tabeller/lister.

### 5.3 Tag & Badge & Chip

* Små labels/statusindikatorer rundt data.

### 5.4 Tooltip & Popover

* Kontekstuelle forklaringer/menyer.

### 5.5 Avatar

* Bruker-/identitetsindikator.

---

## 6) Interaksjon & dialog

### 6.1 Button

* Primær handling (`<Button>`), sekundær/tertiær via `variant`.
* Ikon: `icon={<PlusIcon />}`.

### 6.2 Dialog

* Modal dialog for bekreftelser, skjemaer, osv.

### 6.3 Dropdown Menu & Toggle Group

* Meny/valg i kompakt format; grupperte toggles.

---

## 7) Tilgjengelighet (a11y)

* Bruk alltid `label` på inputs, `legend` på radiogrupper.
* Tekster i knapper/lenker skal være meningsbærende.
* Sikre fokussynlighet; DS-komponenter har fokus-styling innebygd.

---

## 8) Komponentoversikt (hurtigreferanse)

Komplett liste over tilgjengelige komponenter finnes her (Storybook/Komponenter). Eksempler: **Alert, Avatar, Badge, Breadcrumbs, Button, Card, Checkbox, Chip, Details, Dialog, Divider, Dropdown Menu, Error Summary, Fieldset, Link, List, Loaders, Pagination, Popover, Radio, Search, Select, Skip Link, Suggestion, Switch, Table, Tabs, Tag, Textarea, Textfield, Toggle Group, Tooltip, Typography**. Se siden for fullstendige props og varianter. citeturn1view0

---

## 9) Mønster: Skjemasider med validering

Eksempel på bruk i kombinasjon med f.eks. `react-hook-form` (skisse):

```jsx
import { useForm } from "react-hook-form";
import { Button, Textfield, Alert } from "@digdir/designsystemet-react";

export default function MyForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = (data) => {/* send til API */};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <Alert severity="danger">{errors.root.message}</Alert>}

      <Textfield label="Navn" {...register("name", { required: "Påkrevd" })} />
      {errors.name && <Alert severity="warning">{errors.name.message}</Alert>}

      <Button type="submit" disabled={isSubmitting}>Send inn</Button>
    </form>
  );
}
```

---

## 10) Når du er usikker på props

* Søk opp komponenten i **Komponenter**-oversikten og åpne Storybook-siden for eksempler, varianter og API. citeturn1view0

---

## 11) Hvor finner jeg komponentene

* **Komponenter (oversikt)**: viser alle komponenter med lenker til Storybook. citeturn1view0
* **Storybook** (per komponent): detaljer, eksempler og prop-tabeller.

---

> **Tips til Copilot**: Foreslå alltid imports fra `@digdir/designsystemet-react`, bruk `label`/`legend`, og legg inn lastetilstand med `Spinner` og feil med `Alert`. Når du foreslår knapper, inkluder gjerne et Aksel-ikon i `icon`-prop.

Kopier kodesnutten under og kjør den på maskinen din for å generere design tokens (json-filer),

##tokens##
npx @digdir/designsystemet@latest tokens create ^
--main-colors "accent:#00ba68" ^
--neutral-color "#1E2B3C" ^
--support-colors "brand1:#741d5a" "brand2:#E5AA20" "brand3:#0ca9b7" ^
--border-radius 6 ^
--theme "theme"

Kjør kodesnutten for å generere CSS variabler til kode.
npx @digdir/designsystemet@latest tokens build
