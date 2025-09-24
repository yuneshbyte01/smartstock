import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchProductById,
  createProduct,
  updateProduct
} from '../services/productService';

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    brand: '',
    description: '',
    unit: '',
    price: '',
    barcode: '',
    minReorderLevel: 0,
    imageUrl: '',
    stock: 0,
    enabled: true
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      fetchProductById(id)
        .then(data => setProduct(data))
        .catch(err => alert('Failed to load product'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct(id, product);
        alert('Product updated!');
      } else {
        await createProduct(product);
        alert('Product created!');
      }
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Error submitting product');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? 'Edit Product' : 'Add New Product'}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required className="input" />
          <input type="text" name="sku" placeholder="SKU" value={product.sku} onChange={handleChange} required className="input" />
          <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required className="input" />
          <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} className="input" />
          <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="input" />
          <input type="text" name="unit" placeholder="Unit (e.g., kg, pcs)" value={product.unit} onChange={handleChange} required className="input" />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required min="0" className="input" />
          <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} required min="0" className="input" />
          <input type="text" name="barcode" placeholder="Barcode" value={product.barcode} onChange={handleChange} className="input" />
          <input type="number" name="minReorderLevel" placeholder="Minimum Reorder Level" value={product.minReorderLevel} onChange={handleChange} min="0" className="input" />
          <input type="text" name="imageUrl" placeholder="Image URL" value={product.imageUrl} onChange={handleChange} className="input" />
          <label className="flex items-center">
            <input type="checkbox" name="enabled" checked={product.enabled} onChange={handleChange} className="mr-2" />
            Enabled
          </label>
          <button type="submit" className="btn">
            {isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductForm;
