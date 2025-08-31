import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Tabs, Textfield } from "@digdir/designsystemet-react";
import { useTranslation } from "react-i18next";
import UserRequestList from "../components/UserRequestList";
import NewUserRequestForm from "../components/NewUserRequestForm";
import Breadcrumbs from "../components/Breadcrumbs";

const tabOptions = [
  { key: "trending", label: "userrequests.tab.trending" },
  { key: "top", label: "userrequests.tab.top" },
  { key: "new", label: "userrequests.tab.new" },
  { key: "mine", label: "userrequests.tab.mine" },
  { key: "status", label: "userrequests.tab.status" },
];

export default function UserRequestsPageV2() {
  const { appId } = useParams();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("trending");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="main-container" style={{ maxWidth: 900, margin: "0 auto" }}>
      <Breadcrumbs />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2>{t("userrequests.title")}</h2>
          <p style={{ color: "#666", marginTop: 4 }}>{t("userrequests.subtitle")}</p>
        </div>
        <Button variant="primary" size="large" onClick={() => setShowForm(true)}>
          {t("userrequests.makeSuggestion")}
        </Button>
      </div>
      <Tabs value={activeTab} onChange={setActiveTab} style={{ marginBottom: 18 }}>
        {tabOptions.map(tab => (
          <Tabs.Tab key={tab.key} value={tab.key} label={t(tab.label)} />
        ))}
      </Tabs>
      <div style={{ marginBottom: 18 }}>
        <Textfield
          label={t("userrequests.search")}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t("userrequests.searchPlaceholder")}
        />
      </div>
      <UserRequestList appId={appId} tab={activeTab} search={search} />
      {showForm && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.25)", zIndex: 1000 }}>
          <div style={{ background: "#fff", maxWidth: 500, margin: "60px auto", padding: 32, borderRadius: 12, boxShadow: "0 2px 16px #0002" }}>
            <NewUserRequestForm appId={appId} />
            <Button variant="secondary" style={{ marginTop: 16 }} onClick={() => setShowForm(false)}>
              {t("userrequests.cancel")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
