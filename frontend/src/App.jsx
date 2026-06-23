import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/consumer/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register'; 
import Cart from './pages/consumer/Cart';
import SearchResults from './pages/consumer/SearchResults';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResults />} /> 
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 py-8 text-center mt-auto transition-colors">
          <p>&copy; {new Date().getFullYear()} SmartRoute Pro. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;