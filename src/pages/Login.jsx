// src/pages/Login.jsx
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
    if (!token) return;

    // Save token & fetch user
    login({ token });
    navigate("/login", { replace: true }); // clean URL

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const userData = data.user || data;

        login({
          id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role || "student",
          token,
        });

        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        setMessage("Login failed. Please try again.");
      }
    };
    fetchUser();
  }, []);

  // =========================
  // Mock Email/Password
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
  // OAuth redirect buttons
  // =========================
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleGitHubLogin = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  // =========================
  // Render
  // =========================
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h2>{mode === "signin" ? "Welcome Back" : "Create your account"}</h2>
          <div className="auth-tabs">
            <button className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")}>Sign In</button>
            <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Sign Up</button>
          </div>

          {mode === "signin" ? (
            <form onSubmit={handleSignIn}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
              <button>Sign In</button>
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" required />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
              <button>Create Account</button>
            </form>
          )}

          <div className="divider">Or continue with</div>
          <button onClick={handleGoogleLogin}>Continue with Google</button>
          <button onClick={handleGitHubLogin}>Continue with GitHub</button>

          {message && <p>{message}</p>}
        </div>
      </div>
    </main>
  );
}
