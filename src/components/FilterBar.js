import React from 'react';
import './FilterBar.css';

const FilterBar = ({ categories, selectedCategory, onCategoryChange, sortOption, onSortChange }) => {
    return (
        <div className="filter-bar">
            <div className="filter-group">
                <label htmlFor="category-select">Category:</label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="filter-select"
                >
                    <option value="All">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="sort-select">Sort By:</label>
                <select
                    id="sort-select"
                    value={sortOption}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="filter-select"
                >
                    <option value="none">select</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="stock-asc">Stock: Low to High</option>
                    <option value="stock-desc">Stock: High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
