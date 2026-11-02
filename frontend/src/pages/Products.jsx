import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  SlidersHorizontal,
  X,
  Layers,
  ShoppingBag
} from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'name-asc', 'name-desc', 'rating'
  const [visibleCount, setVisibleCount] = useState(12);

  // Synchronize state when URL category query param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    setSearchParams(slug === 'all' ? {} : { category: slug });
    setVisibleCount(12);
  };

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        (p.tag && p.tag.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedProducts.length;

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-28 pb-20">
      {/* Header Banner */}
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D81C28] px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 inline-block mb-3">
            Sivakasi Factory Direct Catalogue
          </span>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-gray-900 mb-3">
            Premium Fireworks <span className="text-[#D81C28]">Collection</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Explore our complete certified fireworks range. Formulated for brilliant festive illumination, rich vivid colours, and maximum celebration delight.
          </p>
        </div>
      </div>

      {/* Control Toolbar: Search, Category Tabs & Sort */}
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 mb-10">
        <div className="p-4 sm:p-6 rounded-2xl bg-white border border-gray-200 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12);
                }}
                placeholder="Search by name, pack size, or effect (e.g. sparklers, 240 shot, giant)..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28] focus:ring-1 focus:ring-[#D81C28]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700">
                <ArrowUpDown className="w-4 h-4 text-[#D81C28] shrink-0" />
                <span className="font-semibold text-gray-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-gray-900 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured &amp; Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#D81C28] text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.slug !== 'all' && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Summary & Results Counter */}
        <div className="flex items-center justify-between text-xs text-gray-600 mt-4 px-2">
          <p>
            Showing <strong className="text-gray-900">{displayedProducts.length}</strong> of{' '}
            <strong className="text-gray-900">{filteredAndSortedProducts.length}</strong> fireworks varieties
          </p>
          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSearchParams({});
              }}
              className="text-[#D81C28] hover:underline flex items-center gap-1 font-semibold"
            >
              <X className="w-3.5 h-3.5" />
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200 max-w-xl mx-auto p-8 shadow-md">
            <Sparkles className="w-12 h-12 text-[#D49A26] mx-auto mb-4 animate-bounce" />
            <h3 className="font-sans text-xl font-bold text-gray-900 mb-2">No Fireworks Matched</h3>
            <p className="text-sm text-gray-600 mb-6">
              We couldn't find any varieties matching "{searchQuery}". Try selecting "All Fireworks" or searching for a different term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSearchParams({});
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#D81C28] text-white shadow-md hover:bg-[#8B1018]"
            >
              Clear Search &amp; Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="px-8 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-[#D81C28] font-bold text-sm transition-all duration-300 shadow-md"
            >
              Load More Fireworks (+8)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

