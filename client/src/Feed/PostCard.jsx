import { useState } from "react";
import API from "../services/api";
import Comment from "./Comment";

const PostCard = ({ post, updatePost, currentUser, fetchPosts }) => {
  const [commentText, setCommentText] = useState("");

  const handleLike = async () => {
    const res = await API.put(`/posts/${post._id}/like`);
    updatePost(res.data);
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    const res = await API.post(`/posts/${post._id}/comment`, { text: commentText });
    updatePost(res.data);
    setCommentText("");
  };

  const initials = (firstName, lastName) =>
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  const styles = {
    card: {
      background: "#fff",
      borderRadius: "12px",
      border: "0.5px solid rgba(0,0,0,0.1)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      marginBottom: "16px",
      overflow: "hidden",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "12px 16px 8px",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#e7f3ff",
      color: "#1877F2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      fontSize: "14px",
      flexShrink: 0,
    },
    metaName: {
      fontSize: "15px",
      fontWeight: 600,
      color: "#050505",
      margin: 0,
    },
    metaTime: {
      fontSize: "12px",
      color: "#65676B",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      marginTop: "1px",
    },
    moreBtn: {
      marginLeft: "auto",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      border: "none",
      background: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#65676B",
      fontSize: "20px",
    },
    postText: {
      padding: "0 16px 10px",
      fontSize: "15px",
      color: "#050505",
      lineHeight: 1.5,
    },
    image: {
      width: "100%",
      display: "block",
      maxHeight: "500px",
      objectFit: "cover",
    },
    reactionBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 16px",
      borderBottom: "1px solid #E4E6EB",
      fontSize: "14px",
      color: "#65676B",
    },
    likesBadge: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    likeEmoji: {
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      background: "#1877F2",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
    },
    actionBar: {
      display: "flex",
      padding: "2px 8px",
      borderBottom: "1px solid #E4E6EB",
    },
    actionBtn: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      padding: "8px 4px",
      border: "none",
      background: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 600,
      color: "#65676B",
    },
    commentsSection: {
      padding: "8px 16px 4px",
    },
    commentInputRow: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
      padding: "8px 16px 12px",
    },
    commentInputAvatar: {
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
    commentInput: {
      flex: 1,
      padding: "8px 14px",
      background: "#F0F2F5",
      border: "none",
      borderRadius: "20px",
      outline: "none",
      fontSize: "14px",
      color: "#050505",
    },
    sendBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#1877F2",
      padding: "6px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const totalComments =
    (post.comments?.length ?? 0) +
    (post.comments?.reduce((acc, c) => acc + (c.replies?.length ?? 0), 0) ?? 0);

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.avatar}>
          {initials(post.user?.firstName, post.user?.lastName)}
        </div>
        <div style={{ flex: 1 }}>
          {/* <p style={styles.metaName}>
            {post.user?.firstName} {post.user?.lastName}
          </p> */}
          <div style={styles.metaTime}>
            <p style={{ ...styles.metaName, marginRight: "6px" }}>
    {post.user?.firstName} {post.user?.lastName}
  </p>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Just now
            {post.isPrivate && (
              <>
                &nbsp;·&nbsp;
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </>
            )}
          </div>
        </div>
        <button style={styles.moreBtn}>···</button>
      </div>

      {/* Post text */}
      <p style={styles.postText}>{post.text}</p>

      {/* Image */}
      {post.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          alt="post"
          style={styles.image}
        />
      )}

      {/* Reaction counts row — only shown when there's something to show */}
      {(post.likes.length > 0 || totalComments > 0) && (
        <div style={styles.reactionBar}>
          {post.likes.length > 0 && (
  <div style={styles.likesBadge}>
    <span style={styles.likeEmoji}>👍</span>

    <span title={post.likes.map(u => u.firstName).join(", ")}>
      {post.likes.slice(0, 2).map((u, i) => (
        <span key={u._id}>
          {u.firstName}
          {i < post.likes.slice(0, 2).length - 1 && ", "}
        </span>
      ))}

      {post.likes.length > 2 && ` +${post.likes.length - 2}`}
    </span>
  </div>
)}
          {totalComments > 0 && (
            <span>
              {totalComments} comment{totalComments !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div style={styles.actionBar}>
        <button style={styles.actionBtn} onClick={handleLike}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          Like
        </button>
        <button
          style={styles.actionBtn}
          onClick={() => document.getElementById(`comment-input-${post._id}`)?.focus()}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Comment
        </button>
        <button style={styles.actionBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </button>
      </div>

      {/* Comments list */}
      <div style={styles.commentsSection}>
        {post.comments?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            postId={post._id}
            updatePost={updatePost}
            fetchPosts={fetchPosts}
          />
        ))}
      </div>

      {/* Add comment input */}
      <div style={styles.commentInputRow}>
        <div style={styles.commentInputAvatar}>
          {initials(currentUser?.firstName, currentUser?.lastName)}
        </div>
        <input
          id={`comment-input-${post._id}`}
          style={styles.commentInput}
          placeholder="Write a comment…"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleComment()}
        />
        <button style={styles.sendBtn} onClick={handleComment}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#1877F2" stroke="#1877F2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
