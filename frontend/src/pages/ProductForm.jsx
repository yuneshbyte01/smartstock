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
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Electronics', 'Clothing', 'Food & Beverages', 'Books', 'Home & Garden',
    'Sports', 'Beauty & Health', 'Automotive', 'Toys', 'Office Supplies'
  ];

  const units = [
    'pcs', 'kg', 'g', 'lb', 'oz', 'L', 'ml', 'm', 'cm', 'ft', 'box', 'pack'
  ];

  useEffect(() => {
    if (isEdit) {
      loadProduct();
    }
  }, [id, isEdit]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      alert('Failed to load product');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.sku.trim()) newErrors.sku = 'SKU is required';
    if (!product.category.trim()) newErrors.category = 'Category is required';
    if (!product.unit.trim()) newErrors.unit = 'Unit is required';
    if (!product.price || product.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (product.stock < 0) newErrors.stock = 'Stock cannot be negative';
    if (product.minReorderLevel < 0) newErrors.minReorderLevel = 'Minimum reorder level cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      
      // Convert string values to appropriate types
      const productData = {
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock),
        minReorderLevel: parseInt(product.minReorderLevel)
      };

      if (isEdit) {
        await updateProduct(id, productData);
        alert('Product updated successfully!');
      } else {
        await createProduct(productData);
        alert('Product created successfully!');
      }
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Error submitting product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-8 h-8"></div>
        <span className="ml-2 text-gray-600">Loading product...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEdit ? 'Update product information' : 'Add a new product to your inventory'}
          </p>
        </div>
        <button
          onClick={handleCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              </div>
              <div className="card-body space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      className={`input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter product name"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU *
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={product.sku}
                      onChange={handleChange}
                      className={`input ${errors.sku ? 'border-red-500' : ''}`}
                      placeholder="Enter SKU"
                      required
                    />
                    {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className={`input ${errors.category ? 'border-red-500' : ''}`}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={product.brand}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="input"
                    rows={3}
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Pricing & Inventory</h2>
              </div>
              <div className="card-body space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className={`input ${errors.price ? 'border-red-500' : ''}`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={handleChange}
                      className={`input ${errors.stock ? 'border-red-500' : ''}`}
                      placeholder="0"
                      min="0"
                      required
                    />
                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit *
                    </label>
                    <select
                      name="unit"
                      value={product.unit}
                      onChange={handleChange}
                      className={`input ${errors.unit ? 'border-red-500' : ''}`}
                      required
                    >
                      <option value="">Select unit</option>
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                    {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Reorder Level
                  </label>
                  <input
                    type="number"
                    name="minReorderLevel"
                    value={product.minReorderLevel}
                    onChange={handleChange}
                    className={`input ${errors.minReorderLevel ? 'border-red-500' : ''}`}
                    placeholder="0"
                    min="0"
                  />
                  {errors.minReorderLevel && <p className="text-red-500 text-xs mt-1">{errors.minReorderLevel}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    Alert when stock falls below this level
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Product Image</h2>
              </div>
              <div className="card-body">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                {product.imageUrl && (
                  <div className="mt-4">
                    <img
                      src={product.imageUrl}
                      alt="Product preview"
                      className="w-full h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>
              </div>
              <div className="card-body space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Barcode
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    value={product.barcode}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter barcode"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="enabled"
                    checked={product.enabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Product is enabled
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="card">
              <div className="card-body">
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary w-full"
                  >
                    {submitting ? (
                      <>
                        <div className="spinner w-4 h-4 mr-2"></div>
                        {isEdit ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <span className="mr-2">{isEdit ? '✏️' : '➕'}</span>
                        {isEdit ? 'Update Product' : 'Create Product'}
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary w-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
