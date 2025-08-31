import React from "react";
import { useGetFeaturesQuery } from "../services/api";
import { Spinner, Alert } from "@digdir/designsystemet-react";
import { useTranslation } from "react-i18next";

export default function FeatureList({ appId }) {
  const { t } = useTranslation();
  if (!appId) return null;
  const { data: features, isLoading, isError } = useGetFeaturesQuery(appId);

  if (isLoading) return <Spinner title={t("featurelist.loading")} />;
  if (isError) return <Alert severity="danger">{t("featurelist.loaderror")}</Alert>;

  return (
    <ul>
      {features?.map((f) => (
        <li key={f.id}>
          <strong>{f.title}</strong> — {f.description}
        </li>
      ))}
    </ul>
  );
}
