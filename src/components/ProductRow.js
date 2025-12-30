import React from 'react';

const ProductRow = ({ product, onEdit, selected, onSelect }) => {
    return (
        <tr className={selected ? 'selected-row' : ''}>
            <td className="checkbox-cell">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onSelect(product.id)}
                />
            </td>
            <td>
                <div className="product-name-cell">
                    <strong>{product.name}</strong>
                    <span className="mobile-description">{product.description}</span>
                </div>
            </td>
            <td>₹{product.price}</td>
            <td>{product.category}</td>
            <td>{new Date(product.createdAt).toLocaleDateString()}</td>
            <td
                className={
                    product.stock < 10
                        ? 'stock-low'
                        : product.stock <= 20
                            ? 'stock-medium'
                            : 'stock-high'
                }
            >
                {product.stock}
            </td>
            <td>
                <span className={`status-badge ${product.isActive ? 'active' : 'inactive'}`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <div className="tags-cell">
                    {product.tags && product.tags.map(tag => (
                        <span key={tag} className="tag-badge">#{tag}</span>
                    ))}
                </div>
            </td>
            <td className="description-cell">{product.description}</td>
            <td>
                <button className="edit-btn-small" onClick={() => onEdit(product)}>Edit</button>
            </td>
        </tr>
    );
};

export default ProductRow;
