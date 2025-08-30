import React, { useState } from "react";
import { useGetAppsQuery } from "../services/api";
import { Spinner, Alert, Button } from "@digdir/designsystemet-react";
import FeatureList from "./FeatureList";

export default function AppList() {
  const { data: apps, isLoading, isError } = useGetAppsQuery();
  console.log("Apps fra backend:", apps);
  const [selectedAppId, setSelectedAppId] = useState(null);

  if (isLoading) return <Spinner title="Laster apper..." />;
  if (isError) return <Alert severity="danger">Kunne ikke laste apper</Alert>;

  return (
    <>
      <ul>
        {apps?.map((app) => (
          <li key={app.id}>
            <Button onClick={() => setSelectedAppId(app.id)}>{app.name}</Button>
          </li>
        ))}
      </ul>
      <FeatureList appId={selectedAppId} />
      <RoadmapView appId={selectedAppId} />
    </>
  );
}
