import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-xl overflow-hidden bg-white border border-[#EBE4D8] hover:border-[#7A1518]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Background Category Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-900 select-none">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Variety Count Badge */}
        <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-gray-800 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs">
          {category.count || '12+'} Varieties
        </span>
      </div>

      {/* Foreground Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-extrabold text-[#7A1518] group-hover:text-[#A81D24] transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2 mt-1.5 leading-relaxed">
            {category.description}
          </p>
        </div>

        <Link
          to={`/products?category=${category.slug}`}
          className="pt-3 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-extrabold tracking-wider text-[#C29B38] group-hover:text-[#7A1518] transition-colors uppercase"
        >
          <span>EXPLORE COLLECTION</span>
          <span className="text-base font-bold transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
