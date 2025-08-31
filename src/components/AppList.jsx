import React from "react";
import { useGetAppsQuery } from "../services/api";
import { Spinner, Alert, Button } from "@digdir/designsystemet-react";
import FeatureList from "./FeatureList";
import RoadmapView from "./RoadmapView";
import NewFeatureForm from "./NewFeatureForm";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function AppList(props) {
  const { t } = useTranslation();
  const { data: apps, isLoading, isError } = useGetAppsQuery();
  if (apps) console.log("Apps fra backend:", apps);
  const { selectedAppId, setSelectedAppId } = props;
  const navigate = useNavigate();

  if (isLoading) return <Spinner title={t("applist.loading")} />;
  if (isError) return <Alert severity="danger">{t("applist.loaderror")}</Alert>;

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
      {/* Fjern dobbel visning av roadmap/features i oversikten. Disse vises kun på app-siden. */}
    </>
  );
}
