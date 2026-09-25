import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/customers/login", {
                email: email.trim(),
                password
            });

            if (response.status === 200) {
                navigate("/home");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="brand-badge">
                        <span>🛒 ShopKart</span>
                    </div>
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Log in to your account</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Don't have an account? <Link to="/register" className="auth-link">Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
