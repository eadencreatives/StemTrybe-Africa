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
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // =========================
  // Handle OAuth callback
  // =========================
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;

    localStorage.setItem("token", token);
    fetchCurrentUser(token);

    // clean URL to prevent re-trigger
    navigate("/login", { replace: true });
  }, []);

  // =========================
  // Fetch logged-in user
  // =========================
  const fetchCurrentUser = async (token) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  };

  // =========================
  // Email/password
  // =========================
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

  // =========================
  // OAuth redirects
  // =========================
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
          <div className="auth-header">
            <div className="logo-section">
              <div className="logo-icon">ST</div>
              <h1>STEMTRIBE Africa</h1>
            </div>
            <h2>{mode === "signin" ? "Welcome Back" : "Create Account"}</h2>
            <p className="subtitle">
              {mode === "signin" 
                ? "Sign in to continue your learning journey" 
                : "Join Africa's leading STEM learning community"}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              className={mode === "signin" ? "tab-btn active" : "tab-btn"}
              onClick={() => setMode("signin")}
            >
              Sign In
            </button>
            <button
              className={mode === "signup" ? "tab-btn active" : "tab-btn"}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-body">
            <div className="social-login">
              <button className="social-btn google-btn" onClick={handleGoogleLogin} disabled={loading}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button className="social-btn github-btn" onClick={handleGitHubLogin} disabled={loading}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            <div className="divider">
              <span>or continue with email</span>
            </div>

            {mode === "signin" ? (
              <form className="auth-form" onSubmit={handleSignIn}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input 
                    id="email"
                    type="email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="you@example.com" 
                    required 
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    id="password"
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                    required 
                    disabled={loading}
                  />
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleSignUp}>
                <div className="form-group">
                  <label htmlFor="name">Full name</label>
                  <input 
                    id="name"
                    type="text"
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="John Doe" 
                    required 
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-email">Email address</label>
                  <input 
                    id="signup-email"
                    type="email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="you@example.com" 
                    required 
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-password">Password</label>
                  <input 
                    id="signup-password"
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Create a strong password" 
                    required 
                    disabled={loading}
                  />
                </div>
                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </button>
                <p className="terms">
                  By signing up, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
                </p>
              </form>
            )}

            {message && (
              <div className={`message ${message.includes("failed") ? "error" : "success"}`}>
                {message}
              </div>
            )}
          </div>

          <div className="auth-footer">
            <div className="benefits">
              <div className="benefit-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>Hands-on lab sessions</span>
              </div>
              <div className="benefit-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>Expert mentorship</span>
              </div>
              <div className="benefit-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                <span>Real-world projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 1rem;
        }

        .auth-container {
          width: 100%;
          max-width: 480px;
        }

        .auth-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .auth-header {
          padding: 2.5rem 2rem 1.5rem;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .logo-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          background: white;
          color: #667eea;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .logo-section h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .auth-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }

        .subtitle {
          font-size: 0.95rem;
          opacity: 0.95;
          margin: 0;
        }

        .auth-tabs {
          display: flex;
          gap: 0.5rem;
          padding: 1.5rem 2rem 0;
          background: white;
        }

        .tab-btn {
          flex: 1;
          padding: 0.875rem;
          border: none;
          background: transparent;
          color: #64748b;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.2s;
        }

        .tab-btn:hover {
          color: #667eea;
        }

        .tab-btn.active {
          color: #667eea;
          border-bottom-color: #667eea;
        }

        .auth-body {
          padding: 2rem;
        }

        .social-login {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .social-btn:hover:not(:disabled) {
          border-color: #cbd5e1;
          background: #f8fafc;
          transform: translateY(-1px);
        }

        .social-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .google-btn {
          color: #1f2937;
        }

        .github-btn {
          color: #1f2937;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.75rem 0;
          color: #64748b;
          font-size: 0.875rem;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          font-size: 0.875rem;
          color: #1f2937;
        }

        .form-group input {
          padding: 0.875rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group input:disabled {
          background: #f8fafc;
          cursor: not-allowed;
        }

        .forgot-link {
          font-size: 0.875rem;
          color: #667eea;
          text-decoration: none;
          align-self: flex-end;
          margin-top: -0.25rem;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .submit-btn {
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .terms {
          font-size: 0.875rem;
          color: #64748b;
          text-align: center;
          margin-top: 0.5rem;
        }

        .terms a {
          color: #667eea;
          text-decoration: none;
        }

        .terms a:hover {
          text-decoration: underline;
        }

        .message {
          padding: 0.875rem 1rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
          margin-top: 1rem;
        }

        .message.success {
          background: #d1fae5;
          color: #065f46;
        }

        .message.error {
          background: #fee2e2;
          color: #991b1b;
        }

        .auth-footer {
          padding: 1.5rem 2rem 2rem;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .benefits {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #475569;
          font-size: 0.875rem;
        }

        .benefit-item svg {
          color: #667eea;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .auth-page {
            padding: 1rem;
          }

          .auth-header {
            padding: 2rem 1.5rem 1.25rem;
          }

          .auth-body {
            padding: 1.5rem;
          }

          .auth-tabs {
            padding: 1.25rem 1.5rem 0;
          }

          .auth-footer {
            padding: 1.25rem 1.5rem 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
