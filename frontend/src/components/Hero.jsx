import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, Sparkles } from 'lucide-react';

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
    <section className="relative overflow-hidden pt-32 sm:pt-36 bg-[#F8F9FA]">
      {/* Screen Reader SEO Heading */}
      <h1 className="sr-only">
        PON MURUGAN – Celebrate Every Moment With Brilliance. Sivakasi Premium Fireworks & Crackers
      </h1>

      {/* Main Full-Size Cinematic Banner (Edge-to-Edge 100% Full Width) */}
      <div className="relative w-full aspect-[2/1] select-none overflow-hidden bg-black shadow-xl">
        {/* Pristine High-Resolution Banner Artwork with Complete Built-in Typography & Logo */}
        <img
          src="/assets/hero_banner_full.jpg"
          alt="PON MURUGAN – Celebrate Every Moment With Brilliance"
          className="w-full h-full object-cover object-center block"
          loading="eager"
          decoding="async"
        />

        {/* Interactive Clickable Hotspots mapped directly over the banner buttons */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full">
            {/* "Explore Our Products" Button Hotspot */}
            <Link
              to="/products"
              title="Explore Our Products"
              aria-label="Explore Our Products"
              className="pointer-events-auto absolute left-[53.5%] top-[55.5%] w-[20%] h-[7%] rounded-full cursor-pointer hover:shadow-[0_0_30px_rgba(245,196,90,0.9)] hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <span className="sr-only">Explore Our Products</span>
            </Link>

            {/* "Contact Us" Button Hotspot */}
            <Link
              to="/contact"
              title="Contact Us"
              aria-label="Contact Us"
              className="pointer-events-auto absolute left-[75.2%] top-[55.5%] w-[14%] h-[7%] rounded-full cursor-pointer hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:brightness-125 active:scale-95 transition-all duration-200"
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
