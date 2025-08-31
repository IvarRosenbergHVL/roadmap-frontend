import React from "react";
import RoadmapWithVersions from "../components/RoadmapWithVersions";
import { useParams, useSearchParams } from "react-router-dom";

export default function AppFeaturesPage() {
  const { appId } = useParams();
  const [searchParams] = useSearchParams();
  const statusId = searchParams.get("status_id");

  // Pass statusId to RoadmapWithVersions for filtering
  return (
    <div className="main-container">
      <h2>Funksjoner for app {appId}</h2>
      <RoadmapWithVersions appId={appId} statusId={statusId} />
    </div>
  );
}
