import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onEdit, selected, onSelect }) => {
    return (
        <div className={`product-card ${selected ? 'selected-card' : ''}`}>
            <div className="card-header">
                <span className={`status-badge ${product.isActive ? 'active' : 'inactive'}`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                </span>
                {/* <div className="card-checkbox"> */}
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onSelect(product.id)}
                />
                {/* </div> */}
            </div>

            <div className="product-header">
                <h3>{product.name}</h3>
                <span className="product-category">{product.category}</span>
            </div>
            <span className="product-date">Created At: {new Date(product.createdAt).toLocaleDateString()}</span>
            <p className="product-description">{product.description}</p>
            <div className="product-details">
                <span className="product-price">₹{product.price}</span>
                <span
                    className={`product-stock ${product.stock < 10
                        ? 'stock-low'
                        : product.stock <= 20
                            ? 'stock-medium'
                            : 'stock-high'
                        }`}
                >
                    Stock: {product.stock}
                </span>
            </div>
            <div className="product-tags">
                {product.tags && product.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
            </div>
            <button className="edit-btn" onClick={() => onEdit(product)}>Edit</button>
        </div>
    );
};

export default ProductCard;
