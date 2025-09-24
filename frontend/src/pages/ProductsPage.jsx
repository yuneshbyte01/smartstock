import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      const enabledProducts = data.filter(product => product.enabled);
      setProducts(enabledProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

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

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">SKU</th>
            <th className="p-3">Category</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.sku}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">Rs. {p.price}</td>
              <td className="p-3">
                <button className="text-blue-600 mr-2" onClick={() => navigate(`/products/edit/${p.id}`)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
