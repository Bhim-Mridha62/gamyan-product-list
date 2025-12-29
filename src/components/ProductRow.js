import React from 'react';

const ProductRow = ({ product, onEdit }) => {
    return (
        <tr>
            <td>
                <div className="product-name-cell">
                    <strong>{product.name}</strong>
                    <span className="mobile-description">{product.description}</span>
                </div>
            </td>
            <td>₹{product.price}</td>
            <td>{product.category}</td>
            <td className={product.stock < 10 ? 'low-stock' : ''}>{product.stock}</td>
            <td>
                <button className="edit-btn-small" onClick={() => onEdit(product)}>Edit</button>
            </td>
        </tr>
    );
};

export default ProductRow;
