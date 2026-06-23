import { useState, useEffect } from 'react';
import api from '../../utils/api';
import ProductCard from '../../components/ui/ProductCard';
import { Loader } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // This hits http://localhost:5000/api/products
        const { data } = await api.get('/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <Loader className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg font-medium border border-red-100">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Latest Arrivals</h1>
        <p className="text-gray-500 mt-2">Discover our newest and most popular tech gear.</p>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found. Please add some from the admin dashboard.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}