import { useState } from "react";
import API from "../services/api";
import Reply from "./Reply";

const initials = (firstName, lastName) =>
  `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

const timeAgo = (dateStr) => {
  if (!dateStr) return "Just now";
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
};

const s = {
  wrap: {
    marginBottom: "8px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  row: {
    display: "flex",
    gap: "8px",
    alignItems: "flex-start",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#e7f3ff",
    color: "#1877F2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "12px",
    flexShrink: 0,
  },
  bubbleWrap: {
    position: "relative",
    display: "inline-block",
    maxWidth: "calc(100% - 40px)",
  },
  bubble: {
    background: "#f0f2f5",
    borderRadius: "18px",
    padding: "7px 12px",
    display: "inline-block",
  },
  authorName: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#050505",
    margin: 0,
  },
  commentText: {
    fontSize: "14px",
    color: "#050505",
    margin: "1px 0 0",
    lineHeight: 1.4,
  },
  likeFloatBadge: {
    position: "absolute",
    bottom: "-10px",
    right: "-8px",
    display: "flex",
    alignItems: "center",
    gap: "3px",
    background: "#fff",
    border: "1px solid #e4e6eb",
    borderRadius: "10px",
    padding: "1px 5px",
    fontSize: "12px",
    color: "#65676b",
    pointerEvents: "none",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "4px",
    paddingLeft: "4px",
  },
  actionBtn: (active) => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontSize: "12px",
    fontWeight: 600,
    color: active ? "#1877F2" : "#65676b",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  }),
  timestamp: {
    fontSize: "12px",
    color: "#65676b",
    fontWeight: 400,
  },

  /* replies */
  repliesWrap: {
    marginLeft: "40px",
    marginTop: "4px",
  },
  viewRepliesBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    color: "#65676b",
    padding: "2px 0 6px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },

  /* reply input */
  replyInputRow: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    marginLeft: "40px",
    marginTop: "6px",
  },
  replyAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#e7f3ff",
    color: "#1877F2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "11px",
    flexShrink: 0,
  },
  replyInput: {
    flex: 1,
    padding: "7px 14px",
    background: "#f0f2f5",
    border: "none",
    borderRadius: "20px",
    outline: "none",
    fontSize: "13px",
    color: "#050505",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  sendBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#1877F2",
    padding: "4px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Comment = ({ comment, postId, updatePost }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
const [editText, setEditText] = useState(comment.text);

  const liked = comment.isLikedByMe ?? false;
  const likeCount = comment.likes?.length ?? 0;
  const replyCount = comment.replies?.length ?? 0;

  // ✅ Like Comment
  const handleLike = async () => {
    const res = await API.put(`/posts/${postId}/comment/${comment._id}/like`);
    updatePost(res.data);
  };

  // ✅ Add Reply
  const handleReply = async () => {
    if (!replyText.trim()) return;
    const res = await API.post(`/posts/${postId}/comment/${comment._id}/reply`, {
      text: replyText,
    });
    updatePost(res.data);
    setReplyText("");
    setShowReplies(true);
  };

  // ✅ Edit Comment
const handleEdit = async () => {
  if (!editText.trim()) return;

  const res = await API.put(
    `/posts/${postId}/comment/${comment._id}`,
    { text: editText }
  );

  updatePost(res.data);
  setIsEditing(false);
};

// ✅ Delete Comment
const handleDelete = async () => {
  try {
    if (!window.confirm("Delete this comment?")) return;

    const res = await API.delete(
      `/posts/${postId}/comment/${comment._id}`
    );

    updatePost(res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

  return (
    <div style={s.wrap}>
      {/* Comment bubble row */}
      <div style={s.row}>
        <div style={s.avatar}>
          {initials(comment.user?.firstName, comment.user?.lastName)}
        </div>

        <div>
          {/* Bubble + floating like badge */}
          <div style={s.bubbleWrap}>
            <div style={s.bubble}>
              <p style={s.authorName}>
                {comment.user?.firstName} {comment.user?.lastName}
              </p>
              {/* <p style={s.commentText}>{comment.text}</p> */}

              {isEditing ? (
  <div>
    <input
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      style={{
        ...s.replyInput,
        marginTop: "5px",
      }}
    />

    <div style={{ marginTop: "5px" }}>
      <button style={s.actionBtn(true)} onClick={handleEdit}>
        Save
      </button>

      <button
        style={s.actionBtn(false)}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </div>
  </div>
) : (
  <p style={s.commentText}>{comment.text}</p>
)}
            </div>

            {likeCount > 0 && (
              <div style={s.likeFloatBadge}>
                <span style={{ fontSize: "11px" }}>👍</span>
                <span>{likeCount}</span>
              </div>
            )}
          </div>

          {/* Like · Reply · time */}
          <div style={s.actions}>
            <button style={s.actionBtn(liked)} onClick={handleLike}>
              Like
            </button>

            
            <button
              style={s.actionBtn(showReplyInput)}
              onClick={() => setShowReplyInput((v) => !v)}
            >
              Reply
            </button>

            <button
    style={s.actionBtn(false)}
    onClick={() => setIsEditing(true)}
  >
    Edit
  </button>

  <button
    style={s.actionBtn(false)}
    onClick={handleDelete}
  >
    Delete
  </button>

            <span style={s.timestamp}>{timeAgo(comment.createdAt)}</span>
          </div>
        </div>
      </div>

      {comment.likes?.length > 0 && (
  <p style={{ fontSize: "11px", color: "#65676b", marginLeft: "40px" }}>
    👍{" "}
    {comment.likes.slice(0, 2).map((u, i) => (
      <span key={u?._id || i}>
        {u?.firstName || "User"}
        {i < comment.likes.slice(0, 2).length - 1 && ", "}
      </span>
    ))}
    {comment.likes.length > 2 && ` +${comment.likes.length - 2}`}
  </p>
)}

      {/* View / hide replies */}
      {replyCount > 0 && (
        <div style={s.repliesWrap}>
          <button
            style={s.viewRepliesBtn}
            onClick={() => setShowReplies((v) => !v)}
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <path
                d="M2 2 Q2 12 14 12"
                stroke="#65676b"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            {showReplies
              ? "Hide replies"
              : `View ${replyCount} repl${replyCount === 1 ? "y" : "ies"}`}
          </button>

          {/* ✅ Replies */}
          {showReplies &&
            comment.replies.map((reply) => (
              <Reply
                key={reply._id}
                reply={reply}
                postId={postId}
                commentId={comment._id}
                updatePost={updatePost}
              />
            ))}
        </div>
      )}

      {/* Reply input */}
      {showReplyInput && (
        <div style={s.replyInputRow}>
          <div style={s.replyAvatar}>ME</div>
          <input
            style={s.replyInput}
            placeholder={`Reply to ${comment.user?.firstName ?? ""}…`}
            value={replyText}
            autoFocus
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleReply()}
          />
          <button style={s.sendBtn} onClick={handleReply}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1877F2"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon
                points="22 2 15 22 11 13 2 9 22 2"
                fill="#1877F2"
                stroke="#1877F2"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
