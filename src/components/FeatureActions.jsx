import React, { useState } from "react";
import { Button, Textarea, Select, Alert } from "@digdir/designsystemet-react";
import { PencilIcon, TrashIcon, RocketIcon } from "@navikt/aksel-icons";
import { useUpdateCommentMutation, useDeleteVoteMutation, usePromoteFeatureMutation } from "../services/api";

/**
 * Props:
 * - comment: { id, text }
 * - featureId: number
 * - userSub: string
 * - fingerprint: string
 * - appId: number
 * - statuses: [{ id, name }]
 */
export default function FeatureActions({ comment, featureId, userSub, fingerprint, appId, statuses }) {
  // Edit comment
  const [commentText, setCommentText] = useState(comment?.text || "");
  const [updateComment, { isLoading: updatingComment, isError: updateCommentError }] = useUpdateCommentMutation();

  // Remove vote
  const [deleteVote, { isLoading: removingVote, isError: deleteVoteError }] = useDeleteVoteMutation();

  // Promote feature
  const [statusId, setStatusId] = useState("");
  const [promoteFeature, { isLoading: promoting, isError: promoteError }] = usePromoteFeatureMutation();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Rediger kommentar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          updateComment({ id: comment.id, text: commentText });
        }}
        style={{ maxWidth: 400 }}
      >
        <Textarea
          label="Rediger kommentar"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          required
        />
        {updateCommentError && <Alert severity="danger">Kunne ikke oppdatere kommentar</Alert>}
        <Button
          type="submit"
          icon={<PencilIcon aria-hidden style={{ color: "#0070f3" }} />}
          disabled={updatingComment}
          style={{ marginTop: 8 }}
        >
          Lagre
        </Button>
      </form>

      {/* Fjern stemme */}
      <div>
        {deleteVoteError && <Alert severity="danger">Kunne ikke fjerne stemme</Alert>}
        <Button
          variant="danger"
          icon={<TrashIcon aria-hidden style={{ color: "#e53e3e" }} />}
          onClick={() => deleteVote({ feature_id: featureId, user_sub: userSub, fingerprint })}
          disabled={removingVote}
        >
          Fjern stemme
        </Button>
      </div>

      {/* Promoter feature */}
      <form
        onSubmit={e => {
          e.preventDefault();
          promoteFeature({ id: featureId, app_id: appId, status_id: Number(statusId) });
        }}
        style={{ display: "flex", gap: 12, alignItems: "center", maxWidth: 400 }}
      >
        <Select
          label="Ny status"
          value={statusId}
          onChange={e => setStatusId(e.target.value)}
          required
          style={{ minWidth: 140 }}
        >
          <option value="">Velg status</option>
          {statuses?.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </Select>
        <Button
          type="submit"
          icon={<RocketIcon aria-hidden style={{ color: "#059669" }} />}
          disabled={promoting || !statusId}
          variant="primary"
        >
          Promoter
        </Button>
        {promoteError && <Alert severity="danger">Kunne ikke promotere feature</Alert>}
      </form>
    </div>
  );
}