import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    // simulate sign in
    login({ name: email.split("@")[0] || "Learner", role: "student", token: "abc123" });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // simulate registration then sign in
    setMessage("Account created — signing you in...");
    setTimeout(() => {
      login({ name: name || email.split("@")[0] || "NewLearner", role: "student", token: "abc123" });
    }, 800);
  };

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
            <button className="btn-secondary">Continue with Google</button>
            <button className="btn-secondary">Continue with GitHub</button>
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
