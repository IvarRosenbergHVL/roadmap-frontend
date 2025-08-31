import React from "react";
import { useGetFeaturesQuery, useGetStatusesQuery, useUpdateFeatureStatusMutation, useAddFeatureMutation } from "../services/api";
import { useDeleteFeatureMutation, useUpdateFeatureMutation } from "../services/api";
import NewFeatureForm from "./NewFeatureForm";
import { Spinner, Alert, Tag, Select } from "@digdir/designsystemet-react";
import { Button } from "@digdir/designsystemet-react";

export default function RoadmapWithVersions({ appId, statusId }) {
  // Alle hooks skal kalles først!
  const { data: statuses, isLoading: loadingStatuses, isError: errorStatuses } = useGetStatusesQuery(appId);
  const { data: features, isLoading, isError } = useGetFeaturesQuery(appId);
  const [updateFeatureStatus] = useUpdateFeatureStatusMutation();
  const [deleteFeature] = useDeleteFeatureMutation();
  const [updateFeature] = useUpdateFeatureMutation();
  const [editId, setEditId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState("");
  const [editDescription, setEditDescription] = React.useState("");
  const [editError, setEditError] = React.useState("");

  // Tidlig return etter hooks
  if (loadingStatuses || isLoading) return <Spinner title="Laster roadmap..." />;
  if (errorStatuses || isError) return <Alert severity="danger">Kunne ikke laste roadmap</Alert>;
  if (!statuses || !features) return null;

  // Hvis statusId er satt, vis kun den statusen og dens features
  let grouped;
  if (statusId) {
    const status = statuses.find((s) => String(s.id) === String(statusId));
    if (!status) return <Alert severity="warning">Fant ikke valgt versjon/status</Alert>;
    grouped = [{
      ...status,
      features: features.filter((f) => String(f.status_id) === String(statusId)),
    }];
  } else {
    grouped = statuses.map((status) => ({
      ...status,
      features: features.filter((f) => f.status_id === status.id),
    }));
  }

  const startEdit = (f) => {
    setEditId(f.id);
    setEditTitle(f.title);
    setEditDescription(f.description);
    setEditError("");
  };
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
    setEditError("");
  };
  const saveEdit = async (f) => {
    try {
      await updateFeature({ id: f.id, title: editTitle, description: editDescription }).unwrap();
      cancelEdit();
    } catch (err) {
      setEditError("Kunne ikke oppdatere funksjon.");
    }
  };

  return (
    <div>
      <h2>Roadmap</h2>
      {/* Skjema for ny feature */}
      {statusId && <NewFeatureForm appId={appId} statusId={statusId} />}
      {grouped.map((group) => (
        <section key={group.id} style={{ marginBottom: "2rem" }}>
          <h3>
            <Tag variant={group.terminal ? "success" : "info"}>{group.label}</Tag>
          </h3>
          <ul>
            {group.features.map((f) => (
              <li key={f.id} style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
                {editId === f.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      style={{ marginRight: 8, minWidth: 120 }}
                    />
                    <input
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                      style={{ marginRight: 8, minWidth: 180 }}
                    />
                    <Button size="small" onClick={() => saveEdit(f)} style={{ marginRight: 4 }}>Lagre</Button>
                    <Button size="small" variant="secondary" onClick={cancelEdit}>Avbryt</Button>
                    {editError && <Alert severity="danger">{editError}</Alert>}
                  </>
                ) : (
                  <>
                    <strong>{f.title}</strong> — {f.description}
                    <Select
                      label="Flytt til versjon"
                      value={f.status_id}
                      onChange={e => updateFeatureStatus({ id: f.id, status_id: e.target.value })}
                      options={statuses.map((s) => ({ value: s.id, label: s.label }))}
                      style={{ marginLeft: "1rem", minWidth: 120 }}
                    />
                    <Button size="small" variant="secondary" style={{ marginLeft: 8 }} onClick={() => startEdit(f)}>
                      Rediger
                    </Button>
                    <Button size="small" variant="danger" style={{ marginLeft: 4 }} onClick={() => deleteFeature(f.id)}>
                      Slett
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
