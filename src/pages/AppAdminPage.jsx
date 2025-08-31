import React from "react";
import { useParams } from "react-router-dom";
import VersionAdmin from "../components/VersionAdmin";
import RoadmapWithVersions from "../components/RoadmapWithVersions";
import NewFeatureForm from "../components/NewFeatureForm";

export default function AppAdminPage() {
  const { appId } = useParams();
  return (
    <div style={{ maxWidth: 640, margin: "2rem auto", padding: "2rem", background: "var(--ds-color-surface-default)", borderRadius: "1rem" }}>
      <h2>Admin for appen</h2>
      <p>Her kan du administrere roadmap, versjoner/statuser og legge til nye funksjoner.</p>
      <VersionAdmin appId={appId} />
      <RoadmapWithVersions appId={appId} />
      <NewFeatureForm appId={appId} />
      {/* Her kan du utvide med flere admin-funksjoner senere */}
    </div>
  );
}
