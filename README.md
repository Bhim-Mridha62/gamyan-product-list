# Gamyan Product List

A React-based product management application that allows users to view, search, filter, and manage a list of products.

## Features

- **Product List**: View products in both List and Grid views.
- **Add Product**: Add new products with details like Name, Price, Category, Stock, Description, Tags, and Status.
- **Edit Product**: Edit existing product details.
- **Search**: Search products by name or category.
- **Filter**: Filter products by Category and Status (Active/Inactive).
- **Sort**: Sort products by Price and Stock (Low to High / High to Low).
- **Pagination**: Navigate through large lists of products with customizable items per page.
- **Bulk Actions**: Select multiple products to delete them in bulk.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js
- **Styling**: CSS3
- **State Management**: React Hooks (useState, useEffect, useMemo)

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd gamyan-product-list
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

Build the app for production:
```bash
npm run build
```
The build artifacts will be stored in the `build/` directory.

## Project Structure

```
src/
  components/
    FilterBar.js       # Filtering and sorting controls
    Pagination.js      # Pagination controls
    ProductCard.js     # Card view for a single product
    ProductForm.js     # Modal form for adding/editing products
    ProductList.js     # Container for list/grid views
    ProductRow.js      # Table row for list view
    SearchBar.js       # Search input
  data/
    initialData.js     # Mock data for products
  App.js               # Main application component
  App.css              # Global styles
  index.js             # Entry point
```

