import React, { useState } from "react";
import { Button, Textfield, Select, Checkbox, Alert, Spinner } from "@digdir/designsystemet-react";
import { useAddFeatureMutation, useGetStatusesQuery } from "../services/api";

export default function NewFeatureForm({ appId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statusId, setStatusId] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [createdBySub, setCreatedBySub] = useState("");
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
    try {
      await addFeature({
        app_id: appId,
        status_id: Number(statusId),
        title,
        description,
        created_by_sub: createdBySub || "user-123",
        is_private: isPrivate,
      }).unwrap();
      setTitle("");
      setDescription("");
      setStatusId("");
      setIsPrivate(false);
      setSuccess(true);
    } catch (err) {
      setError("Kunne ikke opprette funksjon.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem", maxWidth: 480 }}>
      <h3>Legg til ny funksjon</h3>
      {success && <Alert severity="success">Funksjon opprettet!</Alert>}
      {error && <Alert severity="danger">{error}</Alert>}
      <Textfield label="Tittel" value={title} onChange={e => setTitle(e.target.value)} required />
      <Textfield label="Beskrivelse" value={description} onChange={e => setDescription(e.target.value)} required multiline />
      <Select label="Versjon/status" value={statusId} onChange={e => setStatusId(e.target.value)} required>
        <option value="" disabled>Velg versjon/status</option>
        {statuses?.map(s => (
          <option key={s.id} value={s.id}>{s.label}</option>
        ))}
      </Select>
      <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)}>
        Privat funksjon
      </Checkbox>
      <Textfield label="Bruker-ID (valgfritt)" value={createdBySub} onChange={e => setCreatedBySub(e.target.value)} />
      <Button type="submit" disabled={isLoading}>Opprett funksjon</Button>
    </form>
  );
}
