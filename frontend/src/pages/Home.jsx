import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';
import apiService from '../services/api';
import toast from 'react-hot-toast';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  Send,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  PhoneCall,
  Smartphone,
  Layers,
  ShoppingBag,
  Gem,
  Award
} from 'lucide-react';

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'Retail Celebration Order',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error('Please provide your name and contact phone number.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.submitEnquiry(formData);
      if (res.success) {
        toast.success(res.message || 'Thank you! Your enquiry has been sent to our Sivakasi office.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          enquiryType: 'Retail Celebration Order',
          message: ''
        });
      } else {
        toast.error('Failed to submit enquiry. Please call us directly at 8098443633.');
      }
    } catch {
      toast.error('Network error. Please call our sales desk at 8098443633.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900">
      {/* Hero Section (Full-Width Cinematic Banner) */}
      <Hero />

      {/* Top Rated Products Section (Clean White Theme) */}
      <section className="py-16 w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-sans tracking-tight">
              Top rated products
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Customer verified best-sellers and festival favourites direct from Sivakasi.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D81C28] hover:text-[#8B1018] transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Clean Light-Themed Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5-Item Value Proposition Features Bar (Clean White Background) */}
      <section className="py-8 bg-white border-y border-gray-200 shadow-xs">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4">
            {/* Feature 1 */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-50 text-[#D81C28] shrink-0 border border-red-100">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900">Premium UI</h4>
                <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                  Modern, bold, and immersive design language
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-50 text-[#D81C28] shrink-0 border border-red-100">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900">Responsive Design</h4>
                <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                  Seamless experience across desktop, tablet &amp; mobile
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-50 text-[#D81C28] shrink-0 border border-red-100">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900">Product Catalog</h4>
                <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                  Organized listings with filters, search &amp; smart discovery
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-50 text-[#D81C28] shrink-0 border border-red-100">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900">Service Pages</h4>
                <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                  Professional displays with trust and expertise at the core
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex items-start gap-3 col-span-2 sm:col-span-1">
              <div className="p-2.5 rounded-xl bg-red-50 text-[#D81C28] shrink-0 border border-red-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900">Checkout Ready</h4>
                <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                  Conversion-focused flow for a smooth shopping experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Introduction Section (White Theme) */}
      <section className="relative py-20 bg-[#F8F9FA] border-b border-gray-200">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Brand Showcase with Finalized Logo */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-72 sm:w-88 aspect-square rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl bg-black p-3">
                <img
                  src="/assets/pon_murugan_logo.png"
                  alt="Pon Murugan Fireworks Brand Identity"
                  className="w-full h-full object-contain rounded-2xl"
                  onError={(e) => {
                    e.target.src = '/assets/pon_murugan_logo.jpg';
                  }}
                />
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#D81C28] text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                <Flame className="w-3.5 h-3.5 text-[#D81C28]" />
                Direct From Sivakasi, Tamil Nadu
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5 font-sans">
                The Celebration Begins With <span className="text-[#D81C28]">Pon</span> <span className="text-[#D49A26]">Murugan</span>
              </h2>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                Born with deep reverence for Sivakasi’s illustrious fireworks legacy and inspired by the victorious radiance of Lord Murugan, <strong className="text-gray-900 font-extrabold">PON MURUGAN</strong> stands as an emblem of festive grandeur, unmatched purity of sparks, and safety assurance.
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
                Whether illuminating family courtyards during Diwali, lighting up temple festivities, or orchestrating mega 240-shot grand sky finales for royal weddings, we bridge direct Sivakasi factory manufacturing with nationwide retail and wholesale availability.
              </p>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">PESO Certified Green Formulations</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Reduced particulate emission &amp; eco-compliant chemistry.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#D49A26] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Genuine Factory Wholesale Rates</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Huge festive savings direct from manufacturer without middleman markups.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link to="/about" className="btn-red px-6 py-3 rounded-xl text-sm font-bold inline-flex items-center gap-2 shadow-md">
                  <span>Our Heritage &amp; Safety</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/wholesale" className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-800 text-sm font-bold border border-gray-300 shadow-xs transition-colors">
                  Wholesale Price List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner (Festive Crimson & Gold with Doodle Background Pattern) */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-[#7B0D14] via-[#8B1018] to-[#6A080F] text-white shadow-xl">
        {/* Seamless Doodle Background Pattern Layer */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-multiply bg-repeat pointer-events-none"
          style={{
            backgroundImage: "url('/assets/pattern_bg.jpg')",
            backgroundSize: "360px auto"
          }}
        />
        {/* Soft Radial Glow for Brilliance */}
        <div className="absolute inset-0 bg-radial from-amber-400/10 via-transparent to-black/20 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <span className="px-4 py-1.5 rounded-full bg-black/40 border border-amber-300/40 text-[#FFE082] text-xs font-bold tracking-widest uppercase mb-4 shadow-md backdrop-blur-xs">
            Diwali &amp; Wedding Celebration Special
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-md font-sans">
            Make Every Celebration <span className="text-[#FFE082]">Special</span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-amber-100/90 mb-8 leading-relaxed">
            Light up birthdays, temple anniversaries, weddings, and Diwali with our signature gift hampers and sky showstoppers. Direct from Sivakasi factory.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#FDE396] via-[#F5C45A] to-[#D49A26] text-black font-extrabold text-sm sm:text-base shadow-xl hover:scale-105 transition-transform inline-flex items-center justify-center min-w-[210px]">
              Explore Products
            </Link>
            <Link to="/wholesale" className="px-8 py-3.5 sm:py-4 rounded-full bg-black/50 hover:bg-black/70 text-white font-bold text-sm sm:text-base border border-white/30 backdrop-blur-xs transition-all inline-flex items-center justify-center min-w-[210px]">
              Wholesale Bulk Discount
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Fast Enquiry Form (Clean White Theme) */}
      <section className="py-20 bg-[#F8F9FA] border-t border-gray-200 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D81C28] px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 inline-block mb-3">
              Fast Response Desk
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 font-sans">
              Send Us An <span className="text-[#D81C28]">Enquiry</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Looking for special wedding cracker displays, wholesale dealer pricing, or custom family gift boxes? Fill out the details below.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-xl relative">
            <form onSubmit={handleEnquirySubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#D81C28] focus:ring-1 focus:ring-[#D81C28] text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Mobile Number (WhatsApp Preferred) *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#D81C28] focus:ring-1 focus:ring-[#D81C28] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#D81C28] focus:ring-1 focus:ring-[#D81C28] text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="enquiryType" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Enquiry Type
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:bg-white focus:border-[#D81C28] text-sm cursor-pointer"
                  >
                    <option value="Retail Celebration Order">Retail Celebration Order</option>
                    <option value="Wholesale & Dealership Enquiry">Wholesale &amp; Dealership Enquiry</option>
                    <option value="Wedding / Mega Event Sky Display">Wedding / Mega Event Sky Display</option>
                    <option value="Custom Family Gift Box Combo">Custom Family Gift Box Combo</option>
                    <option value="Delivery / Transport Status Inquiry">Delivery / Transport Status Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Message / Required Varieties
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your celebration date, desired products, or wholesale quantity estimates..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#D81C28] focus:ring-1 focus:ring-[#D81C28] text-sm resize-none"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Your information is kept private &amp; confidential.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-red text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#D81C28]/25 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Enquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
