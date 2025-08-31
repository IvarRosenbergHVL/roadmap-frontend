import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Textfield, Alert } from "@digdir/designsystemet-react";
import { useGetUserRequestCommentsQuery, useAddUserRequestCommentMutation } from "../services/api";

export default function UserRequestComments({ requestId }) {
  const { t } = useTranslation();
  const { data: comments, isLoading, isError } = useGetUserRequestCommentsQuery(requestId);
  const [addComment, { isLoading: isAdding }] = useAddUserRequestCommentMutation();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!text.trim()) {
      setError(t("comments.empty"));
      return;
    }
    try {
      await addComment({ request_id: requestId, text }).unwrap();
      setText("");
      setSuccess(true);
    } catch (err) {
      setError(t("comments.error"));
    }
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h4>{t("comments.title")}</h4>
      {isLoading && <Alert severity="info">{t("comments.loading")}</Alert>}
      {isError && <Alert severity="danger">{t("comments.loaderror")}</Alert>}
      {comments && comments.length === 0 && <Alert severity="info">{t("comments.emptylist")}</Alert>}
      <ul style={{ paddingLeft: 0 }}>
        {comments && comments.map(c => (
          <li key={c.id} style={{ marginBottom: 12, listStyle: "none", borderBottom: "1px solid #eee", paddingBottom: 8 }}>
            <div style={{ fontWeight: 600 }}>{c.author}</div>
            <div>{c.text}</div>
            <div style={{ fontSize: "0.85em", color: "#888" }}>{new Date(c.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        <Textfield
          label={t("comments.add")}
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={isAdding}
        />
        <Button type="submit" disabled={isAdding || !text.trim()} style={{ marginTop: 8 }}>{t("comments.submit")}</Button>
      </form>
      {error && <Alert severity="danger" style={{ marginTop: 8 }}>{error}</Alert>}
      {success && <Alert severity="success" style={{ marginTop: 8 }}>{t("comments.success")}</Alert>}
    </div>
  );
}
