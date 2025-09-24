import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data); // Show all products, including disabled ones
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  // Filter by search text
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()))
  );

  // Sort by selected field
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (typeof valA === 'string') {
      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  // Pagination logic
  const start = (currentPage - 1) * pageSize;
  const paginatedProducts = sortedProducts.slice(start, start + pageSize);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📦 Products</h2>
        <button
          className="btn"
          onClick={() => navigate('/products/new')}
        >
          + Add Product
        </button>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, SKU, brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="category">Sort by Category</option>
          <option value="enabled">Sort by Status</option>
        </select>
        <button
          onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
          className="btn"
        >
          {sortOrder === 'asc' ? '⬆️ Ascending' : '⬇️ Descending'}
        </button>
      </div>

      {/* Product Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">SKU</th>
            <th className="p-3">Category</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map(p => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {p.imageUrl
                  ? <img src={p.imageUrl} alt="product" className="h-10 w-10 object-cover rounded" />
                  : '—'}
              </td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.sku}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">Rs. {p.price}</td>
              <td className="p-3">
                {p.enabled ? (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Enabled</span>
                ) : (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">Disabled</span>
                )}
              </td>
              <td className="p-3">
                <button
                  className="text-blue-600 mr-2"
                  onClick={() => navigate(`/products/edit/${p.id}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {paginatedProducts.length === 0 && (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
          className="btn"
        >
          ⬅️ Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={start + pageSize >= sortedProducts.length}
          onClick={() => setCurrentPage(p => p + 1)}
          className="btn"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
