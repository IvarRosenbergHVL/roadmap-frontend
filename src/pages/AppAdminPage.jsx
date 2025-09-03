import React, { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { Card } from "@digdir/designsystemet-react";
import { CogIcon } from "@navikt/aksel-icons";
import { Tabs } from "@digdir/designsystemet-react";
import { useParams } from "react-router-dom";
import { useGetBackendVersionQuery } from "../services/api";
import VersionAdmin from "../components/VersionAdmin";
import RoadmapWithVersions from "../components/RoadmapWithVersions";
import NewFeatureForm from "../components/NewFeatureForm";
import LanguageAdminTable from "../components/LanguageAdminTable";
import {
  TasklistIcon ,
  ChatIcon,
  PersonIcon,
} from "@navikt/aksel-icons";

function AppAdminPage() {
  const { t } = useTranslation();
  const { appId } = useParams();
  const { data: backendVersion, isLoading: loadingVersion } = useGetBackendVersionQuery();
  const [activeTab, setActiveTab] = useState("Versjoner");

  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#F3F6FA", display: "flex", justifyContent: "center", paddingTop: 40 }}>
      <div style={{ maxWidth: "1400px", width: "100%", padding: "0 24px" }}>
        <Breadcrumbs />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <CogIcon style={{ fontSize: 32, color: "var(--ds-color-interaction-primary)" }} />
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: 28, color: "var(--ds-color-text-default)" }}>{t("appadmin.title")}</h2>
        </div>
        <Card style={{ marginBottom: 24, background: "#fff", border: "none", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 24 }}>
          <div style={{ fontSize: 16, color: "var(--ds-color-text-subtle)", marginBottom: 4 }}>
            {t("appadmin.backendversion")}: {loadingVersion ? t("appadmin.loading") : backendVersion?.version || t("appadmin.unknown")}
          </div>
          <p style={{ margin: 0, fontSize: 15 }}>{t("appadmin.description")}</p>
        </Card>
        <div style={{ display: "flex", gap: 32 }}>
          <div style={{ flex: 2, maxWidth: 1100 }}>
            <Card style={{ minHeight: 400, padding: 40, borderRadius: 18, boxShadow: "0 4px 18px rgba(0,0,0,0.10)", background: "#fff", width: "100%" }}>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                size="large"
                style={{ marginBottom: 32, width: "100%" }}
              >
                <Tabs.List>
                <Tabs.Tab value="Versjoner" icon={<TasklistIcon aria-hidden style={{ color: '#0070f3', fontSize: 28 }} />}>{t("appadmin.tab.versions")}</Tabs.Tab>
                <Tabs.Tab value="Brukerforespørsler" icon={<ChatIcon aria-hidden style={{ color: '#059669', fontSize: 28 }} />}>{t("appadmin.tab.requests")}</Tabs.Tab>
                <Tabs.Tab value="Roadmap" icon={<CogIcon aria-hidden style={{ color: '#ff9100', fontSize: 28 }} />}>{t("appadmin.tab.roadmap")}</Tabs.Tab>
                <Tabs.Tab value="Brukere" icon={<PersonIcon aria-hidden style={{ color: '#e53e3e', fontSize: 28 }} />}>{t("appadmin.tab.users")}</Tabs.Tab>
              </Tabs.List>
            </Tabs>
            <div style={{ padding: "16px 0 0 0" }}>
              {activeTab === "Versjoner" && <VersionAdmin appId={appId} />}
              {activeTab === "Brukerforespørsler" && <NewFeatureForm appId={appId} />}
              {activeTab === "Roadmap" && <RoadmapWithVersions appId={appId} />}
              {activeTab === "Brukere" && <LanguageAdminTable />}
            </div>
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
