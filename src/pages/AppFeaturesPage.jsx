import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useTranslation } from "react-i18next";
import RoadmapWithVersions from "../components/RoadmapWithVersions";
import { useParams, useSearchParams, Link } from "react-router-dom";

export default function AppFeaturesPage() {
  const { t } = useTranslation();
  const { appId } = useParams();
  const [searchParams] = useSearchParams();
  const statusId = searchParams.get("status_id");

  // Pass statusId to RoadmapWithVersions for filtering
  return (
    <div className="main-container">
      <Breadcrumbs />
      <h2>{t("appfeatures.title", { appId })}</h2>
      <div style={{ marginBottom: 16 }}>
        <Link to={`/app/${appId}/user-requests-v2`}>
          <button style={{ padding: "8px 18px", fontSize: 16, background: "#6e4ad2", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            {t("appfeatures.userRequestsLink")}
          </button>
        </Link>
      </div>
      <RoadmapWithVersions appId={appId} statusId={statusId} />
    </div>
  );
}
