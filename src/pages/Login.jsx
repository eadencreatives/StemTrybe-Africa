import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchCurrentUser = useCallback(async (token) => {
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

      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  }, [API_URL, login, navigate]);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;

    localStorage.setItem("token", token);
    fetchCurrentUser(token);
    navigate("/login", { replace: true });
  }, [fetchCurrentUser, navigate, searchParams]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Replace with your real API endpoint (was mock timeout)
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access || data.token);
        fetchCurrentUser(data.access || data.token);
      } else if (res.status === 401) {
        setError("Invalid username or password. Username is case-sensitive.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        toast.success("Account created — signing you in...");
        // Auto-login after signup
        const data = await res.json();
        localStorage.setItem("token", data.access || data.token);
        fetchCurrentUser(data.access || data.token);
      } else {
        const data = await res.json();
        setError(data.message || "Signup failed.");
      }
    } catch (err) {
      setError("Network error during signup.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleGitHubLogin = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-[#f0f9ff] to-[#10b981] p-4">
      {/* Desktop Card */}
      <div className="hidden md:flex w-[400px] bg-white flex-col gap-4 items-center justify-center border border-gray-200 rounded-xl shadow-xl p-6">
        <Card className="w-full shadow-none border-none">
          <CardHeader className="text-center pb-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">ST</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">STEMTRIBE Africa</h1>
            </div>
          </CardHeader>
          <CardContent>
            {mode === "signin" ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <p className="text-red-500 text-xs text-center min-h-[1.25rem]">{error}</p>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-sm">Email/Username</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Enter email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="h-12 bg-[#f8f9fa] focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-semibold text-sm">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="h-12 bg-[#f8f9fa] focus:bg-white"
                  />
                </div>
                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#5568d3] hover:to-[#65408b] font-semibold" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="flex items-center gap-2 py-3">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs text-gray-500 px-2">or continue with</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="h-11 flex items-center gap-2" onClick={handleGoogleLogin} disabled={loading}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      {/* Your Google SVG paths */}
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </Button>
                  <Button type="button" variant="outline" className="h-11 flex items-center gap-2" onClick={handleGitHubLogin} disabled={loading}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      {/* Your GitHub SVG path */}
                      <path d="M12 2C6.477 2 2
