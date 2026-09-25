import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import Navbar from '../Components/Navbar.jsx';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError('Something went wrong while loading the product.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const customer = { fullName: 'Guest' };

    return (
        <div className="page-container">
            <Navbar customer={customer} />
            <main className="main-content">
                <button className="btn-back" onClick={() => navigate('/products')}>
                    &larr; Back to Products
                </button>

                {loading && (
                    <div className="state-container loading-state">
                        <div className="spinner"></div>
                        <p>Loading product details...</p>
                    </div>
                )}

                {error && (
                    <div className="state-container error-state">
                        <p>{error}</p>
                        <button className="btn-primary" onClick={() => navigate('/products')}>Go Back</button>
                    </div>
                )}

                {!loading && !error && product && (
                    <div className="product-details-container">
                        <div className="product-details-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-details-info">
                            <span className="details-category">{product.category}</span>
                            <h2 className="details-title">{product.name}</h2>
                            <p className="details-description">{product.description}</p>
                            
                            <div className="details-price-stock">
                                <span className="details-price">₹{product.price}</span>
                                <span className={`details-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                    {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
                                </span>
                            </div>

                            <button 
                                className="btn-add-to-cart" 
                                disabled={product.stock === 0}
                                onClick={() => alert('Add to cart clicked! (UI only for now)')}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProductDetails;
