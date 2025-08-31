import React from "react";
import { useGetFeaturesQuery, useGetStatusesQuery, useUpdateFeatureStatusMutation, useAddFeatureMutation } from "../services/api";
import { useDeleteFeatureMutation, useUpdateFeatureMutation } from "../services/api";
import NewFeatureForm from "./NewFeatureForm";
import { Spinner, Alert, Tag, Select } from "@digdir/designsystemet-react";
import { Button } from "@digdir/designsystemet-react";

export default function RoadmapWithVersions({ appId, statusId }) {
  const [showNewForm, setShowNewForm] = React.useState(false);
  const [editFeature, setEditFeature] = React.useState(null);
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
  setEditFeature(f);
  setShowNewForm(false);
  setEditError("");
  };
  const cancelEdit = () => {
  setEditFeature(null);
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
      <div style={{ marginBottom: 18 }}>
        <Button size="small" variant="primary" onClick={() => setShowNewForm(true)}>
          Ny funksjon
        </Button>
      </div>
      {/* Skjema for ny feature vises kun hvis showNewForm=true */}
      {showNewForm && !editFeature && (
        <NewFeatureForm appId={appId} statusId={statusId} onCancel={() => setShowNewForm(false)} />
      )}
      {/* Skjema for redigering vises kun hvis editFeature er satt */}
      {editFeature && (
        <NewFeatureForm
          appId={appId}
          statusId={editFeature.status_id ?? ""}
          initialTitle={editFeature.title ?? ""}
          initialDescription={editFeature.description ?? ""}
          initialDescriptionLong={editFeature.description_long ?? ""}
          initialCategory={editFeature.category ?? ""}
          initialTags={editFeature.tags ?? ""}
          initialPriority={editFeature.priority ?? 1}
          initialVotes={editFeature.votes ?? 0}
          initialOrder={editFeature.order ?? 1}
          initialIsPrivate={editFeature.is_private ?? false}
          initialIsArchived={editFeature.is_archived ?? false}
          initialParentId={editFeature.parent_id ?? null}
          initialAttachments={editFeature.attachments ?? ""}
          initialCreatedBySub={editFeature.created_by_sub ?? ""}
          featureId={editFeature.id}
          onCancel={cancelEdit}
          onSaved={cancelEdit}
        />
      )}
      {grouped.map((group) => (
        <section key={group.id} style={{ marginBottom: "2rem" }}>
          <h3>
            <Tag variant={group.terminal ? "success" : "info"}>{group.label}</Tag>
          </h3>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {group.features
              .filter(f => !f.parent_id)
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((f) => (
                <React.Fragment key={f.id}>
                  <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", background: "#f7f7fa", borderRadius: 6, padding: "8px 12px" }}>
                    {editId === f.id ? (
                      null
                    ) : (
                      <>
                        <strong>{f.title}</strong> — {f.description}
                        <Select
                          label="Flytt til versjon"
                          value={f.status_id}
                          onChange={e => updateFeatureStatus({ id: f.id, status_id: e.target.value })}
                          options={statuses.map((s) => ({ value: s.id, label: s.label }))}
                          style={{ marginLeft: "1rem", width: 110, minWidth: 0, maxWidth: 120, fontSize: "0.95rem", padding: "2px 6px" }}
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
                  {/* Sub-features vises med innrykk under parent */}
                  {group.features
                    .filter(sf => sf.parent_id === f.id)
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map(sf => (
                      <li key={sf.id} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", background: "#f7f7fa", borderRadius: 6, padding: "8px 12px", marginLeft: 32 }}>
                        <strong>{sf.title}</strong> — {sf.description}
                        <Select
                          label="Flytt til versjon"
                          value={sf.status_id}
                          onChange={e => updateFeatureStatus({ id: sf.id, status_id: e.target.value })}
                          options={statuses.map((s) => ({ value: s.id, label: s.label }))}
                          style={{ marginLeft: "1rem", width: 110, minWidth: 0, maxWidth: 120, fontSize: "0.95rem", padding: "2px 6px" }}
                        />
                        <Button size="small" variant="secondary" style={{ marginLeft: 8 }} onClick={() => startEdit(sf)}>
                          Rediger
                        </Button>
                        <Button size="small" variant="danger" style={{ marginLeft: 4 }} onClick={() => deleteFeature(sf.id)}>
                          Slett
                        </Button>
                      </li>
                    ))}
                </React.Fragment>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
