import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchProducts } from '../services/productService';

const Dashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      
      // Calculate statistics
      const totalProducts = data.length;
      const lowStock = data.filter(p => p.stock <= p.minReorderLevel && p.stock > 0).length;
      const outOfStock = data.filter(p => p.stock === 0).length;
      const totalValue = data.reduce((sum, p) => sum + (p.stock * p.price), 0);
      
      setStats({ totalProducts, lowStock, outOfStock, totalValue });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${color}`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const QuickAction = ({ title, description, icon, onClick, color = "bg-blue-50 text-blue-600" }) => (
    <button
      onClick={onClick}
      className="card hover:shadow-md transition-shadow duration-200 text-left w-full"
    >
      <div className="card-body">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${color}`}>
            <span className="text-xl">{icon}</span>
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </button>
  );

  const LowStockItem = ({ product }) => (
    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
          <span className="text-yellow-600">⚠️</span>
        </div>
        <div className="ml-3">
          <p className="font-medium text-gray-900">{product.name}</p>
          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-yellow-800">{product.stock} {product.unit}</p>
        <p className="text-xs text-yellow-600">Min: {product.minReorderLevel}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-8 h-8"></div>
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  const lowStockProducts = products.filter(p => p.stock <= p.minReorderLevel && p.stock > 0).slice(0, 5);
  const outOfStockProducts = products.filter(p => p.stock === 0).slice(0, 5);

  return (
    <div className="space-y-6 fade-in">
      {/* Welcome Header */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.username}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your inventory today.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="text-right">
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-semibold text-gray-900 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon="📦"
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Low Stock"
          value={stats.lowStock}
          icon="⚠️"
          color="bg-yellow-50 text-yellow-600"
          subtitle="Need reorder"
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStock}
          icon="❌"
          color="bg-red-50 text-red-600"
          subtitle="Urgent"
        />
        <StatCard
          title="Total Value"
          value={`₹${stats.totalValue.toLocaleString()}`}
          icon="💰"
          color="bg-green-50 text-green-600"
          subtitle="Inventory worth"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <QuickAction
              title="Add New Product"
              description="Add a new item to inventory"
              icon="➕"
              onClick={() => window.location.href = '/products/new'}
              color="bg-green-50 text-green-600"
            />
            <QuickAction
              title="View All Products"
              description="Manage your inventory"
              icon="📋"
              onClick={() => window.location.href = '/products'}
              color="bg-blue-50 text-blue-600"
            />
            <QuickAction
              title="Generate Report"
              description="Export inventory data"
              icon="📊"
              onClick={() => alert('Report feature coming soon!')}
              color="bg-purple-50 text-purple-600"
            />
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Stock Alerts</h2>
          
          {lowStockProducts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-yellow-800 mb-3">⚠️ Low Stock Items</h3>
              <div className="space-y-2">
                {lowStockProducts.map((product) => (
                  <LowStockItem key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {outOfStockProducts.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-red-800 mb-3">❌ Out of Stock Items</h3>
              <div className="space-y-2">
                {outOfStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600">❌</span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-800">0 {product.unit}</p>
                      <p className="text-xs text-red-600">Urgent reorder needed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lowStockProducts.length === 0 && outOfStockProducts.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-green-600">✅</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Good!</h3>
              <p className="text-gray-600">No stock alerts at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
