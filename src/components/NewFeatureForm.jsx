import React, { useState } from "react";
import { useGetFeaturesQuery } from "../services/api";
import { Button, Textfield, Select, Checkbox, Alert, Spinner } from "@digdir/designsystemet-react";
import { useAddFeatureMutation, useGetStatusesQuery } from "../services/api";

export default function NewFeatureForm({ appId, statusId: propStatusId }) {
  const [parentId, setParentId] = useState(null);
  const { data: featuresData } = useGetFeaturesQuery(appId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionLong, setDescriptionLong] = useState("");
  const [statusId, setStatusId] = useState(propStatusId || "");
  const [isPrivate, setIsPrivate] = useState(false);
  const [createdBySub, setCreatedBySub] = useState("");
  const [votes, setVotes] = useState(0);
  const [priority, setPriority] = useState(1);
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [attachments, setAttachments] = useState("");
  const [isArchived, setIsArchived] = useState(false);
  const [order, setOrder] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { data: statuses, isLoading: loadingStatuses, isError: errorStatuses } = useGetStatusesQuery(appId);
  const [addFeature, { isLoading }] = useAddFeatureMutation();

  if (!appId) return <Alert severity="info">Velg en app for å legge til funksjon.</Alert>;
  if (loadingStatuses) return <Spinner title="Laster versjoner..." />;
  if (errorStatuses) return <Alert severity="danger">Kunne ikke laste versjoner.</Alert>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
      const now = new Date().toISOString();
      const payload = {
        // id settes av backend, ikke sendes fra frontend
        app_id: Number(appId),
        status_id: statusId ? Number(statusId) : undefined,
        title,
        description,
        description_long: descriptionLong,
        created_by_sub: createdBySub || "user-123",
        is_private: !!isPrivate,
        created_at: now,
        updated_at: now,
        parent_id: parentId !== null && parentId !== "" ? Number(parentId) : null,
        votes: votes ? Number(votes) : 0,
        priority: priority ? Number(priority) : 1,
        tags,
        category,
        attachments: attachments || "",
        is_archived: !!isArchived,
        order: order ? Number(order) : 1,
      };
    // Hvis statusId er valgt og backend bruker parent_id for hierarki, kan du legge til parent_id her
    // payload.parent_id = ...
    // Debug: logg payload
    console.log("POST /v1/features payload:", payload);
    try {
      await addFeature(payload).unwrap();
      setTitle("");
      setDescription("");
      setStatusId(propStatusId || "");
      setIsPrivate(false);
      setSuccess(true);
    } catch (err) {
      setError("Kunne ikke opprette funksjon. Sjekk at alle felter er fylt ut og gyldige.");
      console.error("POST /v1/features error:", err);
    }
  };

  return (
  <form onSubmit={handleSubmit} style={{ marginTop: "2rem", maxWidth: 480, display: "flex", flexDirection: "column", gap: 14 }}>
      <h3>Legg til ny funksjon</h3>
      {success && <Alert severity="success">Funksjon opprettet!</Alert>}
      {error && <Alert severity="danger">{error}</Alert>}
      <div style={{ marginBottom: 18 }}>
        <label htmlFor="parent_id" style={{ display: "block", marginBottom: 4 }}>
          Underfunksjon av:
        </label>
        <select
          id="parent_id"
          value={parentId || ""}
          onChange={e => setParentId(e.target.value ? e.target.value : null)}
          style={{ width: "100%", padding: 8 }}
        >
          <option value="">Ingen (hovedfunksjon)</option>
          {featuresData && featuresData.length > 0 && featuresData.map(f => (
            <option key={f.id} value={f.id}>{f.title}</option>
          ))}
        </select>
      </div>
      <Textfield label="Tittel" value={title} onChange={e => setTitle(e.target.value)} required />
      <Textfield label="Beskrivelse" value={description} onChange={e => setDescription(e.target.value)} required multiline />
      <Textfield
        label="Utfyllende beskrivelse"
        value={descriptionLong}
        onChange={e => setDescriptionLong(e.target.value)}
        multiline
  style={{ minHeight: '120px', marginBottom: '18px' }}
  rows={6}
      />
      {!propStatusId && (
        <Select label="Versjon/status" value={statusId} onChange={e => setStatusId(e.target.value)} required>
          <option value="" disabled>Velg versjon/status</option>
          {statuses?.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </Select>
      )}
      <Select label="Kategori" value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="" disabled>Velg kategori</option>
        <option value="Produkt">Produkt (funksjonalitet, kjernefunksjoner)</option>
        <option value="Teknisk">Teknisk (backend, infrastruktur, API)</option>
        <option value="UX/UI">UX/UI (brukeropplevelse, design)</option>
        <option value="Integrasjon">Integrasjon (koblinger mot andre systemer)</option>
        <option value="Sikkerhet">Sikkerhet (autentisering, personvern)</option>
        <option value="Ytelse">Ytelse (hastighet, skalering)</option>
        <option value="Data & Analyse">Data & Analyse (rapportering, logging)</option>
        <option value="Administrasjon">Administrasjon (innstillinger, roller)</option>
      </Select>
      <Textfield label="Tags (kommaseparert)" value={tags} onChange={e => setTags(e.target.value)} />
      <Textfield label="Vedlegg (filnavn eller URL)" value={attachments} onChange={e => setAttachments(e.target.value)} />
      <Textfield label="Prioritet" type="number" value={priority} onChange={e => setPriority(e.target.value)} min={1} />
      <Textfield label="Antall stemmer" type="number" value={votes} onChange={e => setVotes(e.target.value)} min={0} />
      <Textfield label="Sorteringsrekkefølge" type="number" value={order} onChange={e => setOrder(e.target.value)} min={1} />
            <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} label="Privat funksjon (kun synlig for admin)" />
            <Checkbox checked={isArchived} onChange={e => setIsArchived(e.target.checked)} label="Arkivert (skjules fra roadmap)" />
      <Textfield label="Bruker-ID (valgfritt)" value={createdBySub} onChange={e => setCreatedBySub(e.target.value)} />
      <Button type="submit" disabled={isLoading}>Opprett funksjon</Button>
    </form>
  );
}
