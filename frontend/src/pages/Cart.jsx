import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import {
  ShoppingBag,
  ArrowRight,
  Trash2,
  ShieldCheck,
  Truck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

const Cart = () => {
  const {
    cartItems,
    clearCart,
    subtotal,
    totalMrp,
    totalSavings,
    deliveryFee,
    minOrderAmount,
    isEligibleForOrder,
    totalItemsCount
  } = useCart();
  const navigate = useNavigate();

  const finalTotal = subtotal + deliveryFee;
  const progressToFreeDelivery = Math.min(100, Math.round((subtotal / 3000) * 100));

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-44 sm:pt-48 pb-20 px-4">
        <div className="max-w-xl mx-auto text-center bg-white p-10 sm:p-14 rounded-3xl border border-gray-200 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-red-50 text-[#D81C28] mx-auto flex items-center justify-center mb-6 border border-red-100">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            Your celebration cart is currently empty. Explore our Sivakasi fireworks collection to add sparklers, volcanic flower pots, and spectacular sky shots!
          </p>
          <Link
            to="/products"
            className="btn-red px-8 py-4 rounded-xl text-sm font-bold inline-flex items-center gap-2 shadow-xl shadow-[#D81C28]/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore Fireworks Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-40 sm:pt-48 pb-20">
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200 mb-8 gap-4">
          <div>
            <h1 className="font-sans text-3xl sm:text-4xl font-black text-gray-900">
              Shopping <span className="text-[#D81C28]">Cart</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {totalItemsCount} item{totalItemsCount > 1 ? 's' : ''} in your festival celebration list
            </p>
          </div>

          <button
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#D81C28] px-3 py-1.5 rounded-lg border border-gray-300 hover:border-red-500/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>

        {/* Free Delivery Goal Bar */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs mb-8">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-2 text-gray-700">
              <Truck className="w-4 h-4 text-[#D81C28]" />
              {subtotal >= 3000 ? (
                <span className="text-emerald-600 font-bold">🎉 You have unlocked Free Transport Hub Delivery!</span>
              ) : (
                <span>Add <strong>₹{3000 - subtotal}</strong> more for Free Licensed Transport Delivery</span>
              )}
            </span>
            <span className="font-bold text-[#D81C28]">{progressToFreeDelivery}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#D81C28] to-[#8B1018] transition-all duration-500"
              style={{ width: `${progressToFreeDelivery}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <div className="pt-4 flex justify-between items-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#D81C28] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xl sticky top-28">
              <h3 className="font-sans text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm text-gray-600 pb-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <span>Total MRP:</span>
                  <span className="text-gray-400 line-through font-mono">₹{totalMrp}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Factory Direct Savings:</span>
                  <span className="font-mono">- ₹{totalSavings}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="text-gray-900 font-bold font-mono">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span>Licensed Transport:</span>
                  </span>
                  <span className="font-mono text-gray-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="py-4 flex justify-between items-baseline">
                <span className="font-sans text-lg font-bold text-gray-900">Estimated Total:</span>
                <span className="font-sans text-3xl font-black text-[#D81C28]">
                  ₹{finalTotal}
                </span>
              </div>

              {/* Minimum Order Verification Alert */}
              {!isEligibleForOrder ? (
                <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Minimum order requirement for safe legal fireworks logistics booking is <strong>₹{minOrderAmount}</strong>. Please add ₹{minOrderAmount - subtotal} more to proceed.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Eligible for licensed Sivakasi parcel dispatch.</span>
                </div>
              )}

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                disabled={!isEligibleForOrder}
                className="w-full py-4 rounded-xl btn-red text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#D81C28]/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-5 space-y-2 text-[11px] text-gray-500 text-center">
                <p className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% PESO Green Crackers Compliant</span>
                </p>
                <p>No upfront digital transaction forced without dispatch confirmation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

