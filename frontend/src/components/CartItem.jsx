import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE3D6] hover:border-[#7A1518]/30 shadow-xs hover:shadow-md transition-all">
      {/* Product Info (Completely image-free as requested) */}
      <div className="flex items-center gap-3.5 w-full sm:w-auto">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF6F0] border border-[#EAE3D6] text-[#7A1518] font-mono font-bold flex items-center justify-center shrink-0 text-xs shadow-2xs">
          #{item.no || '•'}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#C29B38] uppercase tracking-wider">
            {item.categoryName}
          </span>
          <span className="font-serif text-sm sm:text-base font-bold text-gray-900">
            {item.name}
          </span>
          <span className="text-xs text-gray-500 font-mono mt-0.5">
            Pack: {item.packSize}
          </span>
          <div className="flex items-center gap-2 mt-1 sm:hidden">
            <span className="text-sm font-bold text-[#7A1518]">₹{item.price}</span>
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

      {/* Quantity Stepper Selector & Row Total */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        <div className="inline-flex items-center border border-[#CFD8DC] rounded-lg bg-white overflow-hidden shadow-2xs hover:border-[#7A1518]/50 focus-within:border-[#7A1518]">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label={`Decrease quantity of ${item.name}`}
            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-[#7A1518] hover:bg-gray-100 transition-colors select-none font-bold text-sm"
          >
            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
          <span className="w-10 h-8 flex items-center justify-center text-center font-bold text-sm text-gray-900 font-sans border-x border-[#EAE3D6] bg-transparent">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label={`Increase quantity of ${item.name}`}
            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-[#7A1518] hover:bg-gray-100 transition-colors select-none font-bold text-sm"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Item Total */}
        <div className="flex flex-col items-end min-w-[80px]">
          <span className="text-[10px] text-gray-400 uppercase sm:hidden">Total</span>
          <span className="font-sans text-base font-black text-[#9A3412]">
            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.name}`}
          className="p-2 text-gray-400 hover:text-[#7A1518] hover:bg-red-50 rounded-lg transition-colors"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
