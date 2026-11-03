import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#D81C28]/40 shadow-xs hover:shadow-md transition-all">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#D81C28] uppercase tracking-wider">
            {item.categoryName}
          </span>
          <span className="font-sans text-sm sm:text-base font-bold text-gray-900">
            {item.name}
          </span>
          <span className="text-xs text-gray-500 mt-0.5">
            Pack: {item.packSize}
          </span>
          <div className="flex items-center gap-2 mt-1 sm:hidden">
            <span className="text-sm font-bold text-[#D81C28]">₹{item.price}</span>
            <span className="text-xs text-gray-400 line-through">MRP ₹{item.mrp}</span>
          </div>
        </div>
      </div>

      {/* Unit Price (Desktop) */}
      <div className="hidden sm:flex flex-col items-end">
        <span className="text-xs text-gray-500">Unit Price</span>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-gray-900 text-sm">₹{item.price}</span>
          <span className="text-xs text-gray-400 line-through">₹{item.mrp}</span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        <div className="flex items-center rounded-xl bg-gray-100 border border-gray-200 p-1">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:text-black hover:bg-white transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-bold text-sm text-gray-900">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:text-black hover:bg-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="flex flex-col items-end min-w-[70px]">
          <span className="text-xs text-gray-500 sm:hidden">Subtotal</span>
          <span className="font-sans text-base font-bold text-[#D81C28]">
            ₹{item.price * item.quantity}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.name}`}
          className="p-2 text-gray-400 hover:text-[#D81C28] hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

