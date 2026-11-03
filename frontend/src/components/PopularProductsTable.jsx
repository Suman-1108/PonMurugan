import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Eye,
  Search,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const PopularProductsTable = () => {
  const {
    cartItems,
    setItemQuantity,
    incrementItem,
    decrementItem,
    clearCart,
    totalItemsCount,
    subtotal,
    totalMrp,
    totalSavings,
    minOrderAmount
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('no'); // 'no', 'name', 'price', 'mrp'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Category filter tabs matching exact reference image
  const categoryTabs = [
    { name: 'All Categories', slug: 'all' },
    { name: 'Sparklers', slug: 'sparklers' },
    { name: 'Flower Pots', slug: 'flower-pots' },
    { name: 'Ground Chakkars', slug: 'ground-chakkars' },
    { name: 'Rockets', slug: 'rockets' },
    { name: 'Fancy Fireworks', slug: 'aerial-shots' },
    { name: 'Bijili Crackers', slug: 'sound-crackers' },
    { name: 'Gift Boxes', slug: 'gift-boxes' },
    { name: 'Celebration Combos', slug: 'fancy-novelty' },
  ];

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        (p.packSize && p.packSize.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'no') {
        comparison = (a.no || 0) - (b.no || 0);
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'price') {
        comparison = a.price - b.price;
      } else if (sortField === 'mrp') {
        comparison = a.mrp - b.mrp;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [selectedCategory, searchQuery, sortField, sortOrder]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getProductQuantity = (productId) => {
    const found = cartItems.find(item => item.id === productId);
    return found ? found.quantity : 0;
  };

  const handleDecrement = (product) => {
    decrementItem(product);
  };

  const handleIncrement = (product) => {
    incrementItem(product);
  };

  const handleInputChange = (product, val) => {
    if (val === '') {
      setItemQuantity(product, 0);
      return;
    }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      setItemQuantity(product, Math.min(parsed, 999));
    }
  };

  return (
    <section className="py-16 sm:py-20 w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 font-sans">
      {/* Top Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#C29B38] uppercase block mb-1.5">
            VERIFIED SIVAKASI INVENTORY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#7A1518] tracking-tight">
            Discover Our Popular Products
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-2xl leading-relaxed">
            Explore our wholesale and retail fireworks catalog in an organized table format with instant search, category filters, and live sorting.
          </p>
        </div>

        {/* Search Input & Item Counter Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search table by name or category..."
              className="pl-9 pr-4 py-2 text-xs rounded-lg border border-[#E5DAC6] bg-white focus:outline-none focus:border-[#7A1518] w-64 sm:w-72 shadow-2xs"
            />
          </div>

          <span className="bg-[#FAF6F0] border border-[#EAE3D6] text-gray-700 text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-2xs">
            Showing <strong className="text-[#7A1518]">{displayedProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-3 mb-6 select-none">
        {categoryTabs.map((tab) => {
          const isActive = selectedCategory === tab.slug;
          return (
            <button
              key={tab.slug}
              onClick={() => {
                setSelectedCategory(tab.slug);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
                isActive
                  ? 'bg-[#7A1518] text-white border-[#7A1518] shadow-xs'
                  : 'bg-white hover:bg-[#FAF6F0] text-gray-700 border-[#EAE3D6] hover:border-[#7A1518]/40'
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Table Container (IMAGE-FREE as requested: No Product Image Column) */}
      <div className="bg-white rounded-2xl border border-[#EAE3D6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            {/* Table Header Row */}
            <thead>
              <tr className="bg-[#FAF6F0] border-b border-[#EAE3D6] text-gray-800 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider select-none">
                <th
                  onClick={() => handleSort('no')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#7A1518] whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <span>S.NO</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>

                <th
                  onClick={() => handleSort('name')}
                  className="py-3.5 px-5 cursor-pointer hover:text-[#7A1518] whitespace-nowrap min-w-[240px]"
                >
                  <div className="flex items-center gap-1">
                    <span>PRODUCT NAME</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>

                <th className="py-3.5 px-4 whitespace-nowrap">
                  CATEGORY
                </th>

                <th className="py-3.5 px-4 whitespace-nowrap">
                  PACK SIZE
                </th>

                <th
                  onClick={() => handleSort('mrp')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#7A1518] whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <span>MRP</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>

                <th
                  onClick={() => handleSort('price')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#7A1518] whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <span>SELLING PRICE</span>
                    <ArrowUpDown className="w-3 h-3 text-[#7A1518]" />
                  </div>
                </th>

                <th className="py-3.5 px-4 text-center whitespace-nowrap min-w-[140px]">
                  QUANTITY
                </th>

                <th className="py-3.5 px-5 text-right whitespace-nowrap min-w-[120px]">
                  TOTAL (₹)
                </th>
              </tr>
            </thead>

            {/* Table Body Rows */}
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    <Sparkles className="w-8 h-8 text-[#C29B38] mx-auto mb-2 opacity-50" />
                    <p className="font-bold text-gray-800">No products found matching your search</p>
                    <p className="text-xs text-gray-500 mt-1">Try searching for a different keyword or category</p>
                  </td>
                </tr>
              ) : (
                displayedProducts.map((product, idx) => {
                  const discountPercent = product.mrp > product.price
                    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
                    : 0;
                  const currentQty = getProductQuantity(product.id);
                  const itemTotal = currentQty * product.price;

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-[#FAF8F5] transition-colors group ${
                        currentQty > 0 ? 'bg-[#FFFDF9]' : ''
                      }`}
                    >
                      {/* S.No */}
                      <td className="py-4 px-4 font-bold text-gray-700 font-mono">
                        {startIndex + idx + 1}
                      </td>

                      {/* Product Name with IN STOCK & Festive Choice */}
                      <td className="py-4 px-5">
                        <Link
                          to={`/products/${product.id}`}
                          className="font-serif font-bold text-gray-900 group-hover:text-[#7A1518] text-sm sm:text-base leading-snug transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>{product.name}</span>
                          <Eye className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#7A1518] shrink-0 transition-colors" title="View details" />
                        </Link>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            IN STOCK
                          </span>
                          <span className="text-[#C29B38] text-[11px] font-semibold flex items-center gap-1">
                            <span>★</span>
                            <span>Festive Choice</span>
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-[#B8860B] font-bold text-xs uppercase tracking-wider">
                          {product.categoryName?.toUpperCase() || 'FIREWORKS'}
                        </span>
                      </td>

                      {/* Pack Size */}
                      <td className="py-4 px-4 whitespace-nowrap text-gray-600 font-medium font-mono text-xs">
                        {product.packSize || '1 Unit'}
                      </td>

                      {/* MRP */}
                      <td className="py-4 px-4 whitespace-nowrap text-gray-400 line-through font-mono text-xs">
                        ₹{product.mrp}
                      </td>

                      {/* Selling Price */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-extrabold text-gray-950 font-sans text-sm sm:text-base">
                            ₹{product.price}
                          </span>
                          {discountPercent > 0 && (
                            <span className="text-[11px] font-bold text-[#D81C28]">
                              ({discountPercent}% OFF)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* QUANTITY Stepper with Minus, Centered Input, Plus matching reference image */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center border border-[#CFD8DC] rounded-lg bg-white overflow-hidden shadow-2xs hover:border-[#7A1518]/50 focus-within:border-[#7A1518] focus-within:ring-1 focus-within:ring-[#7A1518]/20 transition-all">
                          <button
                            type="button"
                            onClick={() => handleDecrement(product)}
                            disabled={currentQty <= 0}
                            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-[#7A1518] hover:bg-gray-100 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors select-none font-bold text-base"
                            aria-label={`Decrease quantity of ${product.name}`}
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                          <input
                            type="number"
                            min="0"
                            max="999"
                            value={currentQty === 0 ? '' : currentQty}
                            placeholder="0"
                            onChange={(e) => handleInputChange(product, e.target.value)}
                            className="w-12 h-8 text-center font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-sans [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-x border-[#EAE3D6] bg-transparent"
                            aria-label={`Quantity of ${product.name}`}
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement(product)}
                            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-[#7A1518] hover:bg-gray-100 transition-colors select-none font-bold text-base"
                            aria-label={`Increase quantity of ${product.name}`}
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      </td>

                      {/* TOTAL (₹) matching reference screenshot */}
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <span
                          className={`font-black font-sans text-sm sm:text-base ${
                            currentQty > 0 ? 'text-[#9A3412]' : 'text-gray-300'
                          }`}
                        >
                          ₹{itemTotal.toLocaleString('en-IN')}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Summary & Pagination Controls */}
        <div className="bg-[#FAF6F0] border-t border-[#EAE3D6] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 select-none">
          <p>
            Showing <strong className="text-gray-900">{totalItems > 0 ? startIndex + 1 : 0}</strong> to{' '}
            <strong className="text-gray-900">{Math.min(startIndex + itemsPerPage, totalItems)}</strong> of{' '}
            <strong className="text-gray-900">{totalItems}</strong> products
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded border border-[#E5DAC6] bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
              .map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-7 h-7 rounded text-xs font-bold transition-colors ${
                    currentPage === num
                      ? 'bg-[#7A1518] text-white shadow-2xs'
                      : 'border border-[#E5DAC6] bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {num}
                </button>
              ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded border border-[#E5DAC6] bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProductsTable;
