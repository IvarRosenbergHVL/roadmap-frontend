import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useTranslation } from "react-i18next";
import RoadmapWithVersions from "../components/RoadmapWithVersions";
import { useParams, useSearchParams } from "react-router-dom";

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
      <RoadmapWithVersions appId={appId} statusId={statusId} />
    </div>
  );
}
