import React, { useState } from "react";
import { Spinner, Alert, Tag, Button } from "@digdir/designsystemet-react";
import { useGetFeaturesQuery, useAddFeatureMutation } from "../services/api";

function SubFeatureList({ parentId }) {
  const { data: subFeatures, isLoading, isError } = useGetFeaturesQuery({ parent_id: parentId });
  if (isLoading) return <Spinner title="Laster sub-features..." />;
  if (isError) return <Alert severity="danger">Kunne ikke laste sub-features</Alert>;
  if (!subFeatures || subFeatures.length === 0) return null;
  return (
    <ul style={{ marginLeft: 24 }}>
      {subFeatures.map(sub => (
        <li key={sub.id}>
          <strong>{sub.title}</strong> — {sub.description}
          {/* Her kan du legge til flere sub-feature handlinger */}
        </li>
      ))}
    </ul>
  );
}

export default function RoadmapWithHierarchy({ appId, statusId }) {
  const { data: features, isLoading, isError } = useGetFeaturesQuery(appId);
  const [addFeature] = useAddFeatureMutation();
  const [newSubTitle, setNewSubTitle] = useState("");
  const [parentFeatureId, setParentFeatureId] = useState(null);

  if (isLoading) return <Spinner title="Laster roadmap..." />;
  if (isError) return <Alert severity="danger">Kunne ikke laste roadmap</Alert>;
  if (!features) return null;

  // Filtrer hoved-features (parent_id == null)
  const mainFeatures = features.filter(f => f.parent_id == null);

  return (
    <div>
      <h2>Roadmap med hierarki</h2>
      <ul>
        {mainFeatures.map(f => (
          <li key={f.id} style={{ marginBottom: "1.5rem" }}>
            <Tag>{f.title}</Tag> — {f.description}
            <SubFeatureList parentId={f.id} />
            <Button size="small" style={{ marginLeft: 8 }} onClick={() => setParentFeatureId(f.id)}>
              Legg til sub-feature
            </Button>
            {parentFeatureId === f.id && (
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  await addFeature({ app_id: appId, status_id: statusId, title: newSubTitle, parent_id: f.id });
                  setNewSubTitle("");
                  setParentFeatureId(null);
                }}
                style={{ marginTop: 8 }}
              >
                <input
                  type="text"
                  value={newSubTitle}
                  onChange={e => setNewSubTitle(e.target.value)}
                  placeholder="Tittel på sub-feature"
                  required
                  style={{ marginRight: 8 }}
                />
                <Button type="submit" size="small">Opprett</Button>
                <Button type="button" size="small" variant="secondary" onClick={() => setParentFeatureId(null)}>
                  Avbryt
                </Button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
