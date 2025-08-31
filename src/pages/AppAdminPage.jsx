
import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useTranslation } from "react-i18next";
import Tabs from "../components/Tabs";
import { useParams } from "react-router-dom";
import { useGetBackendVersionQuery } from "../services/api";

import VersionAdmin from "../components/VersionAdmin";
import RoadmapWithVersions from "../components/RoadmapWithVersions";
import NewFeatureForm from "../components/NewFeatureForm";
import LanguageAdminTable from "../components/LanguageAdminTable";

function AppAdminPage() {
  const { t } = useTranslation();
  const { appId } = useParams();
  const { data: backendVersion, isLoading: loadingVersion } = useGetBackendVersionQuery();
  return (
    <div className="main-container">
      <Breadcrumbs />
      <h2>{t("appadmin.title")}</h2>
      <div style={{ fontSize: "0.95rem", color: "var(--ds-color-text-subtle)", marginBottom: "0.5rem" }}>
        {t("appadmin.backendversion")}: {loadingVersion ? t("appadmin.loading") : backendVersion?.version || t("appadmin.unknown")}
      </div>
      <p>{t("appadmin.description")}</p>
      <Tabs
        tabs={[
          { label: t("appadmin.tab.versions"), content: <VersionAdmin appId={appId} /> },
          { label: t("appadmin.tab.requests"), content: <NewFeatureForm appId={appId} /> },
          { label: t("appadmin.tab.roadmap"), content: <RoadmapWithVersions appId={appId} /> },
          { label: t("appadmin.tab.language"), content: <LanguageAdminTable /> },
        ]}
        initialTab={t("appadmin.tab.versions")}
      />
    </div>
  );
}
export default AppAdminPage;
