import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, addToCart, decreaseQty, removeFromCart, user } = useStore();
  const navigate = useNavigate();

  // Calculate totals
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout'); // We will build this next
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-20 w-20 text-gray-300 dark:text-gray-600 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="w-full lg:w-2/3 space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-4 transition-colors">
              
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-gray-50 dark:bg-gray-700" />
              
              <div className="flex-1 text-center sm:text-left">
                <Link to={`/product/${item._id}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.category}</p>
                <p className="text-lg font-black text-gray-900 dark:text-white mt-2">${item.price.toFixed(2)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-1">
                <button onClick={() => decreaseQty(item._id)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-600 rounded-md transition">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-bold w-6 text-center dark:text-white">{item.qty}</span>
                <button onClick={() => addToCart(item)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-600 rounded-md transition">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Remove Button */}
              <button onClick={() => removeFromCart(item._id)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium text-gray-900 dark:text-white">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Shipping</span>
                <span className="font-medium text-green-600 dark:text-green-400">Free</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white">${totalPrice}</span>
              </div>
            </div>

            <button 
              onClick={checkoutHandler}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}