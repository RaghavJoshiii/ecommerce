import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import api from '../../utils/api';
import { PlusCircle, Package, AlertCircle, Pencil, X } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useStore();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    } else {
      fetchProducts();
    }
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Pre-fill form when edit is clicked
  const handleEditClick = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
    // Scroll to top smoothly so admin sees the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear form and exit edit mode
  const resetForm = () => {
    setEditingId(null);
    setName(''); setPrice(''); setImage(''); setCategory(''); setCountInStock(''); setDescription('');
    setError('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const productData = {
      name,
      price: Number(price),
      image,
      category,
      countInStock: Number(countInStock),
      description,
    };

    try {
      if (editingId) {
        // UPDATE existing product
        await api.put(`/products/${editingId}`, productData);
      } else {
        // CREATE new product
        await api.post('/products', productData);
      }
      
      resetForm();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-8">
        <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PRODUCT FORM */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {editingId ? <Pencil className="h-5 w-5 text-blue-600" /> : <PlusCircle className="h-5 w-5" />} 
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            {editingId && (
              <button onClick={resetForm} className="text-gray-500 hover:text-red-500 transition">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 p-3 rounded-lg flex items-center gap-2 mb-4 border border-red-100 dark:border-red-500/20">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
                <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                <input type="number" required value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
              <input type="text" required placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <input type="text" required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-3 font-bold rounded-lg transition disabled:opacity-50 text-white ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700'}`}>
              {loading ? 'Saving...' : editingId ? 'Update Product' : 'Publish Product'}
            </button>
          </form>
        </div>

        {/* INVENTORY LIST */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Current Inventory</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Stock</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-900 dark:text-gray-300 text-sm">
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <td className="py-4 flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover bg-gray-100 dark:bg-gray-700" />
                      <span className="font-medium line-clamp-1">{product.name}</span>
                    </td>
                    <td className="py-4">${product.price.toFixed(2)}</td>
                    <td className="py-4">{product.category}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.countInStock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                        {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {/* EDIT BUTTON ADDED HERE */}
                      <button 
                        onClick={() => handleEditClick(product)}
                        className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        title="Edit Product"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No products found. Start adding some!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}