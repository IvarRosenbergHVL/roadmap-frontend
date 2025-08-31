import React from "react";
import { useParams } from "react-router-dom";
import UserRequestList from "../components/UserRequestList";
import NewUserRequestForm from "../components/NewUserRequestForm";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../components/Breadcrumbs";

export default function UserRequestsPage() {
  const { appId } = useParams();
  const { t } = useTranslation();
  return (
    <div className="main-container">
      <h2>{t("userrequests.title")}</h2>
  <Breadcrumbs />
      <NewUserRequestForm appId={appId} />
      <UserRequestList appId={appId} />
    </div>
  );
}
