import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Search, Check, ChevronLeft, ChevronRight, ArrowUpDown, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const PopularProductsTable = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('no'); // 'no', 'name', 'price', 'mrp'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [addedItemIds, setAddedItemIds] = useState({});
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

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));
    toast.success(`Added ${product.name} to cart!`, { icon: '🛒' });
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
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

                <th className="py-3.5 px-5 text-right whitespace-nowrap">
                  ACTION
                </th>
              </tr>
            </thead>

            {/* Table Body Rows */}
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
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
                  const isAdded = addedItemIds[product.id];

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-[#FAF8F5] transition-colors group"
                    >
                      {/* S.No */}
                      <td className="py-4 px-4 font-bold text-gray-700 font-mono">
                        {startIndex + idx + 1}
                      </td>

                      {/* Product Name with IN STOCK & Festive Choice */}
                      <td className="py-4 px-5">
                        <Link
                          to={`/products/${product.id}`}
                          className="font-serif font-bold text-gray-900 group-hover:text-[#7A1518] text-sm sm:text-base leading-snug transition-colors block"
                        >
                          {product.name}
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

                      {/* Action Buttons: ADD & Details */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
                              isAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#7A1518] hover:bg-[#8B1E1E] text-white'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>ADDED</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>ADD</span>
                              </>
                            )}
                          </button>

                          <Link
                            to={`/products/${product.id}`}
                            className="px-2.5 py-1.5 rounded-md border border-[#E5DAC6] hover:border-[#7A1518] text-gray-700 hover:text-[#7A1518] text-xs font-semibold flex items-center gap-1 transition-colors bg-white"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </Link>
                        </div>
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
