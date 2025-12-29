import React from 'react';
import ProductCard from './ProductCard';
import ProductRow from './ProductRow';
import './ProductList.css';

const ProductList = ({ products, viewMode, onEdit, selectedProductIds, onSelectProduct, onSelectAll, allSelected }) => {
    if (products.length === 0) {
        return <div className="no-products">No products found.</div>;
    }

    return (
        <div className={`product-list ${viewMode}`}>
            {viewMode === 'grid' ? (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={onEdit}
                            selected={selectedProductIds.includes(product.id)}
                            onSelect={onSelectProduct}
                        />
                    ))}
                </div>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th className="checkbox-cell">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={onSelectAll}
                                />
                            </th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <ProductRow
                                key={product.id}
                                product={product}
                                onEdit={onEdit}
                                selected={selectedProductIds.includes(product.id)}
                                onSelect={onSelectProduct}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
