import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // =========================
  // Handle OAuth callback
  // =========================
  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      fetchCurrentUser(token);
    }
  }, [searchParams]);

  // =========================
  // Fetch logged-in user
  // =========================
  const fetchCurrentUser = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const user = await res.json();

      login({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "student",
        token
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Login failed. Please try again.");
    }
  };

  // =========================
  // Simulated email/password
  // =========================
  const handleSignIn = (e) => {
    e.preventDefault();
    login({ name: email.split("@")[0], role: "student", token: "abc123" });
    navigate("/dashboard");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setMessage("Account created — signing you in...");
    setTimeout(() => {
      login({ name, role: "student", token: "abc123" });
      navigate("/dashboard");
    }, 800);
  };

  // =========================
  // OAuth redirects
  // =========================
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleGitHubLogin = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  // =========================
  // UI
  // =========================
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h2>{mode === "signin" ? "Welcome Back" : "Create your account"}</h2>
          <p className="muted">
            Join STEMTRIBE Africa — learn, build and connect with mentors.
          </p>

          <div className="auth-tabs">
            <button
              className={mode === "signin" ? "active" : ""}
              onClick={() => setMode("signin")}
            >
              Sign In
            </button>
            <button
              className={mode === "signup" ? "active" : ""}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>

          {mode === "signin" ? (
            <form className="auth-form" onSubmit={handleSignIn}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
              <button className="btn-primary">Sign In</button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSignUp}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" required />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create password" required />
              <button className="btn-primary">Create Account</button>
            </form>
          )}

          <div className="divider">Or continue with</div>

          <div className="social-buttons">
            <button className="btn-secondary" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
            <button className="btn-secondary" onClick={handleGitHubLogin}>
              Continue with GitHub
            </button>
          </div>

          {message && <p className="muted">{message}</p>}
        </div>
      </div>
    </main>
  );
}
