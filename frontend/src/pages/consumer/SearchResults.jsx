import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import ProductCard from '../../components/ui/ProductCard';
import { Loader, SearchX, ArrowLeft } from 'lucide-react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        // Hits the search backend endpoint we configured earlier
        const { data } = await api.get(`/products/search?q=${keyword}`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch search results');
        setLoading(false);
      }
    };

    if (keyword) {
      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [keyword]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <Loader className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      <div className="mb-8 flex items-center gap-4">
        <Link to="/" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Search Results</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Showing results for "{keyword}"</p>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-lg font-medium border border-red-100 dark:border-red-500/20">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col justify-center items-center text-center">
          <SearchX className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No products found</h2>
          <p className="text-gray-500 dark:text-gray-400">We couldn't find anything matching "{keyword}". Try adjusting your search.</p>
        </div>
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