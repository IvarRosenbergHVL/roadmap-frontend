import React from "react";
import UserRequestComments from "./UserRequestComments";
import { useGetUserRequestsQuery, useVoteUserRequestMutation } from "../services/api";
import { Spinner, Alert, Button, Tag } from "@digdir/designsystemet-react";
import { useTranslation } from "react-i18next";

export default function UserRequestList({ appId, tab = "trending", search = "" }) {
  const { t } = useTranslation();
  const { data: requests, isLoading, isError } = useGetUserRequestsQuery(appId);
  const [voteUserRequest] = useVoteUserRequestMutation();

  if (isLoading) return <Spinner title={t("userrequests.loading")} />;
  if (isError) return <Alert severity="danger">{t("userrequests.loaderror")}</Alert>;
  if (!requests || requests.length === 0) return <Alert severity="info">{t("userrequests.empty")}</Alert>;

  // Simple filtering/sorting logic (replace with backend support if available)
  let filtered = requests;
  if (search) {
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (tab === "top") {
    filtered = [...filtered].sort((a, b) => b.votes - a.votes);
  } else if (tab === "new") {
    filtered = [...filtered].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else if (tab === "mine") {
    // Placeholder: filter by current user if available
    filtered = filtered.filter(r => r.isMine);
  } // Add more tab logic as needed

  return (
    <ul style={{ marginTop: 24 }}>
      {filtered.map(req => (
        <li key={req.id} style={{ marginBottom: 18, background: "#f7f7fa", borderRadius: 6, padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ textAlign: "center", minWidth: 56 }}>
              <div style={{ fontWeight: 700, fontSize: 20 }}>{req.votes}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{t("userrequests.vote")}</div>
              <Button size="small" variant="primary" style={{ marginTop: 4 }} onClick={() => voteUserRequest({ id: req.id })}>
                ↑
              </Button>
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: 17 }}>{req.title}</strong>
              <div style={{ color: "#666", marginTop: 2 }}>{req.description}</div>
              <div style={{ marginTop: 6, display: "flex", gap: 12, alignItems: "center" }}>
                <Tag>{t(`userrequests.category.${req.category}`)}</Tag>
                <span style={{ color: "#888" }}>{t(`userrequests.status.${req.status}`)}</span>
                <span style={{ color: "#888" }}>
                  {req.comment_count ? `${req.comment_count} ${t("comments.title").toLowerCase()}` : t("comments.emptylist")}
                </span>
              </div>
            </div>
          </div>
          {/* Optionally show comments inline or in details view */}
        </li>
      ))}
    </ul>
  );
}
