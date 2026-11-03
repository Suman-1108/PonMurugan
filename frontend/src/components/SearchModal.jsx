import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = query.trim() === ''
    ? []
    : products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        (p.tag && p.tag.toLowerCase().includes(query.toLowerCase())) ||
        p.soundLevel.toLowerCase().includes(query.toLowerCase())
      );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-[#151515] border border-[#F5C45A]/30 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-4 border-b border-white/10 gap-3">
            <Search className="w-5 h-5 text-[#F5C45A]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sparklers, flower pots, 240 shots, rockets, gift boxes..."
              className="w-full bg-transparent text-white placeholder-neutral-400 text-base sm:text-lg focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <span className="text-xs font-bold border border-white/20 px-2 py-0.5 rounded">ESC</span>
            </button>
          </div>

          {/* Quick Suggestions / Popular Tags */}
          {query.trim() === '' && (
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#B8B8B8] mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Ashoka Giant', '240 Shot Finale', 'Electric Sparklers', 'Maharaja Gift Box', 'Peacock Fountain', 'Rangeela'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#F5C45A]/15 text-neutral-300 hover:text-[#F5C45A] text-xs font-medium border border-white/10 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results List */}
          {query.trim() !== '' && (
            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-[#B8B8B8]">
                  <p className="text-base font-semibold text-white">No fireworks found for "{query}"</p>
                  <p className="text-xs mt-1">Try searching for "Sparklers", "Fountain", or "Rockets"</p>
                </div>
              ) : (
                filtered.map(product => (
                  <Link
                    key={product.id}
                    to={`/products?category=${product.category}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-[#F5C45A]/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 text-[#F5C45A] font-mono font-bold flex items-center justify-center text-xs shrink-0 border border-white/15">
                        #{product.no || '•'}
                      </div>
                      <div>
                        <h4 className="font-sans text-sm font-bold text-white group-hover:text-[#F5C45A] transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-xs text-[#B8B8B8]">
                          {product.categoryName} • {product.packSize}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#F5C45A] text-sm">
                        ₹{product.price}
                      </span>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#F5C45A] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;

