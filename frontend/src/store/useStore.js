import { create } from 'zustand';

// Initialize theme immediately to prevent flashing
const initialTheme = localStorage.getItem('theme') || 'light';
if (initialTheme === 'dark') document.documentElement.classList.add('dark');

const useStore = create((set) => ({
  // --- THEME STATE ---
  theme: initialTheme,
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),

  // --- AUTH STATE ---
  user: JSON.parse(localStorage.getItem('userInfo')) || null,
  login: (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem('userInfo');
    set({ user: null });
  },

  // --- CART STATE ---
  cart: JSON.parse(localStorage.getItem('cartItems')) || [],
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item._id === product._id);
    let newCart;
    if (existingItem) {
      newCart = state.cart.map(item => 
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      newCart = [...state.cart, { ...product, qty: 1 }];
    }
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    return { cart: newCart };
  }),
  decreaseQty: (productId) => set((state) => {
    const existingItem = state.cart.find(item => item._id === productId);
    let newCart;
    if (existingItem.qty === 1) {
      newCart = state.cart.filter(item => item._id !== productId);
    } else {
      newCart = state.cart.map(item => 
        item._id === productId ? { ...item, qty: item.qty - 1 } : item
      );
    }
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    return { cart: newCart };
  }),
  removeFromCart: (productId) => set((state) => {
    const newCart = state.cart.filter(item => item._id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    return { cart: newCart };
  })
}));

export default useStore;