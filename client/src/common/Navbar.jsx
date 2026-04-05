import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const s = {
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "60px",
      padding: "0 16px",
      background: "#fff",
      borderBottom: "1px solid #e4e6eb",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      gap: "12px",
    },

    /* ── Left: logo ── */
    left: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      flexShrink: 0,
      cursor: "pointer",
    },
    logoIcon: {
      width: "36px",
      height: "36px",
      borderRadius: "8px",
      background: "#1877F2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    logoText: {
      fontSize: "20px",
      fontWeight: 700,
      color: "#050505",
      letterSpacing: "-0.3px",
    },
    logoBlue: { color: "#1877F2" },

    /* ── Center: search ── */
    center: {
      flex: 1,
      maxWidth: "480px",
    },
    searchWrap: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "#f0f2f5",
      borderRadius: "24px",
      padding: "8px 16px",
    },
    searchInput: {
      border: "none",
      background: "transparent",
      outline: "none",
      fontSize: "14px",
      color: "#050505",
      width: "100%",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    },

    /* ── Right: icons + avatar ── */
    right: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      flexShrink: 0,
    },
    iconBtn: {
      position: "relative",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "none",
      background: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#65676b",
      transition: "background 0.15s",
    },
    iconBtnActive: {
      color: "#1877F2",
    },
    badge: {
      position: "absolute",
      top: "2px",
      right: "2px",
      background: "#1877F2",
      color: "#fff",
      fontSize: "10px",
      fontWeight: 700,
      minWidth: "16px",
      height: "16px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 3px",
      border: "2px solid #fff",
    },
    divider: {
      width: "1px",
      height: "28px",
      background: "#e4e6eb",
      margin: "0 4px",
    },
    userBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "4px 8px",
      borderRadius: "24px",
      transition: "background 0.15s",
    },
    userAvatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: "#e7f3ff",
      color: "#1877F2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: "13px",
      flexShrink: 0,
    },
    userName: {
      fontSize: "14px",
      fontWeight: 600,
      color: "#050505",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    },
    logoutBtn: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "7px 14px",
      background: "none",
      border: "1px solid #e4e6eb",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: 600,
      color: "#65676b",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      transition: "background 0.15s",
    },
  };

  return (
    <nav style={s.nav}>
      {/* ── Logo ── */}
      <div style={s.left} onClick={() => navigate("/feed")}>
        <div style={s.logoIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <span style={s.logoText}>
          <span style={s.logoBlue}>Buddy</span>Script
        </span>
      </div>

      {/* ── Search ── */}
      <div style={s.center}>
        <div style={s.searchWrap}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#65676b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input style={s.searchInput} placeholder="input search text" />
        </div>
      </div>

      {/* ── Right icons ── */}
      {token && (
        <div style={s.right}>
          {/* Home */}
          <button style={{ ...s.iconBtn, ...s.iconBtnActive }} onClick={() => navigate("/feed")} title="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2" stroke="#1877F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" fill="white" stroke="#1877F2" />
            </svg>
            {/* active underline */}
            <span style={{ position: "absolute", bottom: "-13px", left: "50%", transform: "translateX(-50%)", width: "28px", height: "3px", background: "#1877F2", borderRadius: "2px" }} />
          </button>

          {/* People */}
          <button style={s.iconBtn} title="Find friends">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </button>

          {/* Notifications */}
          <button style={s.iconBtn} title="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span style={s.badge}>6</span>
          </button>

          {/* Messages */}
          <button style={s.iconBtn} title="Messages">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span style={s.badge}>2</span>
          </button>

          <div style={s.divider} />

          {/* User avatar + logout */}
          {/* <button style={s.userBtn} title="Profile">
            <div style={s.userAvatar}>DY</div>
            <span style={s.userName}>Dylan Field</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#65676b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button> */}

          <div style={s.divider} />

          {/* Logout */}
          <button style={s.logoutBtn} onClick={handleLogout} title="Logout">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
