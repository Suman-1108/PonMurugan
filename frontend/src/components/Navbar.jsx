import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo/pon_murugan_logo.png';

const Navbar = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Collections', path: '/products' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      {/* Top Running Announcement Ticker Bar (Deep Festive Crimson Gradient) */}
      <div className="bg-gradient-to-r from-[#65090F] via-[#7F0E16] to-[#65090F] text-white py-1.5 overflow-hidden border-b border-[#4E060B] shadow-xs select-none">
        <div className="animate-ticker flex items-center whitespace-nowrap text-xs font-bold tracking-wide">
          {/* Loop Segment 1 */}
          <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B] inline-block"></span>
              <span className="text-base leading-none">🎉</span>
              <span className="text-white font-extrabold">Diwali Special Offers</span>
              <span className="text-amber-400">•</span>
              <span className="text-amber-200">Best Prices</span>
              <span className="text-amber-400">•</span>
              <span className="text-white">Premium Crackers</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="text-amber-400">•</span>
              <span className="text-base leading-none">🚚</span>
              <span className="text-white">Direct Sivakasi Factory Wholesale</span>
              <span className="text-amber-400">•</span>
              <span className="text-[#FFE082] font-black uppercase tracking-wider bg-red-950/70 px-2 py-0.5 rounded border border-amber-400/40">
                Flat 80% Off
              </span>
            </span>

            <span className="flex items-center gap-2">
              <span className="text-amber-400">•</span>
              <span className="text-base leading-none">💥</span>
              <span className="text-white">100% Legal PESO Green Crackers & Fresh 2026 Stock</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="text-amber-400">•</span>
              <span className="text-base leading-none">📞</span>
              <span className="text-white">Helpline & WhatsApp:</span>
              <span className="text-amber-200 font-extrabold">+91 80984 43633</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="text-amber-400">•</span>
              <span className="text-base leading-none">✨</span>
              <span className="text-white">Pan-India Fast Transport Delivery</span>
            </span>
          </div>

          {/* Loop Segment 2 (Duplicate for continuous loop) */}
          <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8" aria-hidden="true">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B] inline-block"></span>
              <span className="text-base leading-none">🎉</span>
              <span className="text-white font-extrabold">Diwali Special Offers</span>
              <span className="text-amber-400">•</span>
              <span className="text-amber-200">Best Prices</span>
              <span className="text-amber-400">•</span>
              <span className="text-white">Premium Crackers</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="text-amber-400">•</span>
              <span className="text-base leading-none">🚚</span>
              <span className="text-white">Direct Sivakasi Factory Wholesale</span>
              <span className="text-amber-400">•</span>
              <span className="text-[#FFE082] font-black uppercase tracking-wider bg-red-950/70 px-2 py-0.5 rounded border border-amber-400/40">
                Flat 80% Off
              </span>
            </span>

            <span className="flex items-center gap-2">
              <span className="text-amber-400">•</span>
              <span className="text-base leading-none">💥</span>
              <span className="text-white">100% Legal PESO Green Crackers & Fresh 2026 Stock</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="text-amber-400">•</span>
              <span className="text-base leading-none">📞</span>
              <span className="text-white">Helpline & WhatsApp:</span>
              <span className="text-amber-200 font-extrabold">+91 80984 43633</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="text-amber-400">•</span>
              <span className="text-base leading-none">✨</span>
              <span className="text-white">Pan-India Fast Transport Delivery</span>
            </span>
          </div>
        </div>
      </div>

      <div
        className={`bg-white transition-all duration-200 ${
          isScrolled
            ? 'py-2.5 border-b border-gray-200 shadow-sm'
            : 'py-3.5 border-b border-gray-100 shadow-xs'
        }`}
      >
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          {/* Brand Logo & Title on Left */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden flex items-center justify-center bg-white">
              <img
                src={logoImg}
                alt="PON MURUGAN Fireworks Emblem"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = '/assets/pon_murugan_logo.jpg';
                }}
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="font-serif font-black text-xl sm:text-2xl tracking-wide text-[#7A1518] uppercase">
                PON MURUGAN
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.24em] text-[#C29B38] uppercase mt-0.5">
                PREMIUM FIREWORKS
              </span>
            </div>
          </Link>

          {/* Navigation Links in Center */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#7A1518] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C29B38]'
                      : 'text-gray-700 hover:text-[#7A1518]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons (Search Box, Cart Box with Badge, Beige WhatsApp Button) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Boxed Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search Fireworks"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 transition-colors"
            >
              <Search className="w-4 h-4 text-gray-700" strokeWidth={1.8} />
            </button>

            {/* Shopping Bag Boxed Button with Red Badge */}
            <Link
              to="/cart"
              aria-label="Shopping Cart"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 transition-colors relative"
            >
              <ShoppingBag className="w-4 h-4 text-gray-700" strokeWidth={1.8} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#8B1E1E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItemsCount > 0 ? totalItemsCount : '0'}
              </span>
            </Link>

            {/* Warm Beige WhatsApp Button */}
            <a
              href="https://wa.me/918098443633?text=Hi%20Pon%20Murugan%20Fireworks%2C%20I%20would%20like%20to%20order%20crackers"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-md bg-[#F6EFE5] border border-[#E8DEC7] hover:bg-[#EFE5D3] text-[#7A1518] font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4 text-[#C29B38] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.942.553 3.754 1.513 5.293L2 22l4.832-1.472a10.02 10.02 0 0 0 5.199 1.501h.005c5.533 0 10.029-4.494 10.029-10.029A10.03 10.03 0 0 0 12.031 2zm5.879 14.288c-.246.691-1.229 1.326-1.72 1.385-.458.056-1.045.081-3.32-.861-2.678-1.107-4.417-3.83-4.551-4.009-.133-.18-1.085-1.444-1.085-2.754 0-1.31.688-1.954.933-2.221.246-.267.537-.333.716-.333.18 0 .36 0 .518.01.168.01.393-.064.615.469.229.549.78 1.905.849 2.044.068.14.114.305.023.486-.091.18-.137.293-.272.451-.137.158-.288.353-.411.474-.137.135-.28.283-.121.556.16.273.71 1.171 1.523 1.895 1.047.933 1.93 1.223 2.203 1.358.273.136.434.114.595-.069.161-.183.688-.8.871-1.074.183-.273.366-.228.614-.137.248.091 1.57.74 1.838.875.268.136.447.203.513.317.066.114.066.66-.18 1.351z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex lg:hidden items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 shadow-lg"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-[#7A1518] bg-[#F6EFE5]'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#7A1518]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href="https://wa.me/918098443633?text=Hi%20Pon%20Murugan%20Fireworks%2C%20I%20would%20like%20to%20order%20crackers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-md bg-[#F6EFE5] border border-[#E8DEC7] text-[#7A1518] font-bold text-center flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 text-[#C29B38]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.942.553 3.754 1.513 5.293L2 22l4.832-1.472a10.02 10.02 0 0 0 5.199 1.501h.005c5.533 0 10.029-4.494 10.029-10.029A10.03 10.03 0 0 0 12.031 2zm5.879 14.288c-.246.691-1.229 1.326-1.72 1.385-.458.056-1.045.081-3.32-.861-2.678-1.107-4.417-3.83-4.551-4.009-.133-.18-1.085-1.444-1.085-2.754 0-1.31.688-1.954.933-2.221.246-.267.537-.333.716-.333.18 0 .36 0 .518.01.168.01.393-.064.615.469.229.549.78 1.905.849 2.044.068.14.114.305.023.486-.091.18-.137.293-.272.451-.137.158-.288.353-.411.474-.137.135-.28.283-.121.556.16.273.71 1.171 1.523 1.895 1.047.933 1.93 1.223 2.203 1.358.273.136.434.114.595-.069.161-.183.688-.8.871-1.074.183-.273.366-.228.614-.137.248.091 1.57.74 1.838.875.268.136.447.203.513.317.066.114.066.66-.18 1.351z"/>
                  </svg>
                  <span>Chat on WhatsApp: +91 80984 43633</span>
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