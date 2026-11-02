import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success(`Saved ${product.name} to wishlist!`, { icon: '❤️' });
    } else {
      toast('Removed from wishlist', { icon: '🤍' });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, quantity);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-white text-gray-900 overflow-hidden shadow-md hover:shadow-xl border border-gray-200 hover:border-[#D81C28]/40 transition-all duration-300 p-5 font-sans"
    >
      {/* Top Header: Serial No & Category */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gray-900 text-white text-xs font-black flex items-center justify-center font-mono">
              #{product.no || product.id?.slice(0, 3)}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D81C28] bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full">
              {product.categoryName}
            </span>
          </div>

          <button
            onClick={toggleWishlist}
            aria-label="Add to wishlist"
            className="w-7 h-7 rounded-full bg-gray-50 hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-[#D81C28] transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#D81C28] text-[#D81C28]' : ''}`} />
          </button>
        </div>

        {/* Cracker Name (Prominent, High-Contrast Typography) */}
        <Link to={`/products/${product.id}`} className="block group-hover:text-[#D81C28] transition-colors">
          <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug line-clamp-2 min-h-[2.75rem]">
            {product.name}
          </h3>
        </Link>

        {/* Packing / Unit Information */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs text-gray-600">
          <span className="font-medium text-gray-500">Packing:</span>
          <span className="font-extrabold text-gray-900 font-mono">
            {product.packSize || '1 Unit'}
          </span>
        </div>
      </div>

      {/* Pricing & Quantity Controls */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[11px] text-gray-400 block font-semibold">Factory Rate</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-950 font-sans">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>
          </div>

          {discountPercent > 0 && (
            <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quantity Stepper & Add to Cart Button */}
        <div className="flex items-center gap-2">
          {/* Quantity Controls */}
          <div className="flex items-center rounded-xl bg-gray-100 border border-gray-200 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-xs text-gray-900 font-mono">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all ${
              addedAnim 
                ? 'bg-emerald-600 text-white' 
                : 'btn-red text-white'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add • ₹{product.price * quantity}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
