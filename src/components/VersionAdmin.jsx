import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetStatusesQuery, useAddStatusMutation, useUpdateStatusMutation, useDeleteStatusMutation } from "../services/api";
import { Spinner, Alert, Button, Textfield, Tag } from "@digdir/designsystemet-react";

export default function VersionAdmin({ appId }) {
  const { data: statuses, isLoading, isError } = useGetStatusesQuery(appId);
  const [addStatus] = useAddStatusMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [deleteStatus] = useDeleteStatusMutation();
  const [newLabel, setNewLabel] = useState("");
  const [newTerminal, setNewTerminal] = useState(false);

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
      <form
        onSubmit={async e => {
          e.preventDefault();
          await addStatus({ app_id: appId, label: newLabel, sort_index: statuses.length + 1, terminal: newTerminal });
          setNewLabel("");
          setNewTerminal(false);
        }}
        style={{ marginTop: "2rem" }}
      >
        <Textfield label="Ny versjon/status" value={newLabel} onChange={e => setNewLabel(e.target.value)} required />
        <label style={{ marginLeft: 8 }}>
          <input type="checkbox" checked={newTerminal} onChange={e => setNewTerminal(e.target.checked)} /> Terminal (lansert)
        </label>
        <Button type="submit" style={{ marginLeft: 8 }}>Opprett</Button>
      </form>
    </div>
  );
}
