import { useEffect, useRef, useState } from "react";
import API from "../services/api";
import PostCard from "../Feed/PostCard";
import IMG1 from "../../public/images/card_ppl1.png";
import IMG2 from "../../public/images/card_ppl2.png";
import IMG3 from "../../public/images/card_ppl3.png";
import IMG4 from "../../public/images/card_ppl4.png";

/* ─── Story Section ──────────────────────────────────────── */
const StorySection = () => {
  const scrollRef = useRef(null);

  // const initials = (u) =>
  //   u ? `${u.firstName?.[0] ?? ""}${u.lastName?.[0] ?? ""}`.toUpperCase() : "ME";

  const stories = [
    { id: 2, name: "Ryan Roslansky", image: IMG1 },
    { id: 3, name: "Ryan Roslansky", image: IMG2 },
    { id: 4, name: "Ryan Roslansky", image: IMG3 },
    { id: 5, name: "Ryan Roslansky", image: IMG4 },
  ];

  const ss = {
    wrap: {
      background: "#fff",
      border: "1px solid #e4e6eb",
      borderRadius: "12px",
      marginBottom: "16px",
      padding: "12px 12px 10px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    },
    scrollContainer: { position: "relative" },
    scrollRow: {
      display: "flex",
      gap: "8px",
      overflowX: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      paddingBottom: "2px",
      paddingRight: "40px",
    },

    /* Your Story card */
    yourStory: {
      position: "relative",
      width: "110px",
      height: "180px",
      borderRadius: "10px",
      overflow: "hidden",
      flexShrink: 0,
      cursor: "pointer",
      background: "#1a2942",
      userSelect: "none",
    },
    yourStoryBg: {
      width: "100%",
      height: "130px",
      // background: "linear-gradient(160deg, #2c4a7c 0%, #1a2942 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    yourStoryAvatar: {
      width: "54px",
      height: "54px",
      borderRadius: "50%",
      background: "#e7f3ff",
      color: "#1877F2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: "18px",
    },
    plusBadge: {
      position: "absolute",
      bottom: "45px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      background: "#1877F2",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: 700,
      border: "2px solid #fff",
      lineHeight: 1,
      zIndex: 2,
    },
    yourStoryFooter: {
      height: "50px",
      background: "#1a2942",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    yourStoryLabel: {
      fontSize: "12px",
      fontWeight: 600,
      color: "#fff",
      textAlign: "center",
    },

    /* Other story cards */
    storyCard: {
      position: "relative",
      width: "110px",
      height: "180px",
      borderRadius: "10px",
      overflow: "hidden",
      flexShrink: 0,
      cursor: "pointer",
      background: "#1a2942",
      userSelect: "none",
    },
    storyBgImg: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    storyRingImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%",
    },
    storyGradient: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
    },
    storyRing: {
      position: "absolute",
      top: "10px",
      left: "10px",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      border: "3px solid #1877F2",
      overflow: "hidden",
      background: "#ccc",
    },
    storyName: {
      position: "absolute",
      bottom: "10px",
      left: "8px",
      right: "8px",
      fontSize: "12px",
      fontWeight: 600,
      color: "#fff",
      lineHeight: 1.3,
    },

    /* Arrow button */
    nextBtn: {
      position: "absolute",
      right: "0px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      background: "#1877F2",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      zIndex: 3,
    },
  };

  const scroll = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
  };

  return (
    <div style={ss.wrap}>
      <div style={ss.scrollContainer}>
        <div ref={scrollRef} style={ss.scrollRow}>

         {/* Your Story */}
<div style={ss.yourStory}>
  <div style={ss.yourStoryBg}>
    <img
      src={IMG1}
      alt="your story"
      style={{
        // position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
    <div style={{ position: "relative", zIndex: 1 }} />
  </div>

  <div style={ss.plusBadge}>+</div>

  <div style={ss.yourStoryFooter}>
    <span style={ss.yourStoryLabel}>Your Story</span>
  </div>
</div>

          {/* Friend stories */}
          {stories.map((story) => (
            <div key={story.id} style={ss.storyCard}>
              <img src={story.image} alt={story.name} style={ss.storyBgImg} />
              <div style={ss.storyGradient} />
              <div style={ss.storyRing}>
                <img src={story.image} alt={story.name} style={ss.storyRingImg} />
              </div>
              <div style={ss.storyName}>{story.name}</div>
            </div>
          ))}
        </div>

        {/* Scroll arrow */}
        <button style={ss.nextBtn} onClick={scroll}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ─── Inline styles ──────────────────────────────────────── */
const s = {
  page: {
    maxWidth: "600px",
    margin: "24px auto",
    padding: "0 12px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  composer: {
    background: "#fff",
    border: "1px solid #e4e6eb",
    borderRadius: "12px",
    marginBottom: "16px",
    overflow: "hidden",
  },
  composerTop: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px 10px",
  },
  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    flexShrink: 0,
    background: "#e7f3ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1877F2",
    fontWeight: 600,
    fontSize: "15px",
  },
  fakeInput: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 14px",
    background: "#f0f2f5",
    borderRadius: "24px",
    cursor: "text",
    color: "#65676b",
    fontSize: "15px",
    userSelect: "none",
  },
  editIcon: { color: "#65676b", flexShrink: 0 },
  textareaWrap: { padding: "0 16px 8px" },
  textarea: {
    width: "100%",
    minHeight: "80px",
    border: "none",
    outline: "none",
    resize: "none",
    fontSize: "15px",
    color: "#050505",
    background: "transparent",
    fontFamily: "inherit",
    lineHeight: 1.5,
    boxSizing: "border-box",
  },
  imagePreview: {
    position: "relative",
    margin: "0 16px 8px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e4e6eb",
  },
  previewImg: { width: "100%", display: "block", maxHeight: "260px", objectFit: "cover" },
  removeImg: {
    position: "absolute",
    top: "6px",
    right: "6px",
    background: "rgba(0,0,0,0.55)",
    border: "none",
    borderRadius: "50%",
    width: "26px",
    height: "26px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: { height: "1px", background: "#e4e6eb", margin: "0 16px" },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    gap: "4px",
  },
  toolBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 10px",
    border: "none",
    background: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    color: "#65676b",
    whiteSpace: "nowrap",
    transition: "background 0.15s",
  },
  spacer: { flex: 1 },
  postBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 20px",
    background: "#1877F2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
    transition: "background 0.15s",
  },
  postBtnDisabled: {
    background: "#bcc0c4",
    cursor: "not-allowed",
  },
  privacyRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0 16px 8px",
    fontSize: "13px",
    color: "#65676b",
  },
  toggle: { cursor: "pointer" },
};

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="white" />
  </svg>
);

/* ─── FeedPage ───────────────────────────────────────────── */
const FeedPage = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const fileRef = useRef(null);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setExpanded(true);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    fileRef.current.value = "";
  };

  const handlePost = async () => {
    if (!text.trim()) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("text", text);
      formData.append("isPrivate", isPrivate);
      if (image) formData.append("image", image);
      await API.post("/posts", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setText("");
      setImage(null);
      setImagePreview(null);
      setIsPrivate(false);
      setExpanded(false);
      if (fileRef.current) fileRef.current.value = "";
      fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = (updatedPost) =>
    setPosts((prev) => prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)));

  const initials = (u) =>
    u ? `${u.firstName?.[0] ?? ""}${u.lastName?.[0] ?? ""}`.toUpperCase() : "ME";

  const canPost = text.trim().length > 0 || !!image;

  return (
    <div style={s.page}>

      {/* ── Stories ── */}
      <StorySection currentUser={currentUser} />

      {/* ── Composer card ── */}
      <div style={s.composer}>
        <div style={s.composerTop}>
          <div style={s.avatar}>{initials(currentUser)}</div>

          {!expanded ? (
            <div style={s.fakeInput} onClick={() => setExpanded(true)}>
              <span style={{ flex: 1 }}>Write something …</span>
              <svg style={s.editIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
          ) : null}
        </div>

        {expanded && (
          <div style={s.textareaWrap}>
            <textarea
              autoFocus
              style={s.textarea}
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        )}

        {imagePreview && (
          <div style={s.imagePreview}>
            <img src={imagePreview} alt="preview" style={s.previewImg} />
            <button style={s.removeImg} onClick={removeImage}>✕</button>
          </div>
        )}

        {expanded && (
          <div style={s.privacyRow}>
            <input
              id="private-toggle"
              type="checkbox"
              style={s.toggle}
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            <label htmlFor="private-toggle" style={{ cursor: "pointer" }}>
              🔒 Private post
            </label>
          </div>
        )}

        <div style={s.divider} />

        <div style={s.toolbar}>
          <button style={s.toolBtn} onClick={() => { setExpanded(true); fileRef.current?.click(); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#45bd62" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Photo
          </button>

          <button style={s.toolBtn} onClick={() => setExpanded(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f3425f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="15" height="10" rx="2" />
              <polyline points="17 9 22 5 22 19 17 15" />
            </svg>
            Video
          </button>

          <button style={s.toolBtn} onClick={() => setExpanded(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f7b928" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Event
          </button>

          <button style={s.toolBtn} onClick={() => setExpanded(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
            Article
          </button>

          <div style={s.spacer} />

          <button
            style={{ ...s.postBtn, ...((!canPost || loading) ? s.postBtnDisabled : {}) }}
            onClick={handlePost}
            disabled={!canPost || loading}
          >
            <SendIcon />
            {loading ? "Posting…" : "Post"}
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      {/* ── Posts list ── */}
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          updatePost={updatePost}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default FeedPage;
