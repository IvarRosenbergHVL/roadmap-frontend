

import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { Card } from "@digdir/designsystemet-react";
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
    <div style={{ width: "100vw", display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <div style={{ maxWidth: "1100px", width: "100%" }}>
      <Breadcrumbs />
      <h2 style={{ marginBottom: "0.5rem" }}>{t("appadmin.title")}</h2>
      <Card style={{ marginBottom: "1.5rem", background: "var(--ds-color-surface-subtle)", border: "none" }}>
        <div style={{ fontSize: "1rem", color: "var(--ds-color-text-subtle)", marginBottom: "0.2rem" }}>
          {t("appadmin.backendversion")}: {loadingVersion ? t("appadmin.loading") : backendVersion?.version || t("appadmin.unknown")}
        </div>
        <p style={{ margin: 0 }}>{t("appadmin.description")}</p>
      </Card>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ flex: 2 }}>
            <Card shadow style={{ minHeight: 400, padding: "2rem" }}>
              <Tabs
                tabs={[
                  { label: t("appadmin.tab.versions"), content: <VersionAdmin appId={appId} /> },
                  { label: t("appadmin.tab.requests"), content: <NewFeatureForm appId={appId} /> },
                  { label: t("appadmin.tab.roadmap"), content: <RoadmapWithVersions appId={appId} /> },
                  { label: t("appadmin.tab.language"), content: <LanguageAdminTable /> },
                ]}
                initialTab={t("appadmin.tab.versions")}
                tabSize="large"
              />
            </Card>
          </div>
          <div style={{ flex: 1 }}>
            {/* Her kan du legge til ekstra admin-widgets, statistikk, eller hjelpeinfo senere */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AppAdminPage;
