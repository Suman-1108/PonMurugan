import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import PopularProductsTable from '../components/PopularProductsTable';
import { getFeaturedProducts } from '../data/products';
import apiService from '../services/api';
import toast from 'react-hot-toast';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
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
  Award,
  Smile,
  Store,
  Headphones,
  Download
} from 'lucide-react';

import sparklersImg from '../assets/categories/sparkelers.png';
import flowerPotImg from '../assets/categories/Flower_Pot.png';
import chakkarsImg from '../assets/categories/Ground_Chakkars.png';
import rocketsImg from '../assets/categories/rocket_crackers.png';
import fancyImg from '../assets/categories/Fancy.png';
import bijiliImg from '../assets/categories/bijili.png';
import giftBoxImg from '../assets/categories/gift_box.png';
import comboPackImg from '../assets/categories/ComboPack.png';

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  // Curated collections catalog using authentic Sivakasi category artwork
  const curatedCollections = [
    {
      title: 'Sparklers',
      slug: 'sparklers',
      variety: '14 Varieties',
      badge: 'TRADITIONAL LIGHTS',
      description: 'Handheld shimmering gold, silver, and multicolor sparklers for peaceful family celebrations.',
      image: sparklersImg
    },
    {
      title: 'Flower Pots',
      slug: 'flower-pots',
      variety: '18 Varieties',
      badge: 'FOUNTAIN OF SPARKS',
      description: 'Majestic fountain showers rising up to 25 feet with sparkling golden and emerald stars.',
      image: flowerPotImg
    },
    {
      title: 'Ground Chakkars',
      slug: 'ground-chakkars',
      variety: '10 Varieties',
      badge: 'SPINNING WHEELS',
      description: 'Mesmerizing swirling discs emitting vivid circular rings of golden and multi-colored fire.',
      image: chakkarsImg
    },
    {
      title: 'Rockets',
      slug: 'rockets',
      variety: '12 Varieties',
      badge: 'CELESTIAL ASCENTS',
      description: 'High-altitude whistling rockets bursting into expansive starry weeping willow and brocade crowns.',
      image: rocketsImg
    },
    {
      title: 'Fancy Fireworks',
      slug: 'aerial-shots',
      variety: '24 Varieties',
      badge: 'AERIAL MULTI-SHOTS',
      description: 'Multi-stage choreographed repeaters delivering synchronized sky bursts of royal purple, gold, and red.',
      image: fancyImg
    },
    {
      title: 'Bijili Crackers',
      slug: 'sound-crackers',
      variety: '8 Varieties',
      badge: 'FESTIVE SOUNDS',
      description: 'Crisp rhythmic sound crackers crafted to awaken festive cheer and auspicious celebration spirits.',
      image: bijiliImg
    },
    {
      title: 'Gift Boxes',
      slug: 'gift-boxes',
      variety: '8 Curations',
      badge: 'HERITAGE ASSORTMENTS',
      description: 'Handcrafted luxury hamper assortments packaged in regal gold-embossed celebration boxes.',
      image: giftBoxImg
    },
    {
      title: 'Celebration Combos',
      slug: 'all',
      variety: '5 Combos',
      badge: 'COMPLETE FAMILY PACKS',
      description: 'Curated all-in-one celebration bundles with sparklers, pots, chakkars, and fancy sky shots.',
      image: comboPackImg
    }
  ];

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    companyCity: '',
    enquiryType: 'Wholesale & Dealership Enquiry',
    budget: '₹10K - ₹25K',
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
      const res = await apiService.submitEnquiry({
        ...formData,
        notes: `Budget: ${formData.budget} | City/Company: ${formData.companyCity || 'N/A'}`
      });
      if (res.success) {
        toast.success(res.message || 'Thank you! Your enquiry has been sent to our Sivakasi office.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          companyCity: '',
          enquiryType: 'Wholesale & Dealership Enquiry',
          budget: '₹10K - ₹25K',
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

      {/* Curated Catalog - Explore Our Collections Section */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-[#EBE4D8]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.28em] text-[#C29B38] uppercase block mb-1.5">
              CURATED CATALOG
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#7A1518] tracking-tight">
              Explore Our Collections
            </h2>
            <div className="w-12 h-0.5 bg-[#C29B38] mx-auto my-3"></div>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Discover time-tested traditional crackers and cutting-edge aerial pyrotechnics suited for weddings, Diwali, and festive milestones.
            </p>
          </div>

          {/* 8-Card Collections Grid (4 columns desktop, 2 columns mobile/tablet) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {curatedCollections.map((item) => (
              <Link
                key={item.title}
                to={`/products?category=${item.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-[#EBE4D8] hover:border-[#7A1518]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Banner Area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-900 select-none">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

                  {/* Top Right Variety Pill */}
                  <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-gray-800 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs">
                    {item.variety}
                  </span>

                  {/* Bottom Left Category Tag */}
                  <span className="absolute bottom-2.5 left-2.5 text-white/95 text-[9px] font-black tracking-wider uppercase bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/20">
                    {item.badge}
                  </span>
                </div>

                {/* Card Info Area */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-extrabold text-[#7A1518] group-hover:text-[#A81D24] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1.5 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-extrabold tracking-wider text-[#C29B38] group-hover:text-[#7A1518] transition-colors uppercase">
                    <span>EXPLORE COLLECTION</span>
                    <span className="text-base font-bold transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Our Popular Products - Table Format (Image-Free List View as requested) */}
      <PopularProductsTable />

      {/* Why Choose Pon Murugan & Make Every Celebration Memorable Sections */}
      <section className="pt-0 pb-12 sm:pb-16 bg-[#FAF8F5] border-b border-[#EBE4D8]">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.28em] text-[#C29B38] uppercase block mb-1.5">
              OUR UNCOMPROMISING STANDARD
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#7A1518] tracking-tight">
              Why Choose Pon Murugan
            </h2>
            <div className="w-12 h-0.5 bg-[#C29B38] mx-auto my-3"></div>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Quality Commitment */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE3D6] shadow-xs flex flex-col justify-start hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#FAF3E7] border border-[#EBE0CC] flex items-center justify-center text-[#B68B35] mb-5 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#7A1518] mb-2">
                Quality Commitment
              </h3>
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                100% genuine Sivakasi fireworks adhering to government safety specifications and highest pyrotechnic purity.
              </p>
            </div>

            {/* Card 2: Customer Satisfaction */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE3D6] shadow-xs flex flex-col justify-start hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#FAF3E7] border border-[#EBE0CC] flex items-center justify-center text-[#B68B35] mb-5 shrink-0">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#7A1518] mb-2">
                Customer Satisfaction
              </h3>
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                Trusted by over 50,000 households and event planners for reliable ignition, brilliant color, and festive joy.
              </p>
            </div>

            {/* Card 3: Retail & Wholesale */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE3D6] shadow-xs flex flex-col justify-start hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#FAF3E7] border border-[#EBE0CC] flex items-center justify-center text-[#B68B35] mb-5 shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#7A1518] mb-2">
                Retail &amp; Wholesale
              </h3>
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                Direct factory wholesale pricing for bulk festival bookings alongside premium family retail packs.
              </p>
            </div>

            {/* Card 4: Customer Support */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE3D6] shadow-xs flex flex-col justify-start hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#FAF3E7] border border-[#EBE0CC] flex items-center justify-center text-[#B68B35] mb-5 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#7A1518] mb-2">
                Customer Support
              </h3>
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                Dedicated WhatsApp support, order tracking, and expert safety guidance for every celebration.
              </p>
            </div>
          </div>

          {/* Make Every Celebration Memorable Banner Card */}
          <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl border border-[#EAE3D6] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF3E7] border border-[#E8DEC9] text-[#9A7228] text-[11px] font-bold uppercase tracking-wider mb-5 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                DIWALI &amp; FESTIVAL SEASON 2026
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-black text-[#7A1518] leading-[1.18] mb-4">
                Make Every Celebration<br className="hidden sm:inline" /> Memorable
              </h3>

              <div className="w-12 h-0.5 bg-[#C29B38] mb-6"></div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-8 max-w-md">
                From intimate home Diwali gatherings to grand temple festivals and wedding receptions, Pon Murugan fireworks transform your milestones into dazzling celestial memories.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/products"
                  className="px-6 sm:px-7 py-3 rounded-lg bg-[#7A1518] hover:bg-[#8F1A1E] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/wholesale"
                  className="px-6 sm:px-7 py-3 rounded-lg bg-white hover:bg-[#FAF6F0] text-[#7A1518] border border-[#C29B38] font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-2xs hover:border-[#7A1518] transition-all"
                >
                  <span>Download Price List</span>
                  <Download className="w-4 h-4 text-[#C29B38]" />
                </Link>
              </div>
            </div>

            {/* Right Column: Festive Celebration Photo with smooth left gradient blend */}
            <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1517457041081-f7b73500a210?auto=format&fit=crop&w=1200&q=80"
                alt="Festive celebration gathering under ambient lights"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Desktop fade from white into photo */}
              <div className="absolute inset-y-0 left-0 w-28 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none hidden lg:block" />
              {/* Mobile fade from white top */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none lg:hidden" />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Modern Enquiry Section (Inspired by Reference Design) */}
      <section id="enquiry-section" className="pt-28 sm:pt-32 pb-20 lg:pb-28 bg-white border-t border-gray-100 relative overflow-hidden scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Bold Headline, Subtitle, and Line-Art Illustration */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.08] font-sans">
                  Let’s Make<br />
                  Moments Celestial.
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-5 leading-relaxed max-w-md">
                  Tell us about your celebration date, bulk festival requirements, or wedding cracker displays — we’ll turn your vision into an awe-inspiring pyrotechnic celebration.
                </p>
              </div>

              {/* Whimsical Modern Line-Art Illustration */}
              <div className="mt-10 sm:mt-14 max-w-xs sm:max-w-sm">
                <svg
                  viewBox="0 0 340 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto select-none"
                  aria-hidden="true"
                >
                  {/* Laptop Base and Screen */}
                  <path d="M75 235 L175 235 L160 165 L90 165 Z" stroke="#18181B" strokeWidth="2" strokeLinejoin="round" fill="#FFFFFF" />
                  <path d="M55 235 L195 235" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Body & Arms Reaching to Sky */}
                  <path d="M68 215 C45 195 18 150 25 115 C30 95 48 100 60 120 C75 145 82 190 86 215" stroke="#18181B" strokeWidth="2" fill="#FFFFFF" />
                  <path d="M60 120 C68 85 98 42 120 28 C134 18 144 35 135 62 C122 102 110 148 102 215" stroke="#18181B" strokeWidth="2" fill="#FFFFFF" strokeLinejoin="round" />

                  {/* Head Profile */}
                  <circle cx="56" cy="95" r="14" fill="#18181B" />
                  <path d="M55 89 C51 93 51 101 56 106 C62 106 65 102 64 96 Z" fill="#18181B" />
                  <path d="M65 98 L72 98" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
                  <path d="M50 105 C54 113 63 114 67 109" stroke="#18181B" strokeWidth="2" fill="#18181B" />

                  {/* Soaring Flight / Celebration Rocket Plane */}
                  <g transform="translate(108, 6) rotate(6)">
                    <path d="M5 42 L88 14 L32 70 Z" stroke="#18181B" strokeWidth="2" fill="#FFFFFF" strokeLinejoin="round" />
                    <path d="M32 70 L42 39 L88 14" stroke="#18181B" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M42 39 L60 54" stroke="#18181B" strokeWidth="1.5" />
                    {/* Festive Sparkles and Flight Arc */}
                    <path d="M0 60 C-18 80 -34 102 -50 128" stroke="#A1A1AA" strokeWidth="1.5" strokeDasharray="3 3" />
                  </g>
                  {/* Subtle Celebration Sparks */}
                  <path d="M230 40 L234 40 M232 38 L232 42" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="260" cy="70" r="1.5" fill="#EAB308" />
                  <path d="M245 95 L251 95 M248 92 L248 98" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Right Column: Clean Editorial Enquiry Form Card */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[36px] bg-[#F7F7F8] border border-gray-100 shadow-[0_4px_28px_rgba(0,0,0,0.03)] relative">
                <form onSubmit={handleEnquirySubmit} className="space-y-7">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-serif italic text-gray-700 mb-1">
                      Full name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Sumanth Kumar"
                      className="w-full bg-transparent border-b border-gray-300 focus:border-gray-900 py-2.5 text-gray-900 text-sm outline-none transition-colors placeholder:text-gray-400 placeholder:italic placeholder:font-serif"
                    />
                  </div>

                  {/* Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label htmlFor="email" className="block text-sm font-serif italic text-gray-700 mb-1">
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full bg-transparent border-b border-gray-300 focus:border-gray-900 py-2.5 text-gray-900 text-sm outline-none transition-colors placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-serif italic text-gray-700 mb-1">
                        Phone number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-transparent border-b border-gray-300 focus:border-gray-900 py-2.5 text-gray-900 text-sm outline-none transition-colors placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Company/City & Inquiry Reason */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label htmlFor="companyCity" className="block text-sm font-serif italic text-gray-700 mb-1">
                        Company or City name
                      </label>
                      <input
                        type="text"
                        id="companyCity"
                        name="companyCity"
                        value={formData.companyCity}
                        onChange={handleInputChange}
                        placeholder="e.g. Chennai, Bangalore, Madurai"
                        className="w-full bg-transparent border-b border-gray-300 focus:border-gray-900 py-2.5 text-gray-900 text-sm outline-none transition-colors placeholder:text-gray-400"
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="enquiryType" className="block text-sm font-serif italic text-gray-700 mb-1 flex items-center justify-between">
                        <span>Inquiry Reason*</span>
                        <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none" />
                      </label>
                      <select
                        id="enquiryType"
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-gray-300 focus:border-gray-900 py-2.5 text-gray-900 text-sm outline-none transition-colors cursor-pointer appearance-none pr-6"
                      >
                        <option value="Wholesale & Dealership Enquiry">Wholesale &amp; Dealership Enquiry</option>
                        <option value="Diwali Festival Bulk Order">Diwali Festival Bulk Order</option>
                        <option value="Wedding / Mega Event Sky Display">Wedding / Mega Event Sky Display</option>
                        <option value="Custom Family Gift Box Hamper">Custom Family Gift Box Hamper</option>
                        <option value="Retail Celebration Order">Retail Celebration Order</option>
                        <option value="Delivery / Transport Status Inquiry">Delivery / Transport Status Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Budget (Clickable Pill Options) */}
                  <div>
                    <label className="block text-sm font-serif italic text-gray-700 mb-3">
                      Project budget*
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        'Less than ₹10K',
                        '₹10K - ₹25K',
                        '₹25K - ₹50K',
                        '₹50K - ₹1 Lakh',
                        'More than ₹1 Lakh'
                      ].map((budgetOption) => {
                        const isSelected = formData.budget === budgetOption;
                        return (
                          <button
                            key={budgetOption}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, budget: budgetOption }))}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                            }`}
                          >
                            {budgetOption}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-serif italic text-gray-700 mb-1">
                      Project details*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your celebration date, desired crackers, or wholesale requirements..."
                      className="w-full bg-transparent border-b border-gray-300 focus:border-gray-900 py-2.5 text-gray-900 text-sm outline-none transition-colors resize-none placeholder:text-gray-400 placeholder:text-xs"
                    ></textarea>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded-lg bg-[#00D284] hover:bg-[#00B974] text-gray-950 font-bold text-sm tracking-wide inline-flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Connecting...' : 'Lets Connect'}</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    <p className="text-xs text-gray-400 font-serif italic">
                      * Fast response within 2 hours during season
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Contact Reference Links (As in Uploaded Reference) */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            <div>
              <span className="block text-xs text-gray-400 mb-1.5 font-serif italic">
                Start a project / Bulk orders
              </span>
              <a
                href="mailto:wholesale@ponmuruganfireworks.com"
                className="text-sm sm:text-base font-bold text-gray-900 hover:text-[#7A1518] transition-colors"
              >
                wholesale@ponmuruganfireworks.com
              </a>
            </div>

            <div>
              <span className="block text-xs text-gray-400 mb-1.5 font-serif italic">
                Direct WhatsApp Desk
              </span>
              <a
                href="https://wa.me/918098443633"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-bold text-gray-900 hover:text-emerald-600 transition-colors"
              >
                +91 80984 43633
              </a>
            </div>

            <div>
              <span className="block text-xs text-gray-400 mb-1.5 font-serif italic">
                Factory &amp; Dispatch Sivakasi
              </span>
              <a
                href="mailto:sales@ponmuruganfireworks.com"
                className="text-sm sm:text-base font-bold text-gray-900 hover:text-[#7A1518] transition-colors"
              >
                sales@ponmuruganfireworks.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
