import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Sparkles, Award, Users, CheckCircle, ArrowRight, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-40 sm:pt-48 pb-20">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#8B1018] text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D49A26]" />
          Our Heritage &amp; Divine Identity
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-sans text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
        >
          About <span className="red-gradient-text">Pon Murugan</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed"
        >
          Rooted in the fireworks capital of India, Sivakasi, Pon Murugan was founded with a singular conviction: that fireworks celebrations must embody divine radiance, sublime joy, and uncompromising safety.
        </motion.p>
      </div>

      {/* Main Brand & Logo Identity Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 sm:w-80 aspect-square rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-black p-2">
              <img
                src="/assets/pon_murugan_logo.jpg"
                alt="Lord Murugan Vel and Fireworks Emblem"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D49A26] block mb-2">
              The Symbol of Divine Brilliance
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Lord Murugan’s Golden Vel &amp; The Burst of Festive Joy
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
              In Tamil spiritual tradition, <strong className="text-gray-900">Lord Murugan</strong> represents light conquering darkness, wisdom dispelling ignorance, and boundless auspicious energy. The sacred <strong className="text-[#D49A26]">Golden Vel (spear)</strong> at the core of our brand identity signifies focused power, precision, and the triumph of truth.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              Just as the Vel is radiant gold, our fireworks burst with vivid colours, pure sparks, and high-purity barium-free green formulations designed to bring families together in harmonious jubilation.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="px-3.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700">
                ✨ Pure Golden Flame Formulations
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700">
                🌿 Green Certified Raw Materials
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700">
                🏭 Direct Sivakasi Factory Quality
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Sivakasi Legacy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:border-[#D81C28]/40 transition-all">
            <Flame className="w-10 h-10 text-[#8B1018] mb-5" />
            <h3 className="font-sans text-xl font-bold text-gray-900 mb-3">Sivakasi Pyrotechnic Mastercraft</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Sivakasi produces over 90% of India's fireworks. Pon Murugan preserves authentic generational craftsmanship while utilizing automated chemical mixing plants for zero-variation precision.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:border-[#D81C28]/40 transition-all">
            <ShieldCheck className="w-10 h-10 text-[#D49A26] mb-5" />
            <h3 className="font-sans text-xl font-bold text-gray-900 mb-3">Green Cracker Innovation</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Partnering with scientific safety standards, our formulations achieve up to 30% lower particulate emissions, zero toxic heavy metals, and clean burning fuses for safer ambient air.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:border-[#D81C28]/40 transition-all">
            <Award className="w-10 h-10 text-amber-600 mb-5" />
            <h3 className="font-sans text-xl font-bold text-gray-900 mb-3">Direct-to-Customer Value</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              By removing up to three layers of middlemen and brokers, Pon Murugan offers genuine factory-gate rates directly to families, retail buyers, and regional wholesale distributors.
            </p>
          </div>
        </div>
      </div>

      {/* Values & Principles */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h2 className="font-sans text-3xl sm:text-4xl font-black text-gray-900 mb-4">
          Our Core <span className="red-gradient-text">Values</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-12 max-w-xl mx-auto">
          Built upon trust, transparency, and family happiness.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-md flex gap-4">
            <CheckCircle className="w-6 h-6 text-[#D49A26] shrink-0 mt-1" />
            <div>
              <h4 className="font-sans text-base font-bold text-gray-900 mb-1">Zero-Dud Guarantee</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Nothing frustrates a celebration more than a dud cracker. Our moisture-proof packaging and strict fuse standards ensure seamless ignition every time.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-md flex gap-4">
            <CheckCircle className="w-6 h-6 text-[#D49A26] shrink-0 mt-1" />
            <div>
              <h4 className="font-sans text-base font-bold text-gray-900 mb-1">PESO Legal Compliance</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                All production batches adhere strictly to Indian Explosives Rules and Supreme Court directives. We do not sell illegal banned chemical variants.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-md flex gap-4">
            <CheckCircle className="w-6 h-6 text-[#D49A26] shrink-0 mt-1" />
            <div>
              <h4 className="font-sans text-base font-bold text-gray-900 mb-1">Family &amp; Child Safety First</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Handheld sparklers are engineered with protective shields and non-conductive wire grips, ensuring hours of worry-free laughter for the little ones.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-md flex gap-4">
            <CheckCircle className="w-6 h-6 text-[#D49A26] shrink-0 mt-1" />
            <div>
              <h4 className="font-sans text-base font-bold text-gray-900 mb-1">Safe Explosives Logistics</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Dispatches are booked through licensed explosive parcel carriers with shock-resistant wooden crates and insulated cushioning for secure transit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#8B1018] via-[#A81520] to-[#700B12] text-white shadow-2xl">
          <h3 className="font-sans text-2xl sm:text-3xl font-black text-white mb-4">
            Ready To Light Up Your Next Grand Celebration?
          </h3>
          <p className="text-sm text-red-100 mb-6 max-w-lg mx-auto">
            Discover our entire Sivakasi catalogue or request a wholesale dealership quote today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/products" className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold shadow-xl">
              Explore Our Products
            </Link>
            <Link to="/contact" className="px-8 py-3.5 rounded-xl text-sm font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-colors">
              Contact Sivakasi Office
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
