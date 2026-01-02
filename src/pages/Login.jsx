import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchCurrentUser = useCallback(
    async (token) => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        const user = data.user || data;

        login({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || "student",
          token,
        });

        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        setMessage("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [API_URL, login, navigate]
  );

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;

    localStorage.setItem("token", token);
    fetchCurrentUser(token);
    navigate("/login", { replace: true });
  }, [fetchCurrentUser, navigate, searchParams]);

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({ name: email.split("@")[0], role: "student", token: "abc123" });
      navigate("/dashboard");
      setLoading(false);
    }, 500);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Account created — signing you in...");
    setTimeout(() => {
      login({ name, role: "student", token: "abc123" });
      navigate("/dashboard");
      setLoading(false);
    }, 800);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleGitHubLogin = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="logo-circle">
            <img src={logo} alt="STEMTRIBE Africa Logo" />
          </div>

          <h1 className="brand-name">STEMTRIBE Africa</h1>

          {mode === "signin" ? (
            <form className="auth-form" onSubmit={handleSignIn}>
              {/* --- form unchanged --- */}
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSignUp}>
              {/* --- form unchanged --- */}
            </form>
          )}

          {message && (
            <div
              className={`message ${
                message.includes("failed") ? "error" : "success"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .logo-circle img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
      `}</style>
    </main>
  );
}
