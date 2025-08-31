import React, { useState } from "react";
import { Button, Textfield, Alert } from "@digdir/designsystemet-react";
import { useAddAppMutation } from "../services/api";
import { useTranslation } from "react-i18next";

export default function NewAppForm(props) {
  const { t } = useTranslation();
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
  setError(t("newappform.error"));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem", maxWidth: 480 }}>
      <h3>{t("newappform.title")}</h3>
      {success && <Alert severity="success">{t("newappform.success")}</Alert>}
      {error && <Alert severity="danger">{error}</Alert>}
      <Textfield label={t("newappform.name")}
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Textfield label={t("newappform.slug")}
        value={slug}
        onChange={e => setSlug(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading}>{t("newappform.submit")}</Button>
    </form>
  );
}


