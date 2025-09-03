import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetStatusesQuery, useAddStatusMutation, useUpdateStatusMutation, useDeleteStatusMutation } from "../services/api";
import { Spinner, Alert, Button, Textfield, Tag, Select, Checkbox, Card } from "@digdir/designsystemet-react";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ChatIcon
} from "@navikt/aksel-icons";

export default function VersionAdmin({ appId }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const { data: statuses, isLoading, isError } = useGetStatusesQuery(appId);
  const [addStatus] = useAddStatusMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [deleteStatus] = useDeleteStatusMutation();
  const [newType, setNewType] = useState("MINOR");
  const [newTerminal, setNewTerminal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newReleasedAt, setNewReleasedAt] = useState("");

  // Finn siste versjon
  const lastVersion = statuses && statuses.length > 0
    ? statuses
        .map(s => s.label)
        .filter(label => /^\d+\.\d+\.\d+$/.test(label))
        .sort((a, b) => {
          const [aMaj, aMin, aPatch] = a.split(".").map(Number);
          const [bMaj, bMin, bPatch] = b.split(".").map(Number);
          if (aMaj !== bMaj) return bMaj - aMaj;
          if (aMin !== bMin) return bMin - aMin;
          return bPatch - aPatch;
        })[0]
    : "0.0.0";

  function getNextVersion(type) {
    const [maj, min, patch] = lastVersion.split(".").map(Number);
    if (type === "MAJOR") return `${maj + 1}.0.0`;
    if (type === "MINOR") return `${maj}.${min + 1}.0`;
    return `${maj}.${min}.${patch + 1}`;
  }
  const nextVersion = getNextVersion(newType);

  if (isLoading) return <Spinner title={t("versionadmin.loading")} />;
  if (isError) return <Alert severity="danger">{t("versionadmin.loaderror")}</Alert>;

  return (
  <Card style={{ padding: "2rem", marginBottom: "2rem" }}>
      <div className="version-form">
        <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "1.2rem", color: "#222" }}>{t("versionadmin.newversion")}</h3>
        <form onSubmit={async e => {
          e.preventDefault();
          setErrorMsg("");
          let releasedAtIso = "";
          if (newReleasedAt) {
            if (newReleasedAt.length === 16 && newReleasedAt.includes("T")) {
              releasedAtIso = newReleasedAt.replace("T", " ") + ":00";
            } else {
              releasedAtIso = newReleasedAt;
            }
          }
          const payload = {
            app_id: Number(appId),
            label: nextVersion,
            code: nextVersion,
            title: newTitle,
            description: newDescription,
            released_at: releasedAtIso,
            sort_index: statuses.length + 1,
            terminal: newTerminal
          };
          try {
            const result = await addStatus(payload).unwrap();
            setNewType("MINOR");
            setNewTerminal(false);
            setNewTitle("");
            setNewDescription("");
            setNewReleasedAt("");
            if (result?.id) {
              navigate(`/app/${appId}/features?status_id=${result.id}`);
            }
          } catch (err) {
            setErrorMsg(t("versionadmin.createerror"));
          }
        }} style={{ marginTop: "2rem" }}>
          {errorMsg && <Alert severity="danger">{errorMsg}</Alert>}
          <Select label={t("versionadmin.type")}
            value={newType}
            onChange={e => setNewType(e.target.value)}
            style={{ marginLeft: 8, width: 140 }}
          >
            <option value="MAJOR">{t("versionadmin.major")}</option>
            <option value="MINOR">{t("versionadmin.minor")}</option>
            <option value="PATCH">{t("versionadmin.patch")}</option>
          </Select>
          <Textfield label={t("versionadmin.nextversion")} value={nextVersion} readOnly style={{ width: 120, marginLeft: 8 }} />
          <Textfield label={t("versionadmin.title")}
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            required
            style={{ marginLeft: 8, width: 180 }}
          />
          <Textfield label={t("versionadmin.description")}
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            multiline
            required
            style={{ marginLeft: 8, width: 240 }}
          />
          <Textfield label={t("versionadmin.releasedate")}
            type="datetime-local"
            value={newReleasedAt}
            onChange={e => setNewReleasedAt(e.target.value)}
            required
            style={{ marginLeft: 8, width: 200 }}
          />
          <Checkbox
            checked={newTerminal}
            onChange={e => setNewTerminal(e.target.checked)}
            label={t("versionadmin.terminal")}
            style={{ marginLeft: 8 }}
          />
          <Button
            variant="primary"
            icon={<PlusIcon aria-hidden />}
            type="submit"
            style={{ marginLeft: 8, minWidth: 130 }}
          >
            {t("versionadmin.create")}
          </Button>
        </form>
      </div>
  <Card style={{ marginTop: "2rem", background: "var(--ds-color-surface-subtle)" }}>
        <div className="version-card-inner" style={{ padding: "1.5rem" }}>
          <h4 style={{ marginTop: 0, fontSize: "1.05rem", fontWeight: 600, color: "#222", marginBottom: "1.1rem" }}>{t("versionadmin.listtitle")}</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {statuses?.map((status) => (
              <li key={status.id} style={{ marginBottom: "0.7rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>
                  <Tag variant={status.terminal ? "success" : "info"} style={{ fontSize: "0.95em", padding: "0.2em 0.7em" }}>{status.label}</Tag>
                  <span style={{ marginLeft: 8, fontSize: "0.97em", color: "#666" }}>{status.title}</span>
                </span>
                <span style={{ display: "flex", gap: "12px" }}>
                  <Button
                    variant="tertiary"
                    icon={<ChatIcon aria-hidden />}
                    style={{ minWidth: 130, fontSize: "0.97em" }}
                    onClick={() => navigate(`/app/${appId}/features?status_id=${status.id}`)}
                  >
                    {t("versionadmin.featuresbtn")}
                  </Button>
                  <Button
                    variant="secondary"
                    icon={<PencilIcon aria-hidden />}
                    style={{ minWidth: 130, fontSize: "0.97em" }}
                  >
                    {t("versionadmin.editbtn")}
                  </Button>
                  <Button
                    variant="danger"
                    icon={<TrashIcon aria-hidden />}
                    style={{ minWidth: 130, fontSize: "0.97em" }}
                    onClick={() => deleteStatus(status.id)}
                  >
                    {t("versionadmin.deletebtn")}
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Card>
  );
}
