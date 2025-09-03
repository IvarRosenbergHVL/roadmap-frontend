import React from "react";
import { useGetUserRequestsQuery, useUpdateUserRequestMutation, useAddFeatureFromRequestMutation } from "../services/api";
import { Table, TableHead, TableRow, TableCell, TableBody, Select, Button, Alert, Tag } from "@digdir/designsystemet-react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { useTranslation } from "react-i18next";

const statusOptions = [
  "pending", "rejected", "roadmap", "postponed"
];

export default function UserRequestsAdminTable({ appId }) {
  const { t } = useTranslation();
  const { data: requests, isLoading, isError } = useGetUserRequestsQuery(appId);
  const [updateUserRequest] = useUpdateUserRequestMutation();
  const [addFeatureFromRequest] = useAddFeatureFromRequestMutation();

  if (isLoading) return <Alert severity="info">{t("userrequests.loading")}</Alert>;
  if (isError) return <Alert severity="danger">{t("userrequests.loaderror")}</Alert>;
  if (!requests || requests.length === 0) return <Alert severity="info">{t("userrequests.empty")}</Alert>;

  const handleStatusChange = async (id, status) => {
    await updateUserRequest({ id, status });
  };
  const handleConvert = async (req) => {
    await addFeatureFromRequest({ request_id: req.id });
  };

  return (
    <div style={{ marginTop: 32, borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", background: "#fff", padding: 24 }}>
      <Table>
        <TableHead>
          <TableRow style={{ background: "#F3F6FA" }}>
            <TableCell style={{ fontWeight: 600 }}>{t("userrequests.titleField")}</TableCell>
            <TableCell style={{ fontWeight: 600 }}>{t("userrequests.descriptionField")}</TableCell>
            <TableCell style={{ fontWeight: 600 }}>{t("userrequests.categoryField")}</TableCell>
            <TableCell style={{ fontWeight: 600 }}>{t("userrequests.statusField")}</TableCell>
            <TableCell style={{ fontWeight: 600 }}>{t("userrequests.votes")}</TableCell>
            <TableCell style={{ fontWeight: 600 }}>{t("userrequests.convert")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map(req => (
            <TableRow key={req.id} style={{ borderBottom: "1px solid #E2E6EA" }}>
              <TableCell style={{ fontWeight: "bold", fontSize: 16 }}>{req.title}</TableCell>
              <TableCell style={{ fontSize: 15, color: "#444" }}>{req.description}</TableCell>
              <TableCell>
                <Tag color="success" style={{ fontSize: 14, borderRadius: 8, padding: "2px 10px" }}>
                  {t(`userrequests.category.${req.category}`)}
                </Tag>
              </TableCell>
              <TableCell>
                <Select value={req.status} onChange={e => handleStatusChange(req.id, e.target.value)} style={{ minWidth: 120, borderRadius: 8 }}>
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{t(`userrequests.status.${opt}`)}</option>
                  ))}
                </Select>
              </TableCell>
              <TableCell style={{ fontWeight: 500, fontSize: 15 }}>{req.votes}</TableCell>
              <TableCell>
                <Button size="small" variant="primary" onClick={() => handleConvert(req)} style={{ borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", padding: "0 12px" }}>
                  <ArrowRightIcon style={{ marginRight: 4, verticalAlign: "middle" }} />
                  {t("userrequests.convert")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
