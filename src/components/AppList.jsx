import { useGetAppsQuery } from "../services/api";
import { Spinner, Alert, Button } from "@digdir/designsystemet-react";

export default function AppList() {
  const { data: apps, isLoading, isError } = useGetAppsQuery();

  if (isLoading) return <Spinner title="Laster apper..." />;
  if (isError) return <Alert severity="danger">Kunne ikke laste apper</Alert>;

  return (
    <ul>
      {apps?.map((app) => (
        <li key={app.id}>
          <Button>{app.name}</Button>
        </li>
      ))}
    </ul>
  );
}
