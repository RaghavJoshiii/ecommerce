import { useState } from 'react'; // Add this import
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { ShoppingCart, Search, User as UserIcon, Sun, Moon } from 'lucide-react';
import useStore from '../../store/useStore';

export default function Navbar() {
  const { user, cart, logout, theme, toggleTheme } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  
  // Setup state and navigation for search
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${keyword}`);
      setKeyword(''); // Clear the bar after searching
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">SmartRoute</span>
          </Link>

          {/* SEARCH BAR WIRING */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={submitHandler} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-full leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-200"
                placeholder="Search products..."
              />
            </form>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">Hi, {user.name}</span>
                <button onClick={logout} className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                <UserIcon className="h-5 w-5" />
                <span className="hidden sm:block">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}