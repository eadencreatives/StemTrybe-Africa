import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Simulated email/password sign in
  const handleSignIn = (e) => {
    e.preventDefault();
    login({ name: email.split("@")[0] || "Learner", role: "student", token: "abc123" });
  };

  // Simulated sign up
  const handleSignUp = (e) => {
    e.preventDefault();
    setMessage("Account created — signing you in...");
    setTimeout(() => {
      login({ name: name || email.split("@")[0] || "NewLearner", role: "student", token: "abc123" });
    }, 800);
  };

  // Google OAuth redirect
  const handleGoogleLogin = () => {
    console.log("Redirecting to Google OAuth...");
    const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${base}/auth/google`;
  };

  // GitHub OAuth redirect (if implemented)
  const handleGitHubLogin = () => {
    console.log("Redirecting to GitHub OAuth...");
    const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${base}/auth/github`;
  };

  // Handle OAuth callback: token and user JSON come as query params
  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    if (token) {
      try {
        if (userParam) {
          localStorage.setItem('token', token);
        } else {
          localStorage.setItem('token', token);
        }
        // Let AuthProvider validate token and fetch user, then navigate
        navigate('/dashboard');
      } catch (err) {
        console.error('OAuth callback handling error', err);
      }
    }
  }, [searchParams, navigate]);

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h2>{mode === "signin" ? "Welcome Back" : "Create your account"}</h2>
          <p className="muted">Join STEMTRIBE Africa — learn, build and connect with mentors.</p>

          <div className="auth-tabs">
            <button className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")}>Sign In</button>
            <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Sign Up</button>
          </div>

          {mode === "signin" ? (
            <form className="auth-form" onSubmit={handleSignIn}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
              <button className="btn-primary" type="submit">Sign In</button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSignUp}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" required />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create password" required />
              <button className="btn-primary" type="submit">Create Account</button>
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

        <aside className="auth-right">
          <h3>Why join?</h3>
          <ul>
            <li>Hands-on lab sessions</li>
            <li>Mentorship and career pathways</li>
            <li>Projects, hackathons and real-world experience</li>
          </ul>
          <p className="muted">Signing up connects you to our learning community and opportunities.</p>
        </aside>
      </div>
    </main>
  );
}
