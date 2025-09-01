import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserRequestsQuery } from "../services/api";
import { Spinner, Alert, Tag, Button } from "@digdir/designsystemet-react";
import { useTranslation } from "react-i18next";
import UserRequestComments from "../components/UserRequestComments";
import Breadcrumbs from "../components/Breadcrumbs";

export default function UserRequestDetailPage() {
  const { appId, requestId } = useParams();
  const { t } = useTranslation();
  const { data: requests, isLoading, isError } = useGetUserRequestsQuery(appId);
  if (isLoading) return <Spinner title={t("userrequests.loading")} />;
  if (isError) return <Alert severity="danger">{t("userrequests.loaderror")}</Alert>;
  const request = requests?.find(r => String(r.id) === String(requestId));
  if (!request) return <Alert severity="danger">{t("userrequests.loaderror")}</Alert>;

  return (
    <div className="main-container" style={{ maxWidth: 700, margin: "0 auto" }}>
      <Breadcrumbs />
      <h2>{request.title}</h2>
      <div style={{ marginBottom: 12, color: "#666" }}>{request.description}</div>
      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        <Tag>{t(`userrequests.category.${request.category}`)}</Tag>
        <span style={{ color: "#888" }}>{t(`userrequests.status.${request.status}`)}</span>
        <span style={{ color: "#888" }}>{request.votes} {t("userrequests.votes")}</span>
      </div>
      <UserRequestComments requestId={request.id} />
    </div>
  );
}
