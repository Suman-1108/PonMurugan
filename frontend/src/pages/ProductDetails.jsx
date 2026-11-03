import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import {
  ShoppingBag,
  Star,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Volume2,
  Package,
  ArrowLeft,
  Share2,
  AlertTriangle,
  Flame,
  Minus,
  Plus,
  Eye,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, setItemQuantity, incrementItem, decrementItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  const getProductQuantity = (productId) => {
    const found = cartItems.find(item => item.id === productId);
    return found ? found.quantity : 0;
  };

  const handleInputChange = (item, val) => {
    if (val === '') {
      setItemQuantity(item, 0);
      return;
    }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      setItemQuantity(item, Math.min(parsed, 999));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-44 sm:pt-48 pb-20 text-center px-4">
        <h2 className="font-sans text-3xl font-black text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-sm text-gray-600 mb-8">The requested fireworks product could not be located in our catalogue.</p>
        <Link to="/products" className="btn-red px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Crackers Price List</span>
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, product.category, 4);
  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - PON MURUGAN Fireworks`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-40 sm:pt-48 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-xs font-bold text-gray-700 shadow-xs hover:shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#D81C28]" />
            <span>Back to 102 Crackers Price List</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Item #{product.no}</span>
            <span>•</span>
            <span className="text-[#D81C28] font-semibold">{product.categoryName}</span>
          </div>
        </div>

        {/* Focused Item Showcase Card (Completely Image-Free) */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-lg mb-12">
          {/* Top Row: Serial Badge, Badges, Share */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-gray-950 text-white font-mono font-black text-lg flex items-center justify-center shadow-md">
                #{product.no}
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D81C28] bg-red-50 border border-red-100 px-3 py-1 rounded-full inline-block">
                  {product.categoryName}
                </span>
                <span className="ml-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  ✓ Sivakasi In Stock
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {discountPercent > 0 && (
                <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-[#D81C28] text-white shadow-xs">
                  {discountPercent}% OFF MRP
                </span>
              )}
              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                title="Share item"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Item Name & Packing Header */}
          <div className="py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight mb-4">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-100 border border-gray-200 font-mono text-gray-800">
                <Package className="w-4 h-4 text-[#D81C28]" />
                <span className="font-medium text-gray-500">Packing:</span>
                <strong className="font-extrabold text-gray-950">{product.packSize}</strong>
              </div>

              {product.soundLevel && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700">
                  <Volume2 className="w-4 h-4 text-[#D49A26]" />
                  <span>{product.soundLevel}</span>
                </div>
              )}

              {product.duration && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700">
                  <Clock className="w-4 h-4 text-[#D49A26]" />
                  <span>{product.duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Price Calculation Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-red-50 via-amber-50/40 to-white border border-red-100 mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-gray-500 block mb-1">
                  Direct Sivakasi Factory Rate
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-[#D81C28] font-sans">
                    ₹{product.price}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-lg text-gray-400 line-through font-semibold">
                      MRP ₹{product.mrp}
                    </span>
                  )}
                </div>
              </div>

              {discountPercent > 0 && (
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 inline-block">
                    Factory Savings: ₹{product.mrp - product.price} per unit ({discountPercent}%)
                  </span>
                  <p className="text-[11px] text-gray-500 mt-1">
                    *Genuine factory prices without retailer markups
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quantity Controls & Add to Cart Action */}
          <div className="pt-2 pb-6 border-b border-gray-100 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center justify-between sm:justify-start rounded-xl bg-gray-100 border border-gray-300 p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-gray-700 hover:text-black hover:bg-white active:scale-95 transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-14 text-center font-black text-lg text-gray-900 font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-gray-700 hover:text-black hover:bg-white active:scale-95 transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-4 px-6 rounded-xl btn-red text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-red-600/25 active:scale-98 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantity} to Cart • ₹{product.price * quantity}</span>
              </button>
            </div>

            {/* Direct WhatsApp Quick Booking */}
            <a
              href={`https://wa.me/918098443633?text=${encodeURIComponent(`Hi Pon Murugan Fireworks, I want to book Item #${product.no} - ${product.name} (Qty: ${quantity}, Rate: Rs.${product.price}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Instant WhatsApp Booking for Item #{product.no}</span>
            </a>
          </div>

          {/* Specifications Table */}
          <div className="pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
              Item Specifications &amp; Statutory Compliance:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Official Item No:</span>
                <span className="font-mono font-bold text-gray-900">#{product.no}</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Packing Unit:</span>
                <span className="font-mono font-bold text-gray-900">{product.packSize}</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">PESO Green Compliance:</span>
                <span className="font-bold text-emerald-700">100% Certified</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex justify-between">
                <span className="text-gray-500">Manufacturing Origin:</span>
                <span className="font-bold text-gray-900">Sivakasi, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Advisory Notice */}
        <div className="mb-14 p-6 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">
              Statutory Safety &amp; Handling Note
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Discharge outdoors under adult supervision. Maintain safe distance from audience and flammable objects. Always have a bucket of water or sand on standby.
            </p>
          </div>
        </div>

        {/* Related Crackers (Image-Free Table Format) */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#7A1518]">
                Related Varieties in <span className="text-[#C29B38]">{product.categoryName}</span>
              </h2>
              <Link
                to={`/products?category=${product.category}`}
                className="text-xs font-bold text-[#7A1518] hover:text-[#C29B38] transition-colors"
              >
                View All {product.categoryName} →
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#EAE3D6] shadow-sm overflow-hidden mb-12">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF6F0] border-b border-[#EAE3D6] text-gray-800 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider select-none">
                      <th className="py-3.5 px-4 whitespace-nowrap">S.NO</th>
                      <th className="py-3.5 px-5 whitespace-nowrap min-w-[220px]">PRODUCT NAME</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">PACK SIZE</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">MRP</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">SELLING PRICE</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap min-w-[140px]">QUANTITY</th>
                      <th className="py-3.5 px-5 text-right whitespace-nowrap min-w-[110px]">TOTAL (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                    {relatedProducts.map((rel) => {
                      const relDiscount = rel.mrp > rel.price
                        ? Math.round(((rel.mrp - rel.price) / rel.mrp) * 100)
                        : 0;
                      const relQty = getProductQuantity(rel.id);
                      const relTotal = relQty * rel.price;

                      return (
                        <tr
                          key={rel.id}
                          className={`hover:bg-[#FAF8F5] transition-colors group ${
                            relQty > 0 ? 'bg-[#FFFDF9]' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 font-bold text-gray-700 font-mono">
                            {rel.no}
                          </td>
                          <td className="py-3.5 px-5">
                            <Link
                              to={`/products/${rel.id}`}
                              className="font-serif font-bold text-gray-900 group-hover:text-[#7A1518] text-sm sm:text-base leading-snug transition-colors inline-flex items-center gap-1.5"
                            >
                              <span>{rel.name}</span>
                              <Eye className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#7A1518] shrink-0 transition-colors" />
                            </Link>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                                IN STOCK
                              </span>
                              <span className="text-[#C29B38] text-[10px] font-semibold">
                                ★ Festive Choice
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-gray-600 font-medium font-mono text-xs">
                            {rel.packSize || '1 Unit'}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-gray-400 line-through font-mono text-xs">
                            ₹{rel.mrp}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-extrabold text-gray-950 font-sans text-sm">
                                ₹{rel.price}
                              </span>
                              {relDiscount > 0 && (
                                <span className="text-[10px] font-bold text-[#D81C28]">
                                  ({relDiscount}% OFF)
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <div className="inline-flex items-center border border-[#CFD8DC] rounded-lg bg-white overflow-hidden shadow-2xs hover:border-[#7A1518]/50 focus-within:border-[#7A1518]">
                              <button
                                type="button"
                                onClick={() => decrementItem(rel)}
                                disabled={relQty <= 0}
                                className="w-7 h-7 flex items-center justify-center text-gray-700 hover:text-[#7A1518] hover:bg-gray-100 disabled:opacity-25 transition-colors font-bold text-sm"
                                aria-label={`Decrease quantity of ${rel.name}`}
                              >
                                <Minus className="w-3 h-3 stroke-[2.5]" />
                              </button>
                              <input
                                type="number"
                                min="0"
                                max="999"
                                value={relQty === 0 ? '' : relQty}
                                placeholder="0"
                                onChange={(e) => handleInputChange(rel, e.target.value)}
                                className="w-10 h-7 text-center font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none text-xs font-sans [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-x border-[#EAE3D6] bg-transparent"
                                aria-label={`Quantity of ${rel.name}`}
                              />
                              <button
                                type="button"
                                onClick={() => incrementItem(rel)}
                                className="w-7 h-7 flex items-center justify-center text-gray-700 hover:text-[#7A1518] hover:bg-gray-100 transition-colors font-bold text-sm"
                                aria-label={`Increase quantity of ${rel.name}`}
                              >
                                <Plus className="w-3 h-3 stroke-[2.5]" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-right whitespace-nowrap">
                            <span
                              className={`font-black font-sans text-sm ${
                                relQty > 0 ? 'text-[#9A3412]' : 'text-gray-300'
                              }`}
                            >
                              ₹{relTotal.toLocaleString('en-IN')}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
