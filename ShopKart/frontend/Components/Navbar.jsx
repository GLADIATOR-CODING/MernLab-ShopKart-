import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../services/api.js";

const Navbar = ({ customer }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await api.post("/customers/logout");
        } catch {
        } finally {
            setIsLoggingOut(false);
            navigate("/login");
        }
    };

    const isProductsActive = location.pathname.startsWith("/products");
    const isHomeActive = location.pathname === "/home";

    return (
        <header className="navbar">
            <div className="nav-brand" onClick={() => navigate('/home')} style={{cursor: 'pointer'}}>
                <div className="nav-brand-icon">🛒</div>
                <span>ShopKart</span>
            </div>
            
            <nav className="nav-links">
                <Link 
                    to="/home" 
                    className={`nav-item-home ${isHomeActive ? 'active' : ''}`}
                    title="Go to Home"
                >
                    <span className="nav-home-icon">⚡</span>
                    <span className="nav-home-text">Home</span>
                </Link>

                <Link 
                    to="/products" 
                    className={`nav-products-btn ${isProductsActive ? 'active' : ''}`}
                    title="Browse Products Catalog"
                >
                    <div className="nav-products-icon-wrap">
                        <svg 
                            className="neo-bag-icon"
                            width="19" 
                            height="19" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="3" y="6" width="18" height="15" rx="3" fill="var(--yellow)" stroke="var(--black)" strokeWidth="2.5" />
                            <path d="M8 6V4.5C8 3.12 9.12 2 10.5 2H13.5C14.88 2 16 3.12 16 4.5V6" stroke="var(--black)" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="8.5" cy="11.5" r="1.3" fill="var(--black)" />
                            <circle cx="15.5" cy="11.5" r="1.3" fill="var(--black)" />
                            <path d="M10 15C10.6 16 13.4 16 14 15" stroke="var(--black)" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="nav-products-title">Products</span>
                    <span className="nav-products-badge">HOT</span>
                </Link>
            </nav>

            <div className="nav-user-actions">
                {customer && (
                    <div className="user-badge">
                        <span>👤 {customer.fullName}</span>
                    </div>
                )}

                <button
                    className="btn-logout"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                >
                    {isLoggingOut ? "..." : "Logout"}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
