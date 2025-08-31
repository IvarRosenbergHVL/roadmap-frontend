import React from "react";
import { Link, useParams } from "react-router-dom";
import FeatureList from "../components/FeatureList";
import RoadmapView from "../components/RoadmapView";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../components/Breadcrumbs";

export default function AppSetupPage() {
  const { t } = useTranslation();
  const { appId } = useParams();
  // Her kan du hente app-data hvis ønskelig
  return (
    <div style={{ maxWidth: 640, margin: "2rem auto", padding: "2rem", background: "var(--ds-color-surface-default)", borderRadius: "1rem" }}>
  <Breadcrumbs />
  <h2>{t("appsetup.title")}</h2>
  <p>{t("appsetup.description")}</p>
      <div style={{ marginBottom: "1.5rem" }}>
        <Link to={`/app/${appId}/admin`} style={{ float: "right", marginLeft: "1rem", textDecoration: "none" }}>
          <button>{t("appsetup.adminbtn")}</button>
        </Link>
      </div>
      <RoadmapView appId={appId} />
    </div>
  );
}
