import API from "../services/api";

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
    marginBottom: "6px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  row: {
    display: "flex",
    gap: "8px",
    alignItems: "flex-start",
  },
  avatar: {
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
  bubbleWrap: {
    position: "relative",
    display: "inline-block",
    maxWidth: "calc(100% - 36px)",
  },
  bubble: {
    background: "#f0f2f5",
    borderRadius: "18px",
    padding: "6px 12px",
    display: "inline-block",
  },
  authorName: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#050505",
    margin: 0,
  },
  replyText: {
    fontSize: "13px",
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
};

const Reply = ({ reply, postId, commentId, updatePost }) => {
  const liked = reply.isLikedByMe ?? false;
  const likeCount = reply.likes?.length ?? 0;

  // ✅ Like Reply
  const handleLike = async () => {
  try {
    const res = await API.put(
      `/posts/${postId}/comment/${commentId}/reply/${reply._id}/like`
    );

    updatePost(res.data);
  } catch (err) {
    console.error("Reply like error:", err);
  }
};

  return (
    <div style={s.wrap}>
      <div style={s.row}>
        {/* Avatar */}
        <div style={s.avatar}>
          {initials(reply.user?.firstName, reply.user?.lastName)}
        </div>

        <div>
          {/* Bubble + floating like badge */}
          <div style={s.bubbleWrap}>
            <div style={s.bubble}>
              <p style={s.authorName}>
                {reply.user?.firstName} {reply.user?.lastName}
              </p>
              <p style={s.replyText}>{reply.text}</p>
            </div>

            {/* 👍 floating badge — only shown when liked */}
            {likeCount > 0 && (
              <div style={s.likeFloatBadge}>
                <span style={{ fontSize: "11px" }}>👍</span>
                <span>{likeCount}</span>
              </div>
            )}
          </div>

          {/* Like · timestamp */}
          <div style={s.actions}>
            <button style={s.actionBtn(liked)} onClick={handleLike}>
              Like
            </button>
            <span style={s.timestamp}>{timeAgo(reply.createdAt)}</span>
          </div>

          {reply.likes?.length > 0 && (
  <p style={{ fontSize: "11px", color: "#65676b", marginLeft: "36px" }}>
    👍{" "}
    {reply.likes.slice(0, 2).map((u, i) => (
      <span key={u?._id || i}>
        {u?.firstName || "User"}
        {i < reply.likes.slice(0, 2).length - 1 && ", "}
      </span>
    ))}
    {reply.likes.length > 2 && ` +${reply.likes.length - 2}`}
  </p>
)}
        </div>
      </div>
    </div>
  );
};

export default Reply;
