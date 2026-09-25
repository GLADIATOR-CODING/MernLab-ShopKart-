import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import Navbar from "../Components/Navbar.jsx";
import ProductCard from "../Components/ProductCard.jsx";

const Home = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trendingProducts, setTrendingProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerRes = await api.get("/customers/me");
                setCustomer(customerRes.data?.customer || customerRes.data);
            } catch {
                navigate("/login");
                return; // Stop execution if auth fails
            } finally {
                setLoading(false);
            }

            // Fetch trending products separately so it doesn't break auth flow
            try {
                const productsRes = await api.get("/products");
                // Get 6 products for a complete 2-row x 3-column grid
                setTrendingProducts((productsRes.data.products || []).slice(0, 6));
            } catch (err) {
                console.error("Failed to fetch trending products");
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p style={{ fontWeight: 800, fontSize: "1.1rem" }}>Loading ShopKart...</p>
            </div>
        );
    }

    if (!customer) {
        return null;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar customer={customer} />

            <main className="home-container">
                <div className="welcome-banner-desktop">
                    <div>
                        <h1 className="welcome-title">
                            Welcome, {customer.fullName}! 🛒
                        </h1>
                        <p className="welcome-desc">
                            ShopKart Customer Dashboard • Verified Member
                        </p>
                    </div>

                    <div className="mini-stats-inline">
                        <div className="mini-stat-chip">
                            <span className="mini-chip-icon">📦</span>
                            <div>
                                <div className="mini-chip-label">1 Order</div>
                                <div className="mini-chip-sub">In Transit</div>
                            </div>
                        </div>
                        <div className="mini-stat-chip">
                            <span className="mini-chip-icon">🏷️</span>
                            <div>
                                <div className="mini-chip-label">20% Off</div>
                                <div className="mini-chip-sub">SHOPKART20</div>
                            </div>
                        </div>
                        <div className="mini-stat-chip">
                            <span className="mini-chip-icon">⭐</span>
                            <div>
                                <div className="mini-chip-label">150 Pts</div>
                                <div className="mini-chip-sub">Gold Tier</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-columns">
                    <div className="profile-card">
                        <h2 className="card-title">
                            <span>👤</span>
                            <span>Customer Profile</span>
                        </h2>

                        <div className="info-row">
                            <span className="info-label">Full Name</span>
                            <span className="info-value">{customer.fullName}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Email Address</span>
                            <span className="info-value">{customer.email}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Phone Number</span>
                            <span className="info-value">{customer.phone || "Not provided"}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Account Status</span>
                            <span className="status-pill">Active</span>
                        </div>
                    </div>

                    <div className="profile-card">
                        <h2 className="card-title">
                            <span>📦</span>
                            <span>Recent Order</span>
                        </h2>

                        <div className="info-row">
                            <span className="info-label">Order ID</span>
                            <span className="info-value">#SK-84920</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Item</span>
                            <span className="info-value">Cyber Mech Keyboard</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Delivery</span>
                            <span className="status-pill status-shipping">🚚 Out for Delivery</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Amount Paid</span>
                            <span className="info-value">$89.00</span>
                        </div>
                    </div>
                </div>

                {/* TRENDING PRODUCTS SECTION */}
                {trendingProducts.length > 0 && (
                    <div className="trending-section" style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', textShadow: '2px 2px 0px var(--yellow)' }}>
                                🔥 Trending Now
                            </h2>
                            <button 
                                onClick={() => navigate('/products')}
                                style={{
                                    padding: '0.6rem 1.2rem',
                                    background: 'var(--white)',
                                    border: '3px solid var(--black)',
                                    borderRadius: '8px',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    boxShadow: '3px 3px 0px var(--black)'
                                }}
                            >
                                View All &rarr;
                            </button>
                        </div>
                        <div className="products-grid">
                            {trendingProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
