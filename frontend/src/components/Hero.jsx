import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, Sparkles } from 'lucide-react';
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
      subtitle: 'Limited-time 50% discount offers on top festival assortments.',
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

        {/* Interactive Clickable Hotspots for Mobile Vertical Stacked Buttons */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full">
            {/* "Explore Our Products" Button Hotspot (Mobile) */}
            <Link
              to="/products"
              title="Explore Our Products"
              aria-label="Explore Our Products"
              className="pointer-events-auto absolute left-[22%] top-[58.5%] w-[56%] h-[6.2%] rounded-full cursor-pointer active:scale-95 transition-all"
            >
              <span className="sr-only">Explore Our Products</span>
            </Link>

            {/* "Contact Us" Button Hotspot (Mobile) */}
            <Link
              to="/contact"
              title="Contact Us"
              aria-label="Contact Us"
              className="pointer-events-auto absolute left-[22%] top-[65.5%] w-[56%] h-[6.2%] rounded-full cursor-pointer active:scale-95 transition-all"
            >
              <span className="sr-only">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Desktop Widescreen Banner (Visible on screens >= 640px, Aspect 3:1) */}
      <div className="relative w-full aspect-[3/1] select-none overflow-hidden bg-[#0A0B10] shadow-xl hidden sm:block">
        {/* Pristine High-Resolution Banner Artwork with Complete Built-in Typography & Logo */}
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

        {/* Interactive Clickable Hotspots mapped directly over the banner buttons */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full">
            {/* "Explore Our Products" Button Hotspot */}
            <Link
              to="/products"
              title="Explore Our Products"
              aria-label="Explore Our Products"
              className="pointer-events-auto absolute left-[45%] top-[59%] w-[16%] h-[9%] rounded-full cursor-pointer hover:shadow-[0_0_30px_rgba(245,196,90,0.9)] hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <span className="sr-only">Explore Our Products</span>
            </Link>

            {/* "Contact Us" Button Hotspot */}
            <Link
              to="/contact"
              title="Contact Us"
              aria-label="Contact Us"
              className="pointer-events-auto absolute left-[62.5%] top-[59%] w-[11%] h-[9%] rounded-full cursor-pointer hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:brightness-125 active:scale-95 transition-all duration-200"
            >
              <span className="sr-only">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Floating Category Quick-Cards (Clean White Theme on Widescreen Container) */}
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 mt-6 sm:-mt-10 relative z-20">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {quickCategories.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#D81C28]/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-extrabold text-gray-900 mb-1.5 font-sans">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {card.subtitle}
                </p>
              </div>

              <Link
                to={card.link}
                className="w-fit px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#FDE396] via-[#F5C45A] to-[#D49A26] text-black shadow-sm hover:scale-105 inline-flex items-center gap-1 transition-transform"
              >
                <span>{card.buttonText}</span>
                <ChevronRight className="w-3 h-3 stroke-[3]" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Hero;
