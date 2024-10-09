import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../utils/apiService';
import { FiLogOut } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem('user');
  const headerRef = useRef(null);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/mission', label: 'Our Mission' },
    { path: '/publications', label: 'Publications' },
    { path: '/community', label: 'Community' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header ref={headerRef} className="fixed top-5 left-10 right-10 z-50 flex items-center justify-between p-4 bg-gray-800 text-white rounded-full">
      <div className="flex items-center">
        <motion.img
          src={logo}
          alt="Logo"
          className="h-10 w-auto rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <motion.nav
        className="hidden lg:flex items-center space-x-4"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-2 rounded-full transition-all duration-300 ${
              location.pathname === link.path
                ? 'bg-cyan-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {link.label}
          </Link>
        ))}
        {isAuthenticated && (
          <Link
            to="/dashboard"
            className={`px-3 py-2 rounded-full transition-all duration-300 ${
              location.pathname === '/dashboard'
                ? 'bg-cyan-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Dashboard
          </Link>
        )}
      </motion.nav>
      <div className="flex items-center space-x-2">
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-2 rounded-full ${
            theme === 'light' ? 'bg-gray-700' : 'bg-yellow-400'
          } text-white flex items-center justify-center`}
        >
          {theme === 'light' ? (
            <span role="img" aria-label="moon">🌙</span>
          ) : (
            <span role="img" aria-label="sun">☀️</span>
          )}
        </motion.button>
        {isAuthenticated ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="p-2 rounded-full bg-red-500 text-white flex items-center justify-center"
            aria-label="Logout"
          >
            <FiLogOut size={20} />
          </motion.button>
        ) : (
          <Web3LoginButton />
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="absolute top-full left-0 right-0 flex flex-col items-start p-4 bg-gray-800 text-white rounded-b-3xl lg:hidden mt-2"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.5 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-full my-1 w-full transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-full my-1 w-full transition-all duration-300 ${
                  location.pathname === '/dashboard'
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

const Web3LoginButton = () => {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/login">
        <motion.button
          whileHover={{
            background: [
              "linear-gradient(45deg, #00dbde, #fc00ff)",
              "linear-gradient(45deg, #fc466b, #3f5efb)",
              "linear-gradient(45deg, #6a11cb, #2575fc)",
            ],
            boxShadow: "0px 0px 15px 5px rgba(0, 220, 255, 0.6)",
            transition: { duration: 0.4 },
          }}
          className="px-2 py-2 text-base sm:px-6 sm:py-3 sm:text-lg rounded-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold shadow-lg transform transition-all ease-in-out duration-500"
        >
          <span className="relative z-10">Login</span>
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Header;