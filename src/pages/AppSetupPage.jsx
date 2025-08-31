import React from "react";
import { Link, useParams } from "react-router-dom";
import FeatureList from "../components/FeatureList";
import RoadmapView from "../components/RoadmapView";

export default function AppSetupPage() {
  const { appId } = useParams();
  // Her kan du hente app-data hvis ønskelig
  return (
    <div style={{ maxWidth: 640, margin: "2rem auto", padding: "2rem", background: "var(--ds-color-surface-default)", borderRadius: "1rem" }}>
      <h2>App-oversikt</h2>
      <p>Her ser du status, roadmap og funksjoner for denne appen.</p>
      <div style={{ marginBottom: "1.5rem" }}>
        <Link to={`/app/${appId}/admin`} style={{ float: "right", marginLeft: "1rem", textDecoration: "none" }}>
          <button>Admin for appen</button>
        </Link>
      </div>
      <RoadmapView appId={appId} />
      <FeatureList appId={appId} />
    </div>
  );
}
