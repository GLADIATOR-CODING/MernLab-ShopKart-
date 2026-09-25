import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-category">{product.category}</span>
                <div className="product-price-stock">
                    <span className="product-price">₹{product.price}</span>
                    <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {product.stock > 0 ? `${product.stock} units left` : 'Out of stock'}
                    </span>
                </div>
                <button 
                    className="btn-view-details"
                    onClick={() => navigate(`/products/${product._id}`)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
