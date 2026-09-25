import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api.js';
import Navbar from '../Components/Navbar.jsx';
import ProductCard from '../Components/ProductCard.jsx';
import SearchBar from '../Components/SearchBar.jsx';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async (search = '', category = '') => {
        try {
            setLoading(true);
            setError(null);
            
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (category) params.append('category', category);
            
            const response = await api.get(`/products?${params.toString()}`);
            setProducts(response.data.products || []);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Something went wrong while loading products.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSearch = useCallback((searchTerm, category) => {
        fetchProducts(searchTerm, category);
    }, [fetchProducts]);

    // Simple mock customer since auth state context isn't available here
    const customer = { fullName: 'Guest' };

    return (
        <div className="page-container">
            <Navbar customer={customer} />
            <main className="main-content">
                <div className="products-header">
                    <h2>Discover Products</h2>
                    <SearchBar onSearch={handleSearch} />
                </div>
                
                {loading && (
                    <div className="state-container loading-state">
                        <div className="spinner"></div>
                        <p>Loading products...</p>
                    </div>
                )}
                
                {error && (
                    <div className="state-container error-state">
                        <p>Something went wrong while loading products.</p>
                        <button onClick={() => fetchProducts()}>Try Again</button>
                    </div>
                )}
                
                {!loading && !error && products.length === 0 && (
                    <div className="state-container empty-state">
                        <div className="empty-icon">📦</div>
                        <p>No products found.</p>
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="products-grid">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Products;
