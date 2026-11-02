import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl overflow-hidden glass-card h-72 sm:h-80 flex flex-col justify-end p-6 border border-white/10 hover:border-[#F5C45A]/50 transition-all duration-300"
    >
      {/* Background Category Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Dark & Brand Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-[#090A0D]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-radial-at-t from-transparent to-[#090A0D]/80"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#F5C45A] px-2.5 py-0.5 rounded-full bg-black/60 border border-[#F5C45A]/30">
            {category.count} Varieties
          </span>
          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#F5C45A] group-hover:text-black flex items-center justify-center text-white transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <h3 className="font-sans text-xl sm:text-2xl font-bold text-white group-hover:text-[#F5C45A] transition-colors mb-2">
          {category.name}
        </h3>

        <p className="text-xs text-[#B8B8B8] line-clamp-2 mb-4 leading-relaxed">
          {category.description}
        </p>

        <Link
          to={`/products?category=${category.slug}`}
          className="inline-flex items-center text-xs font-bold text-amber-200 group-hover:text-[#F5C45A] transition-colors"
        >
          <span>Explore Category</span>
          <span className="ml-1 text-base">→</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryCard;

