import React, { useState } from "react";
import { Button, Textfield, Alert } from "@digdir/designsystemet-react";
import { useAddAppMutation } from "../services/api";

export default function NewAppForm(props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [addApp, { isLoading }] = useAddAppMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    try {
      const result = await addApp({ name, slug }).unwrap();
      setName("");
      setSlug("");
      setSuccess(true);
      if (result?.id && props?.onAppCreated) props.onAppCreated(result.id);
    } catch (err) {
      setError("Kunne ikke opprette app.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem", maxWidth: 480 }}>
      <h3>Registrer ny app/prosjekt</h3>
      {success && <Alert severity="success">App opprettet!</Alert>}
      {error && <Alert severity="danger">{error}</Alert>}
      <Textfield label="Navn" value={name} onChange={e => setName(e.target.value)} required />
      <Textfield label="Slug" value={slug} onChange={e => setSlug(e.target.value)} required />
      <Button type="submit" disabled={isLoading}>Opprett app</Button>
    </form>
  );
}


