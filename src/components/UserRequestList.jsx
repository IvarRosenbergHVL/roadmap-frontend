import React from "react";
import { useGetUserRequestsQuery, useVoteUserRequestMutation } from "../services/api";
import { Spinner, Alert, Button, Tag } from "@digdir/designsystemet-react";
import { useTranslation } from "react-i18next";

export default function UserRequestList({ appId }) {
  const { t } = useTranslation();
  const { data: requests, isLoading, isError } = useGetUserRequestsQuery(appId);
  const [voteUserRequest] = useVoteUserRequestMutation();

  if (isLoading) return <Spinner title={t("userrequests.loading")} />;
  if (isError) return <Alert severity="danger">{t("userrequests.loaderror")}</Alert>;
  if (!requests || requests.length === 0) return <Alert severity="info">{t("userrequests.empty")}</Alert>;

  return (
    <ul style={{ marginTop: 24 }}>
      {requests.map(req => (
        <li key={req.id} style={{ marginBottom: 18, background: "#f7f7fa", borderRadius: 6, padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <strong>{req.title}</strong>
            <Tag>{t(`userrequests.category.${req.category}`)}</Tag>
            <span style={{ color: "#888" }}>{t(`userrequests.status.${req.status}`)}</span>
            <Button size="small" variant="primary" onClick={() => voteUserRequest({ id: req.id })}>
              {t("userrequests.vote")}
            </Button>
            <span style={{ fontWeight: 600 }}>{req.votes}</span>
          </div>
          <div style={{ marginTop: 8 }}>{req.description}</div>
        </li>
      ))}
    </ul>
  );
}
