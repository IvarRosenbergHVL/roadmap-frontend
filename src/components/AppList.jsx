import React from "react";
import { useGetAppsQuery } from "../services/api";
import { Spinner, Alert, Button } from "@digdir/designsystemet-react";
import FeatureList from "./FeatureList";
import RoadmapView from "./RoadmapView";
import NewFeatureForm from "./NewFeatureForm";

import { useNavigate } from "react-router-dom";

export default function AppList(props) {
  const { data: apps, isLoading, isError } = useGetAppsQuery();
  console.log("Apps fra backend:", apps);
  const { selectedAppId, setSelectedAppId } = props;
  const navigate = useNavigate();

  if (isLoading) return <Spinner title="Laster apper..." />;
  if (isError) return <Alert severity="danger">Kunne ikke laste apper</Alert>;

  return (
    <>
      <ul>
        {apps?.map((app) => (
          <li key={app.id}>
            <Button
              onClick={() => {
                setSelectedAppId(app.id);
                navigate(`/app/${app.id}`);
              }}
              variant={app.id === selectedAppId ? "primary" : "secondary"}
            >
              {app.name}
            </Button>
          </li>
        ))}
      </ul>
  {selectedAppId && <FeatureList appId={selectedAppId} />}
  {selectedAppId && <RoadmapView appId={selectedAppId} />}
  {selectedAppId && <NewFeatureForm appId={selectedAppId} />}
    </>
  );
}
