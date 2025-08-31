import React from "react";
import { useGetUserRequestsQuery, useUpdateUserRequestMutation, useAddFeatureFromRequestMutation } from "../services/api";
import { Table, TableHead, TableRow, TableCell, TableBody, Select, Button, Alert, Tag } from "@digdir/designsystemet-react";
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
    <Table style={{ marginTop: 24 }}>
      <TableHead>
        <TableRow>
          <TableCell>{t("userrequests.titleField")}</TableCell>
          <TableCell>{t("userrequests.descriptionField")}</TableCell>
          <TableCell>{t("userrequests.categoryField")}</TableCell>
          <TableCell>{t("userrequests.statusField")}</TableCell>
          <TableCell>{t("userrequests.votes")}</TableCell>
          <TableCell>{t("userrequests.convert")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {requests.map(req => (
          <TableRow key={req.id}>
            <TableCell style={{ fontWeight: "bold" }}>{req.title}</TableCell>
            <TableCell>{req.description}</TableCell>
            <TableCell><Tag>{t(`userrequests.category.${req.category}`)}</Tag></TableCell>
            <TableCell>
              <Select value={req.status} onChange={e => handleStatusChange(req.id, e.target.value)}>
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>{t(`userrequests.status.${opt}`)}</option>
                ))}
              </Select>
            </TableCell>
            <TableCell>{req.votes}</TableCell>
            <TableCell>
              <Button size="small" variant="primary" onClick={() => handleConvert(req)}>
                {t("userrequests.convert")}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
