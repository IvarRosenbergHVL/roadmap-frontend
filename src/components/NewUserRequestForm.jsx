import React, { useState } from "react";
import { useAddUserRequestMutation } from "../services/api";
import { Textfield, Select, Button, Alert } from "@digdir/designsystemet-react";
import { useTranslation } from "react-i18next";

export default function NewUserRequestForm({ appId }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [addUserRequest, { isLoading }] = useAddUserRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    try {
      await addUserRequest({ app_id: appId, title, description, category }).unwrap();
      setTitle("");
      setDescription("");
      setCategory("");
      setSuccess(true);
    } catch (err) {
      setError(t("userrequests.createerror"));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 32, maxWidth: 480, display: "flex", flexDirection: "column", gap: 14 }}>
      <h3>{t("userrequests.newtitle")}</h3>
      {success && <Alert severity="success">{t("userrequests.created")}</Alert>}
      {error && <Alert severity="danger">{error}</Alert>}
      <Textfield label={t("userrequests.titleField")}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Textfield label={t("userrequests.descriptionField")}
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        multiline
      />
      <Select label={t("userrequests.categoryField")}
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>{t("userrequests.selectCategory")}</option>
        <option value="feature">{t("userrequests.category.feature")}</option>
        <option value="improvement">{t("userrequests.category.improvement")}</option>
        <option value="bug">{t("userrequests.category.bug")}</option>
        <option value="other">{t("userrequests.category.other")}</option>
      </Select>
      <Button type="submit" disabled={isLoading}>{t("userrequests.submit")}</Button>
    </form>
  );
}
