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
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem" }}>
        <Link to={`/app/${appId}/admin`} style={{ textDecoration: "none" }}>
          <button>{t("appsetup.adminbtn")}</button>
        </Link>
        <Link to={`/app/${appId}/user-requests-v2`} style={{ textDecoration: "none" }}>
          <button style={{ background: "#6e4ad2", color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", fontSize: 16 }}>
            {t("appfeatures.userRequestsLink")}
          </button>
        </Link>
      </div>
      <RoadmapView appId={appId} />
    </div>
  );
}
