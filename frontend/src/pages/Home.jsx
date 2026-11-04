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
  Download,
  Facebook,
  Linkedin,
  Twitter,
  Instagram
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
    emailOrPhone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter your name.');
      return;
    }

    if (!formData.emailOrPhone.trim()) {
      toast.error('Please provide your email address or phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const isEmail = formData.emailOrPhone.includes('@');
      const res = await apiService.submitEnquiry({
        name: formData.name,
        email: isEmail ? formData.emailOrPhone : '',
        phone: !isEmail ? formData.emailOrPhone : '',
        contactInfo: formData.emailOrPhone,
        message: formData.message || 'Direct enquiry from homepage get-in-touch form',
        enquiryType: 'Get in Touch Desk'
      });

      if (res.success) {
        toast.success(res.message || 'Thank you! Your message has been sent successfully.');
        setFormData({
          name: '',
          emailOrPhone: '',
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
    <div className="bg-[#FAF8F5] min-h-screen text-gray-900">
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

      {/* Customer Modern Enquiry Section (Royal Crimson & Warm Gold Brand Palette) */}
      <section id="enquiry-section" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF8F5] via-[#F4ECE0] to-[#FAF6ED] border-t border-[#EAE3D6] relative overflow-hidden scroll-mt-24">
        {/* Subtle Ambient Golden Radial Glow */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, rgba(122, 21, 24, 0.06) 45%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Floating White Card with Royal Gold Accents */}
          <div className="bg-white rounded-2xl sm:rounded-[28px] p-8 sm:p-12 lg:p-14 shadow-[0_20px_55px_rgba(122,21,24,0.07)] border border-[#EAE3D6] relative">
            {/* Centered Serif Headline */}
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.28em] text-[#C29B38] uppercase block mb-1.5">
                FAST FACTORY RESPONSE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-black text-[#7A1518] tracking-tight leading-tight">
                Get in touch, let us know<br className="hidden sm:inline" />
                {' '}how we can help
              </h2>
              <div className="w-12 h-0.5 bg-[#C29B38] mx-auto mt-3.5"></div>
            </div>

            {/* 2-Column Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
              {/* Left Column: Contact Information & Social Icons */}
              <div className="md:col-span-5 flex flex-col justify-between h-full space-y-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs sm:text-[13px] text-[#C29B38] font-bold tracking-wider uppercase mb-1">
                      Email:
                    </p>
                    <a
                      href="mailto:ponmuruganfireworks@gmail.com"
                      className="text-base sm:text-lg font-bold text-[#7A1518] hover:text-[#9B1B1F] transition-colors"
                    >
                      ponmuruganfireworks@gmail.com
                    </a>
                  </div>

                  <div>
                    <p className="text-xs sm:text-[13px] text-[#C29B38] font-bold tracking-wider uppercase mb-1">
                      Phone / WhatsApp:
                    </p>
                    <a
                      href="tel:+918098443633"
                      className="text-base sm:text-lg font-bold text-[#7A1518] hover:text-[#9B1B1F] transition-colors"
                    >
                      +91 80984 43633
                    </a>
                  </div>

                  <div>
                    <p className="text-xs sm:text-[13px] text-[#C29B38] font-bold tracking-wider uppercase mb-1">
                      Factory Address:
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-800 leading-snug">
                      Pon Murugan Fireworks, Factory Road,<br />
                      Sivakasi, Tamil Nadu 626123,<br />
                      India
                    </p>
                  </div>
                </div>

                {/* Royal Crimson & Gold Circular Social Icons */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#7A1518] hover:bg-[#8F1A1E] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm border border-amber-300/30"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 fill-current stroke-none" />
                  </a>
                  <a
                    href="https://wa.me/918098443633"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#7A1518] hover:bg-[#8F1A1E] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm border border-amber-300/30"
                    aria-label="LinkedIn / WhatsApp"
                  >
                    <Linkedin className="w-4 h-4 fill-current stroke-none" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#7A1518] hover:bg-[#8F1A1E] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm border border-amber-300/30"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4 fill-current stroke-none" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#7A1518] hover:bg-[#8F1A1E] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm border border-amber-300/30"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Clean Form Inputs */}
              <div className="md:col-span-7">
                <form onSubmit={handleEnquirySubmit} className="space-y-5">
                  {/* Two Column Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-[#7A1518] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full bg-[#FAF7F2] hover:bg-[#F5EFE4] focus:bg-white focus:ring-2 focus:ring-[#7A1518] rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all border border-[#EAE3D6]"
                      />
                    </div>

                    <div>
                      <label htmlFor="emailOrPhone" className="block text-xs sm:text-sm font-bold text-[#7A1518] mb-2">
                        Email address / Mobile *
                      </label>
                      <input
                        type="text"
                        id="emailOrPhone"
                        name="emailOrPhone"
                        required
                        value={formData.emailOrPhone}
                        onChange={handleInputChange}
                        placeholder="Your email or mobile"
                        className="w-full bg-[#FAF7F2] hover:bg-[#F5EFE4] focus:bg-white focus:ring-2 focus:ring-[#7A1518] rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all border border-[#EAE3D6]"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-bold text-[#7A1518] mb-2">
                      Message / Celebration Requirements
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your celebration date, bulk enquiry, or cracker varieties..."
                      className="w-full bg-[#FAF7F2] hover:bg-[#F5EFE4] focus:bg-white focus:ring-2 focus:ring-[#7A1518] rounded-xl p-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all resize-none min-h-[140px] border border-[#EAE3D6]"
                    />
                  </div>

                  {/* Full-Width Send Message Button (Royal Crimson & Gold) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7A1518] via-[#8F1A1E] to-[#7A1518] hover:from-[#8F1A1E] hover:to-[#A81D24] text-white font-bold text-sm tracking-widest uppercase shadow-md shadow-[#7A1518]/25 border border-amber-400/35 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
