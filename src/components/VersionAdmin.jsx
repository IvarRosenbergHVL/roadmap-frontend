import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetStatusesQuery, useAddStatusMutation, useUpdateStatusMutation, useDeleteStatusMutation } from "../services/api";
import { Spinner, Alert, Button, Textfield, Tag } from "@digdir/designsystemet-react";

export default function VersionAdmin({ appId }) {
  const [errorMsg, setErrorMsg] = useState("");
  const { data: statuses, isLoading, isError } = useGetStatusesQuery(appId);
  const [addStatus] = useAddStatusMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [deleteStatus] = useDeleteStatusMutation();
  const [newType, setNewType] = useState("MINOR");
  const [newTerminal, setNewTerminal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newReleasedAt, setNewReleasedAt] = useState("");

  // Finn siste versjon
  const lastVersion = statuses && statuses.length > 0
    ? statuses
        .map(s => s.label)
        .filter(label => /^\d+\.\d+\.\d+$/.test(label))
        .sort((a, b) => {
          const [aMaj, aMin, aPatch] = a.split(".").map(Number);
          const [bMaj, bMin, bPatch] = b.split(".").map(Number);
          if (aMaj !== bMaj) return bMaj - aMaj;
          if (aMin !== bMin) return bMin - aMin;
          return bPatch - aPatch;
        })[0]
    : "0.0.0";

  function getNextVersion(type) {
    const [maj, min, patch] = lastVersion.split(".").map(Number);
    if (type === "MAJOR") return `${maj + 1}.0.0`;
    if (type === "MINOR") return `${maj}.${min + 1}.0`;
    return `${maj}.${min}.${patch + 1}`;
  }
  const nextVersion = getNextVersion(newType);

  if (isLoading) return <Spinner title="Laster versjoner..." />;
  if (isError) return <Alert severity="danger">Kunne ikke laste versjoner/statuser</Alert>;

  return (
    <div>
      <h3>Versjoner/statuser</h3>
      <ul>
        {statuses?.map((status) => (
          <li key={status.id} style={{ marginBottom: "1rem" }}>
            <Tag variant={status.terminal ? "success" : "info"}>{status.label}</Tag>
            <Button size="small" style={{ marginLeft: 8 }} onClick={() => deleteStatus(status.id)}>Slett</Button>
            {/* Her kan du legge til redigeringsfunksjon for label/sort_index/terminal */}
          </li>
        ))}
      </ul>
      <form onSubmit={async e => {
        e.preventDefault();
        setErrorMsg("");
        const payload = {
          app_id: Number(appId),
          label: nextVersion,
          title: newTitle,
          description: newDescription,
          released_at: newReleasedAt,
          sort_index: statuses.length + 1,
          terminal: newTerminal
        };
        try {
          await addStatus(payload).unwrap();
          setNewType("MINOR");
          setNewTerminal(false);
          setNewTitle("");
          setNewDescription("");
          setNewReleasedAt("");
        } catch (err) {
          setErrorMsg("Kunne ikke opprette versjon. Sjekk at alle felter er fylt ut riktig og prøv igjen.");
        }
      }} style={{ marginTop: "2rem" }}>
        {errorMsg && <Alert severity="danger">{errorMsg}</Alert>}
        <label style={{ marginRight: 8 }}>
          Type versjon:
          <select value={newType} onChange={e => setNewType(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="MAJOR">MAJOR</option>
            <option value="MINOR">MINOR</option>
            <option value="PATCH">PATCH</option>
          </select>
        </label>
        <Textfield label="Neste versjon (SemVer)" value={nextVersion} readOnly style={{ width: 120, marginLeft: 8 }} />
        <Textfield label="Tittel" value={newTitle} onChange={e => setNewTitle(e.target.value)} required style={{ marginLeft: 8, width: 180 }} />
        <Textfield label="Beskrivelse" value={newDescription} onChange={e => setNewDescription(e.target.value)} multiline required style={{ marginLeft: 8, width: 240 }} />
        <Textfield label="Release-dato" type="datetime-local" value={newReleasedAt} onChange={e => setNewReleasedAt(e.target.value)} required style={{ marginLeft: 8, width: 200 }} />
        <label style={{ marginLeft: 8 }}>
          <input type="checkbox" checked={newTerminal} onChange={e => setNewTerminal(e.target.checked)} /> Terminal (lansert)
        </label>
        <Button type="submit" style={{ marginLeft: 8 }}>Opprett</Button>
      </form>
    </div>
  );
}
