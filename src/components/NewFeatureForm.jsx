
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateFeatureMutation } from "../services/api";
import { useGetFeaturesQuery } from "../services/api";
import { Button, Textfield, Select, Checkbox, Alert, Spinner } from "@digdir/designsystemet-react";
import { useAddFeatureMutation, useGetStatusesQuery } from "../services/api";

function NewFeatureForm({
  appId,
  initialParentId = null,
  initialTitle = "",
  initialDescription = "",
  initialDescriptionLong = "",
  propStatusId = "",
  initialIsPrivate = false,
  initialCreatedBySub = "",
  initialVotes = 0,
  initialPriority = 1,
  initialTags = "",
  initialCategory = "",
  initialAttachments = "",
  initialIsArchived = false,
  initialOrder = 1,
  featureId = null,
  onSaved,
  onCancel
}) {
  const { t } = useTranslation();
  const [parentId, setParentId] = useState(initialParentId);
  const { data: featuresData } = useGetFeaturesQuery(appId);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [descriptionLong, setDescriptionLong] = useState(initialDescriptionLong);
  const [statusId, setStatusId] = useState(propStatusId || "");
  const [isPrivate, setIsPrivate] = useState(initialIsPrivate);
  const [createdBySub, setCreatedBySub] = useState(initialCreatedBySub);
  const [votes, setVotes] = useState(initialVotes);
  const [priority, setPriority] = useState(initialPriority);
  const [tags, setTags] = useState(initialTags);
  const [category, setCategory] = useState(initialCategory);
  const [attachments, setAttachments] = useState(initialAttachments);
  const [isArchived, setIsArchived] = useState(initialIsArchived);
  const [order, setOrder] = useState(initialOrder);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { data: statuses, isLoading: loadingStatuses, isError: errorStatuses } = useGetStatusesQuery(appId);
  const [addFeature, { isLoading }] = useAddFeatureMutation();
  const [updateFeature, { isLoading: isUpdating }] = useUpdateFeatureMutation();

  if (!appId) return <Alert severity="info">{t("newfeatureform.selectapp")}</Alert>;
  if (loadingStatuses) return <Spinner title={t("newfeatureform.loadingstatuses")} />;
  if (errorStatuses) return <Alert severity="danger">{t("newfeatureform.loaderror")}</Alert>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    const now = new Date().toISOString();
    const payload = {
      app_id: Number(appId),
      status_id: statusId ? Number(statusId) : undefined,
      title,
      description,
      description_long: descriptionLong,
      created_by_sub: createdBySub || "user-123",
      is_private: !!isPrivate,
      created_at: now,
      updated_at: now,
      parent_id: parentId !== null && parentId !== "" ? Number(parentId) : null,
      votes: votes ? Number(votes) : 0,
      priority: priority ? Number(priority) : 1,
      tags,
      category,
      attachments: attachments || "",
      is_archived: !!isArchived,
      order: order ? Number(order) : 1,
    };
    if (featureId) {
      console.log("PATCH /v1/features payload:", { id: featureId, ...payload });
    } else {
      console.log("POST /v1/features payload:", payload);
    }
    try {
      if (featureId) {
        await updateFeature({ id: featureId, ...payload }).unwrap();
        setSuccess(true);
        if (onSaved) onSaved();
      } else {
        await addFeature(payload).unwrap();
        setTitle("");
        setDescription("");
        setStatusId(propStatusId || "");
        setIsPrivate(false);
        setSuccess(true);
        if (onSaved) onSaved();
      }
    } catch (err) {
      setError(featureId ? t("newfeatureform.updateerror") : t("newfeatureform.createerror"));
      console.error(featureId ? "PATCH /v1/features error:" : "POST /v1/features error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem", maxWidth: 480, display: "flex", flexDirection: "column", gap: 14 }}>
      <h3>{featureId ? t("newfeatureform.edit") : t("newfeatureform.add")}</h3>
      {success && <Alert severity="success">{featureId ? t("newfeatureform.updated") : t("newfeatureform.created")}</Alert>}
      {error && <Alert severity="danger">{error}</Alert>}
      <div style={{ marginBottom: 18 }}>
        <label htmlFor="parent_id" style={{ display: "block", marginBottom: 4 }}>
          {t("newfeatureform.parent")}
        </label>
        <select
          id="parent_id"
          value={parentId || ""}
          onChange={e => setParentId(e.target.value ? e.target.value : null)}
          style={{ width: "100%", padding: 8 }}
        >
          <option value="">{t("newfeatureform.noParent")}</option>
          {featuresData && featuresData.length > 0 && featuresData.map(f => (
            <option key={f.id} value={f.id}>{f.title}</option>
          ))}
        </select>
      </div>
      <Textfield label={t("newfeatureform.title")}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Textfield label={t("newfeatureform.description")}
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        multiline
      />
      <Textfield
        label={t("newfeatureform.descriptionLong")}
        value={descriptionLong}
        onChange={e => setDescriptionLong(e.target.value)}
        multiline
        style={{ minHeight: '120px', marginBottom: '18px' }}
        rows={6}
      />
      {!propStatusId && (
        <Select label={t("newfeatureform.status")}
          value={statusId}
          onChange={e => setStatusId(e.target.value)}
          required
        >
          <option value="" disabled>{t("newfeatureform.selectStatus")}</option>
          {statuses?.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </Select>
      )}
      <Select label={t("newfeatureform.category")}
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>{t("newfeatureform.selectCategory")}</option>
        <option value="Produkt">{t("newfeatureform.catProduct")}</option>
        <option value="Teknisk">{t("newfeatureform.catTechnical")}</option>
        <option value="UX/UI">{t("newfeatureform.catUXUI")}</option>
        <option value="Integrasjon">{t("newfeatureform.catIntegration")}</option>
        <option value="Sikkerhet">{t("newfeatureform.catSecurity")}</option>
        <option value="Ytelse">{t("newfeatureform.catPerformance")}</option>
        <option value="Data & Analyse">{t("newfeatureform.catData")}</option>
        <option value="Administrasjon">{t("newfeatureform.catAdmin")}</option>
      </Select>
      <Textfield label={t("newfeatureform.tags")}
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <Textfield label={t("newfeatureform.attachments")}
        value={attachments}
        onChange={e => setAttachments(e.target.value)}
      />
      <Textfield label={t("newfeatureform.priority")}
        type="number"
        value={priority}
        onChange={e => setPriority(e.target.value)}
        min={1}
      />
      <Textfield label={t("newfeatureform.votes")}
        type="number"
        value={votes}
        onChange={e => setVotes(e.target.value)}
        min={0}
      />
      <Textfield label={t("newfeatureform.order")}
        type="number"
        value={order}
        onChange={e => setOrder(e.target.value)}
        min={1}
      />
      <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} label={t("newfeatureform.isPrivate")} />
      <Checkbox checked={isArchived} onChange={e => setIsArchived(e.target.checked)} label={t("newfeatureform.isArchived")} />
      <Textfield label={t("newfeatureform.createdBySub")}
        value={createdBySub}
        onChange={e => setCreatedBySub(e.target.value)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button type="submit" disabled={isLoading || isUpdating}>{featureId ? t("newfeatureform.save") : t("newfeatureform.create")}</Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>{t("newfeatureform.cancel")}</Button>
        )}
      </div>

    </form>
  );
}

export default NewFeatureForm;
