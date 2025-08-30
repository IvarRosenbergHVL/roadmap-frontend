import { useGetFeaturesQuery } from "../services/api";
import { Spinner, Alert } from "@digdir/designsystemet-react";

export default function FeatureList({ appId }) {
  if (!appId) return null;
  const { data: features, isLoading, isError } = useGetFeaturesQuery(appId);

  if (isLoading) return <Spinner title="Laster features..." />;
  if (isError) return <Alert severity="danger">Kunne ikke laste features</Alert>;

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
