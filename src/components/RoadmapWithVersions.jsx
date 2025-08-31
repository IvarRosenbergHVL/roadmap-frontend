import React from "react";
import { useGetFeaturesQuery, useGetStatusesQuery, useUpdateFeatureStatusMutation } from "../services/api";
import { Spinner, Alert, Tag, Select } from "@digdir/designsystemet-react";

export default function RoadmapWithVersions({ appId }) {
  // Hent alle statuser/versjoner for appen
  const { data: statuses, isLoading: loadingStatuses, isError: errorStatuses } = useGetStatusesQuery(appId);
  const { data: features, isLoading, isError } = useGetFeaturesQuery(appId);
  const [updateFeatureStatus] = useUpdateFeatureStatusMutation ? useUpdateFeatureStatusMutation() : [() => {}];

  if (loadingStatuses || isLoading) return <Spinner title="Laster roadmap..." />;
  if (errorStatuses || isError) return <Alert severity="danger">Kunne ikke laste roadmap</Alert>;
  if (!statuses || !features) return null;

  // Gruppér features per versjon/status
  const grouped = statuses.map((status) => ({
    ...status,
    features: features.filter((f) => f.status_id === status.id),
  }));

  return (
    <div>
      <h2>Roadmap</h2>
      {grouped.map((group) => (
        <section key={group.id} style={{ marginBottom: "2rem" }}>
          <h3>
            <Tag variant={group.terminal ? "success" : "info"}>{group.label}</Tag>
          </h3>
          <ul>
            {group.features.map((f) => (
              <li key={f.id} style={{ marginBottom: "1rem" }}>
                <strong>{f.title}</strong> — {f.description}
                <Select
                  label="Flytt til versjon"
                  value={f.status_id}
                  onChange={e => updateFeatureStatus({ id: f.id, status_id: e.target.value })}
                  options={statuses.map((s) => ({ value: s.id, label: s.label }))}
                  style={{ marginLeft: "1rem", minWidth: 120 }}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
