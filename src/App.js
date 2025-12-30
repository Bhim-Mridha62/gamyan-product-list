import React, { useState, useEffect, useMemo } from 'react';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import ProductForm from './components/ProductForm';
import { initialProducts } from './data/initialData';
import './App.css';
import FilterBar from './components/FilterBar';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterActive, setFilterActive] = useState('All');
  const [sortOption, setSortOption] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return Array.from(uniqueCategories).sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesActive = filterActive === 'All' ||
        (filterActive === 'Active' && product.isActive) ||
        (filterActive === 'Inactive' && !product.isActive);
      return matchesSearch && matchesCategory && matchesActive;
    });

    // Sorting logic
    if (sortOption !== 'none') {
      result.sort((a, b) => {
        switch (sortOption) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'stock-asc':
            return a.stock - b.stock;
          case 'stock-desc':
            return b.stock - a.stock;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortOption, filterActive]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedProductIds([]); // Clear selection on filter change
  }, [searchQuery, selectedCategory, sortOption, itemsPerPage, filterActive]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      const newProduct = {
        ...product,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: [] // Default empty tags for new products
      };
      setProducts([newProduct, ...products]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== productId));
      setSelectedProductIds(prev => prev.filter(id => id !== productId));
    }
  }

  const handleSelectProduct = (id) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProductIds(currentProducts.map(p => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedProductIds.length === 0) return;

    if (window.confirm(`Are you sure you want to delete ${selectedProductIds.length} products?`)) {
      setProducts(products.filter(p => !selectedProductIds.includes(p.id)));
      setSelectedProductIds([]);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Product Manager</h1>
          <div className="header-actions">
            {selectedProductIds.length > 0 && (
              <button className="delete-selected-btn" onClick={handleDeleteSelected}>
                Delete Selected ({selectedProductIds.length})
              </button>
            )}
            <button className="add-btn" onClick={handleAddProduct}>+ Add Product</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="controls-bar">
          <SearchBar onSearch={setSearchQuery} />
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
          </div>
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
            filterActive={filterActive}
            onFilterActiveChange={setFilterActive}
          />
        </div>

        <ProductList
          products={currentProducts}
          viewMode={viewMode}
          onEdit={handleEditProduct}
          selectedProductIds={selectedProductIds}
          onSelectProduct={handleSelectProduct}
          onSelectAll={handleSelectAll}
          allSelected={currentProducts.length > 0 && currentProducts.every(p => selectedProductIds.includes(p.id))}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </main>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
