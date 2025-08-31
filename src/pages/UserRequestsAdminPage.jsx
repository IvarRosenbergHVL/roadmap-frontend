import React from "react";
import { useParams } from "react-router-dom";
import UserRequestsAdminTable from "../components/UserRequestsAdminTable";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../components/Breadcrumbs";

export default function UserRequestsAdminPage() {
  const { appId } = useParams();
  const { t } = useTranslation();
  return (
    <div className="main-container">
      <h2>{t("userrequests.adminTitle")}</h2>
  <Breadcrumbs />
      <UserRequestsAdminTable appId={appId} />
    </div>
  );
}
