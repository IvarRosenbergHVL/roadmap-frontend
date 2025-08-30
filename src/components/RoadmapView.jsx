import React from "react";
import { Spinner, Alert, Tag } from "@digdir/designsystemet-react";
import { useGetStatusesQuery, useGetFeaturesQuery } from "../services/api";

export default function RoadmapView({ appId }) {
  // Hent statuser/versjoner for valgt app
  const { data: statuses, isLoading: loadingStatuses, isError: errorStatuses } = useGetStatusesQuery(appId);
  // Hent features for valgt app
  const { data: features, isLoading: loadingFeatures, isError: errorFeatures } = useGetFeaturesQuery(appId);

  if (!appId) return <Alert severity="info">Velg en app for å se roadmap.</Alert>;
  if (loadingStatuses || loadingFeatures) return <Spinner title="Laster roadmap..." />;
  if (errorStatuses || errorFeatures) return <Alert severity="danger">Kunne ikke laste roadmap.</Alert>;

  // Gruppér features per status_id
  const featuresByStatus = {};
  features?.forEach((f) => {
    if (!featuresByStatus[f.status_id]) featuresByStatus[f.status_id] = [];
    featuresByStatus[f.status_id].push(f);
  });

  return (
    <div>
      <h2 style={{ marginTop: "2rem" }}>Roadmap</h2>
      {statuses?.length === 0 && <Alert severity="info">Ingen versjoner/statuser registrert.</Alert>}
      {statuses?.map((status) => (
        <div key={status.id} style={{ marginBottom: "2rem" }}>
          <Tag variant={status.terminal ? "danger" : "success"} style={{ marginRight: 8 }}>
            {status.label}
          </Tag>
          <span style={{ color: "var(--ds-color-text-subtle)", fontSize: "0.95rem" }}>
            {status.terminal ? "(Endelig versjon)" : "(Planlagt/under utvikling)"}
          </span>
          <ul style={{ marginTop: 8 }}>
            {featuresByStatus[status.id]?.length ? (
              featuresByStatus[status.id].map((f) => (
                <li key={f.id}>
                  <strong>{f.title}</strong> — {f.description}
                </li>
              ))
            ) : (
              <li style={{ color: "var(--ds-color-text-subtle)" }}>Ingen funksjoner registrert for denne versjonen.</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
