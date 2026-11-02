import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Heart, User, PhoneCall } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, subtotal } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Consumer Fireworks', path: '/products?category=sparklers' },
    { name: 'Aerial Displays', path: '/products?category=aerial-shots' },
    { name: 'Gift Packages', path: '/products?category=gift-boxes' },
    { name: 'Wholesale B2B', path: '/wholesale' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Header Bar (Royal Festive Crimson & Gold) */}
      <div className="bg-[#7B0D14] text-white/90 py-1.5 text-[11px] hidden md:block shadow-xs">
        <div className="w-full max-w-[1760px] mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-12 2xl:px-16">
          <div className="flex items-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-amber-200 transition-colors">Privacy Policy</Link>
            <span className="text-white/30">|</span>
            <Link to="/terms-conditions" className="hover:text-amber-200 transition-colors">Terms of Use</Link>
            <span className="text-white/30">|</span>
            <Link to="/about" className="hover:text-amber-200 transition-colors">FAQ</Link>
            <span className="text-white/30">|</span>
            <Link to="/contact" className="hover:text-amber-200 transition-colors">Contact</Link>
            <span className="text-white/30">|</span>
            <Link to="/about" className="hover:text-amber-200 transition-colors">About</Link>
            <span className="text-white/30">|</span>
            <span className="text-[#FFE082] font-semibold flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#FFE082]" />
              Sivakasi Helpline: +91 80984 43633
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <Link to="/contact" className="flex items-center gap-1.5 hover:text-amber-200 transition-colors">
              <User className="w-3.5 h-3.5 text-[#FFE082]" />
              <span>Login or register</span>
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/products" className="flex items-center gap-1.5 hover:text-amber-200 transition-colors">
              <Heart className="w-3.5 h-3.5 text-red-300" />
              <span>Wishlist (0)</span>
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/cart" className="flex items-center gap-1.5 text-white font-semibold hover:text-[#FFE082] transition-colors">
              <ShoppingBag className="w-3.5 h-3.5 text-[#FFE082]" />
              <span>Cart: <strong className="text-[#FFE082]">₹{subtotal}</strong></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Brand Navbar (Pure White Theme) */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-2.5 shadow-md'
            : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-gray-100 shadow-xs'
        }`}
      >
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
          <div className="flex items-center justify-between">
            {/* Brand Logo with supplied finalized logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-[#D49A26] bg-black p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/pon_murugan_logo.png"
                  alt="PON MURUGAN Finalized Logo"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = '/assets/pon_murugan_logo.jpg';
                  }}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-xl sm:text-2xl tracking-tighter text-[#D81C28] uppercase font-sans">
                    PON
                  </span>
                  <span className="font-black text-xl sm:text-2xl tracking-tighter text-gray-900 uppercase font-sans">
                    MURUGAN
                  </span>
                </div>
                <span className="text-[9px] tracking-[0.28em] uppercase text-[#B8860B] font-extrabold -mt-1">
                  FIREWORKS • SIVAKASI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (PyroWest clean style on White Theme) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-lg text-xs xl:text-sm font-bold tracking-wide transition-all ${
                      isActive
                        ? 'text-[#D81C28] bg-red-50 font-black border-b-2 border-[#D81C28]'
                        : 'text-gray-700 hover:text-[#D81C28] hover:bg-gray-100'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Search button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search Fireworks"
                className="p-2 sm:p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black transition-colors"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/products"
                aria-label="Wishlist"
                className="p-2 sm:p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-[#D81C28] transition-colors relative hidden sm:block"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              {/* Cart Icon with Red Pill Count Badge */}
              <Link
                to="/cart"
                aria-label="Shopping Cart"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-gray-900 transition-all group"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#D81C28] group-hover:scale-110 transition-transform" />
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#D81C28] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                      {totalItemsCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-gray-900 hidden md:inline">
                  ₹{subtotal}
                </span>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 lg:hidden focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (White Theme) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 shadow-xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                      isActive
                        ? 'text-[#D81C28] bg-red-50'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-[#D81C28]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 text-xs">
                <a
                  href="tel:8098443633"
                  className="py-2.5 px-3 rounded-lg bg-[#D81C28] text-white font-bold text-center shadow-md"
                >
                  Call Sivakasi Desk: +91 80984 43633
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
