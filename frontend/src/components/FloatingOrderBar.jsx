import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FloatingOrderBar = () => {
  const {
    cartItems,
    clearCart,
    totalItemsCount,
    subtotal,
    totalMrp,
    totalSavings,
    minOrderAmount
  } = useCart();
  const location = useLocation();

  // Hide on cart and checkout pages
  const isCartOrCheckout = location.pathname === '/cart' || location.pathname === '/checkout';
  if (isCartOrCheckout) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out transform ${
        totalItemsCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t-2 border-[#7A1518] shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Cart items count & Total Amount Calculation */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              <div className="relative p-2.5 bg-[#FAF6F0] border border-[#EAE3D6] rounded-xl text-[#7A1518] shrink-0">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#7A1518] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {totalItemsCount}
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Total ({cartItems.length} {cartItems.length === 1 ? 'variety' : 'varieties'}):
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#7A1518] font-sans">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                  {totalSavings > 0 && (
                    <span className="hidden md:inline-flex text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Save ₹{totalSavings.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="text-[11px] mt-0.5">
                  {subtotal >= minOrderAmount ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <span>✓</span> Minimum order ₹{minOrderAmount.toLocaleString('en-IN')} qualified!
                    </span>
                  ) : (
                    <span className="text-amber-800 font-semibold">
                      Min order ₹{minOrderAmount.toLocaleString('en-IN')} (Add ₹{(minOrderAmount - subtotal).toLocaleString('en-IN')} more)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Clear Button */}
            <button
              onClick={clearCart}
              className="sm:hidden text-gray-400 hover:text-red-600 p-2 text-xs font-bold"
              title="Clear Cart"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={clearCart}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>

            <a
              href={`https://wa.me/918098443633?text=${encodeURIComponent(
                `Hello PON MURUGAN Fireworks, I selected ${totalItemsCount} items (${cartItems.length} varieties) worth ₹${subtotal.toLocaleString('en-IN')}. Please share wholesale confirmation and transport details!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold text-xs transition-colors"
            >
              <span>WhatsApp Estimate</span>
            </a>

            <Link
              to="/cart"
              className="flex-1 sm:flex-initial bg-[#7A1518] hover:bg-[#8F1A1E] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 whitespace-nowrap"
            >
              <span>View Cart & Order</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingOrderBar;
