import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import heroBannerImg from '../assets/images/hero_banner_full.jpg';
import heroBannerMobileImg from '../assets/images/hero_banner_mobile.jpg';

const Hero = () => {
  const quickCategories = [
    {
      title: 'Consumer Fireworks',
      subtitle: 'Safe exciting crackers for family & backyard celebrations.',
      link: '/products?category=sparklers',
      buttonText: 'Shop Now'
    },
    {
      title: 'Event Fireworks',
      subtitle: 'Custom aerial multi-shots for weddings & temple festivals.',
      link: '/products?category=aerial-shots',
      buttonText: 'Explore'
    },
    {
      title: 'Seasonal Specials',
      subtitle: 'Curated premium festival assortments direct from Sivakasi factory.',
      link: '/products?category=all',
      buttonText: 'View Specials'
    },
    {
      title: 'Fireworks Packages',
      subtitle: 'Curated Maharaja gift boxes for every family budget.',
      link: '/products?category=gift-boxes',
      buttonText: 'View Packages'
    }
  ];

  return (
    <section className="relative overflow-hidden pt-[120px] sm:pt-[132px] bg-[#F8F9FA]">
      {/* Screen Reader SEO Heading */}
      <h1 className="sr-only">
        PON MURUGAN – Celebrate Every Moment With Brilliance. Sivakasi Premium Fireworks & Crackers
      </h1>

      {/* 1. Mobile Portrait Banner (Visible on mobile screens < 640px, Aspect 3:4) */}
      <div className="relative w-full aspect-[3/4] select-none overflow-hidden bg-[#0A0B10] shadow-xl block sm:hidden">
        <img
          src={heroBannerMobileImg}
          alt="PON MURUGAN Fireworks Mobile Banner"
          className="w-full h-full object-cover object-center block"
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.target.src = '/assets/hero_banner_mobile.jpg';
          }}
        />

        {/* Interactive Clickable Hotspots for Mobile Buttons */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full">
            {/* "Explore Our Products" Button Hotspot (Mobile) */}
            <Link
              to="/products"
              title="Explore Our Products"
              aria-label="Explore Our Products"
              className="pointer-events-auto absolute left-[24.5%] top-[59.5%] w-[51%] h-[5.6%] rounded-full cursor-pointer hover:shadow-[0_0_20px_rgba(245,196,90,0.8)] active:scale-95 transition-all"
            >
              <span className="sr-only">Explore Our Products</span>
            </Link>

            {/* "Contact Us" Button Hotspot (Mobile) */}
            <Link
              to="/contact"
              title="Contact Us"
              aria-label="Contact Us"
              className="pointer-events-auto absolute left-[25.5%] top-[66.2%] w-[49%] h-[5.4%] rounded-full cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] active:scale-95 transition-all"
            >
              <span className="sr-only">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Desktop Widescreen Banner (Visible on screens >= 640px, Aspect 3:1) */}
      <div className="relative w-full aspect-[3/1] select-none overflow-hidden bg-[#0A0B10] shadow-xl hidden sm:block">
        <img
          src={heroBannerImg}
          alt="PON MURUGAN – Celebrate Every Moment With Brilliance"
          className="w-full h-full object-cover object-center block"
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.target.src = '/assets/hero_banner_full.jpg';
          }}
        />

        {/* Interactive Clickable Hotspots perfectly calibrated to painted button positions */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full">
            {/* "Explore Our Products" Button Hotspot (Desktop: 44.5% L, 61.5% T, 17.8% W, 14% H) */}
            <Link
              to="/products"
              title="Explore Our Products"
              aria-label="Explore Our Products"
              className="pointer-events-auto absolute left-[44.5%] top-[61.5%] w-[17.8%] h-[14%] rounded-full cursor-pointer hover:shadow-[0_0_30px_rgba(245,196,90,0.9)] hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <span className="sr-only">Explore Our Products</span>
            </Link>

            {/* "Contact Us" Button Hotspot (Desktop: 63.2% L, 61.5% T, 11.2% W, 14% H) */}
            <Link
              to="/contact"
              title="Contact Us"
              aria-label="Contact Us"
              className="pointer-events-auto absolute left-[63.2%] top-[61.5%] w-[11.2%] h-[14%] rounded-full cursor-pointer hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:brightness-125 active:scale-95 transition-all duration-200"
            >
              <span className="sr-only">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Category Quick-Cards (Clean White Theme with Horizontal Button Alignment) */}
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 mt-6 sm:mt-8 relative z-20">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {quickCategories.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 hover:border-[#D81C28]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group"
            >
              <div className="flex-1 flex flex-col">
                <h3 className="text-base font-extrabold text-gray-900 mb-1.5 font-sans group-hover:text-[#D81C28] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4 flex-grow">
                  {card.subtitle}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to={card.link}
                  className="w-full sm:w-fit px-4 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-[#FDE396] via-[#F5C45A] to-[#D49A26] text-black shadow-xs hover:shadow-md hover:scale-105 inline-flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>{card.buttonText}</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;