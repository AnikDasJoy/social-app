import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/useAuth";
import loginIllustration from "../../public/images/login.png"; // 👈 your image in assets

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const s = {
    page: {
      display: "flex",
      minHeight: "100vh",
      background: "#eef0f3",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    },

    /* ── Left illustration panel ── */
    left: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
    },
    illustration: {
      width: "100%",
      maxWidth: "560px",
      objectFit: "contain",
    },

    /* ── Right form panel ── */
    right: {
      width: "460px",
      minHeight: "100vh",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "60px 52px",
      boxSizing: "border-box",
      flexShrink: 0,
    },

    /* Logo */
    logoRow: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "36px",
    },
    logoIcon: {
      width: "32px",
      height: "32px",
      borderRadius: "7px",
      background: "#1877F2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      fontSize: "18px",
      fontWeight: 700,
      color: "#050505",
      letterSpacing: "-0.2px",
    },
    logoBlue: { color: "#1877F2" },

    /* Heading */
    welcomeText: {
      fontSize: "14px",
      color: "#65676b",
      margin: "0 0 4px",
    },
    heading: {
      fontSize: "26px",
      fontWeight: 700,
      color: "#050505",
      margin: "0 0 32px",
      lineHeight: 1.25,
    },

    /* Google button */
    googleBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
      padding: "11px",
      background: "#fff",
      border: "1px solid #e4e6eb",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 500,
      color: "#3c4043",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      marginBottom: "24px",
      transition: "background 0.15s",
    },

    /* Or divider */
    orRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "24px",
    },
    orLine: { flex: 1, height: "1px", background: "#e4e6eb" },
    orText: { fontSize: "13px", color: "#65676b", whiteSpace: "nowrap" },

    /* Field */
    fieldWrap: { marginBottom: "20px" },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: 500,
      color: "#050505",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "11px 14px",
      border: "1.5px solid #e4e6eb",
      borderRadius: "8px",
      outline: "none",
      fontSize: "14px",
      color: "#050505",
      background: "#fafafa",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      boxSizing: "border-box",
      transition: "border-color 0.15s",
    },

    /* Remember + forgot */
    rememberRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "24px",
    },
    rememberLeft: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    },
    checkbox: {
      width: "17px",
      height: "17px",
      accentColor: "#1877F2",
      cursor: "pointer",
    },
    rememberText: { fontSize: "13px", color: "#050505" },
    forgotLink: {
      fontSize: "13px",
      color: "#1877F2",
      textDecoration: "none",
      fontWeight: 500,
    },

    /* Login button */
    loginBtn: {
      width: "100%",
      padding: "13px",
      background: loading ? "#6aadff" : "#1877F2",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: loading ? "not-allowed" : "pointer",
      fontSize: "15px",
      fontWeight: 700,
      fontFamily: "'Segoe UI', Arial, sans-serif",
      marginBottom: "28px",
      transition: "background 0.15s",
      letterSpacing: "0.2px",
    },

    /* Error */
    errorBox: {
      background: "#fff0f0",
      border: "1px solid #ffc5c5",
      borderRadius: "8px",
      padding: "10px 14px",
      fontSize: "13px",
      color: "#d93025",
      marginBottom: "16px",
    },

    /* Bottom */
    bottomText: {
      fontSize: "13px",
      color: "#65676b",
      textAlign: "center",
    },
    registerLink: {
      color: "#1877F2",
      fontWeight: 600,
      textDecoration: "none",
    },
  };

  return (
    <div style={s.page}>
      {/* ── Left: illustration ── */}
      <div style={s.left}>
        <img
          src={loginIllustration}
          alt="login illustration"
          style={s.illustration}
        />
      </div>

      {/* ── Right: form ── */}
      <div style={s.right}>
        {/* Logo */}
        <div style={s.logoRow}>
          <div style={s.logoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

        {/* Heading */}
        <p style={s.welcomeText}>Welcome back</p>
        <h1 style={s.heading}>Login to your account</h1>

        {/* Google sign-in */}
        <button style={s.googleBtn}>
          {/* Google "G" logo */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.1-6.1C34.46 3.19 29.5 1 24 1 14.82 1 7.07 6.48 3.6 14.26l7.1 5.52C12.48 13.68 17.77 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.74H24v8.98h12.68c-.55 2.94-2.2 5.43-4.68 7.1l7.18 5.58C43.18 37.6 46.52 31.5 46.52 24.5z"/>
            <path fill="#FBBC05" d="M10.7 28.22A14.6 14.6 0 0 1 9.5 24c0-1.47.25-2.9.7-4.22l-7.1-5.52A23.94 23.94 0 0 0 0 24c0 3.86.92 7.5 2.54 10.74l8.16-6.52z"/>
            <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.94l-7.18-5.58c-1.83 1.23-4.18 1.96-6.32 1.96-6.23 0-11.52-4.18-13.3-9.82l-8.16 6.52C7.07 41.52 14.82 47 24 47z"/>
          </svg>
          Or sign-in with google
        </button>

        {/* Or divider */}
        <div style={s.orRow}>
          <div style={s.orLine} />
          <span style={s.orText}>Or</span>
          <div style={s.orLine} />
        </div>

        {/* Error */}
        {error && <div style={s.errorBox}>{error}</div>}

        {/* Email */}
        <div style={s.fieldWrap}>
          <label style={s.label}>Email</label>
          <input
            style={s.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {/* Password */}
        <div style={s.fieldWrap}>
          <label style={s.label}>Password</label>
          <input
            style={s.input}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {/* Remember me + Forgot */}
        <div style={s.rememberRow}>
          <label style={s.rememberLeft}>
            <input
              type="checkbox"
              style={s.checkbox}
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span style={s.rememberText}>Remember me</span>
          </label>
          <Link to="/forgot-password" style={s.forgotLink}>
            Forgot password?
          </Link>
        </div>

        {/* Login button */}
        <button style={s.loginBtn} onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in…" : "Login now"}
        </button>

        {/* Register link */}
        <p style={s.bottomText}>
          Dont have an account?{" "}
          <Link to="/register" style={s.registerLink}>
            Create New Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
