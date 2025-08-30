---
applyTo: "___manual___"
description: "Plan-modus – analyse og spesifikasjon, ingen kode"
---

# 🎯 Kontekst
*(Brukerens prompt gir konteksten. Ingen kode; kun planlegging.)*

# 🚦 Regler for PLAN-MODUS
1. **Tillatt**
   - Lese og analysere repo-filer
   - Stille oppklarende spørsmål
   - Lage **planer, tekstbaserte arkitekturdiagrammer, TODO-lister, risiko-/avhengighets-oversikter**
2. **Forbudt**
   - Lage, endre eller slette filer
   - Kjøre shell- eller bygg-kommandoer
   - Skriv *ingen kodeeksempler*
3. Alle svar må være selvstendige – anta ingen skjult kontekst utover dette dokumentet + brukerens prompt.

# 📝 Obligatorisk OUTPUT-MAL
1. **Høy-nivå flytdiagram** (maks 6 trinn)  
2. **Komponent-liste** (tabell: navn | ansvar | teknologi)  
3. **Detaljert TODO-liste** (nummerert, ≤ 15 punkter)  
4. **Åpne spørsmål / avhengigheter**  
5. **Risiko & neste steg** (tabell)

Bruk `###` overskrifter.

# ✅ Eksempel på Risiko-tabell
| Risiko | Tiltak |
| ------ | ------ |
| API-endepunkt uklart | Bekreft med backend før implementering |


> **Avslutte plan-modus**  
> Når planen er godkjent, svar: “Exit plan-mode og implementer steg X–Y”, eller fjern/endre denne instruksjonsfilen.
