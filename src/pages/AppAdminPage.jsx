
import React from "react";
import Tabs from "../components/Tabs";
import { useParams } from "react-router-dom";
import { useGetBackendVersionQuery } from "../services/api";
import VersionAdmin from "../components/VersionAdmin";
import RoadmapWithVersions from "../components/RoadmapWithVersions";
import NewFeatureForm from "../components/NewFeatureForm";

function AppAdminPage() {
  const { appId } = useParams();
  const { data: backendVersion, isLoading: loadingVersion } = useGetBackendVersionQuery();
  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: "2rem", background: "var(--ds-color-surface-default)", borderRadius: "1rem" }}>
      <h2>Admin for appen</h2>
      <div style={{ fontSize: "0.95rem", color: "var(--ds-color-text-subtle)", marginBottom: "0.5rem" }}>
        Backend-versjon: {loadingVersion ? "Laster..." : backendVersion?.version || "Ukjent"}
      </div>
      <p>Her kan du administrere roadmap, versjoner/statuser og funksjonsønsker.</p>
      <Tabs
        tabs={[
          { label: "Versjoner", content: <VersionAdmin appId={appId} /> },
          { label: "Brukerforespørsler", content: <NewFeatureForm appId={appId} /> },
          { label: "Roadmap", content: <RoadmapWithVersions appId={appId} /> },
        ]}
        initialTab="Versjoner"
      />
    </div>
  );
}
export default AppAdminPage;
