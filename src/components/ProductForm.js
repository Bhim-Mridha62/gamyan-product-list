import React, { useState, useEffect } from 'react';
import './ProductForm.css';

const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: '',
        isActive: true,
        tags: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                category: product.category,
                stock: product.stock,
                description: product.description || '',
                isActive: product.isActive !== undefined ? product.isActive : true,
                tags: product.tags ? product.tags.join(', ') : ''
            });
        }

        // Lock body scroll when modal is open
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            // Restore body scroll when modal is closed
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [product]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (formData.stock === '' || Number(formData.stock) < 0) newErrors.stock = 'Valid stock is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {

            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            onSave({
                ...product,
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                tags: tagsArray
            });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className={errors.price ? 'error' : ''}
                        />
                        {errors.price && <span className="error-msg">{errors.price}</span>}
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className={errors.category ? 'error' : ''}
                        >
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Audio">Audio</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Wearables">Wearables</option>
                            <option value="Storage">Storage</option>
                        </select>
                        {errors.category && <span className="error-msg">{errors.category}</span>}
                    </div>

                    <div className="form-group">
                        <label>Stock</label>
                        <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            className={errors.stock ? 'error' : ''}
                        />
                        {errors.stock && <span className="error-msg">{errors.stock}</span>}
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            Is Active
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Tags (comma separated)</label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            placeholder="e.g. electronics, sale, new"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
                        <button type="submit" className="save-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
