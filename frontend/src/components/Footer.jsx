import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { categories } from '../data/categories';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-gray-200 text-gray-600 pt-16 pb-12 overflow-hidden">
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 flex flex-col">
            <Link to="/" className="flex items-center gap-3.5 mb-5 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D49A26] p-0.5 bg-black shadow-md">
                <img
                  src="/assets/pon_murugan_logo.png"
                  alt="PON MURUGAN Logo"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = '/assets/pon_murugan_logo.jpg';
                  }}
                />
              </div>
              <div>
                <span className="font-sans text-xl font-black text-gray-900">
                  <span className="text-[#D81C28]">PON</span> MURUGAN
                </span>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#B8860B] font-bold">
                  Premium Fireworks • Sivakasi
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-gray-600 mb-6 max-w-sm">
              Rooted in Sivakasi’s historic pyrotechnic heritage and blessed with Lord Murugan’s divine brilliance. We manufacture and supply high-calibre, PESO-compliant fireworks, glittering family fountains, and majestic sky spectacles with guaranteed festive safety.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/918098443633"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>
              <a
                href="tel:8098443633"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-[#D81C28] hover:bg-[#D81C28] hover:text-white transition-all text-xs font-bold"
              >
                <Phone className="w-4 h-4" />
                <span>8098443633</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-sans text-sm font-black uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D81C28]"></span>
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#D81C28] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D81C28] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#D81C28] transition-colors">All Fireworks</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#D81C28] transition-colors">Crackers Price List</Link>
              </li>
              <li>
                <Link to="/wholesale" className="hover:text-[#D81C28] transition-colors">Wholesale Enquiry</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D81C28] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col">
            <h4 className="font-sans text-sm font-black uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A26]"></span>
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="hover:text-[#D81C28] transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-gray-400 font-mono">({cat.count})</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/products?category=gift-boxes"
                  className="text-[#D81C28] font-bold hover:underline transition-colors"
                >
                  Gift Boxes & Combos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Sivakasi Office */}
          <div className="flex flex-col">
            <h4 className="font-sans text-sm font-black uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D81C28]"></span>
              Sivakasi Office
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D81C28] shrink-0 mt-1" />
                <span>PON MURUGAN Fireworks, Sivakasi Main Road, Virudhunagar District, Tamil Nadu - 626123</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D81C28] shrink-0" />
                <a href="tel:8098443633" className="hover:text-[#D81C28] font-semibold transition-colors">
                  +91 80984 43633
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D81C28] shrink-0" />
                <a href="mailto:sales@ponmuruganfireworks.com" className="hover:text-[#D81C28] transition-colors">
                  sales@ponmuruganfireworks.com
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2 text-xs text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>PESO Compliant &amp; Green Certified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Compliance Notice */}
        <div className="border border-gray-200 pt-5 pb-5 text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-2xl p-5 mb-8 shadow-xs">
          <p className="font-bold text-gray-900 mb-1">
            ⚖️ Legal Fireworks & Safety Compliance Notice:
          </p>
          <p>
            As per the Hon’ble Supreme Court directives and Petroleum and Explosives Safety Organization (PESO) regulations, we manufacture and supply compliant Green Crackers with low-emission QR codes. Fireworks delivery and transport are arranged strictly through licensed parcel services permitted by applicable state laws. Minimum dispatch order value applies for safety logistics.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            © {currentYear} <strong className="text-gray-900 font-sans">PON MURUGAN FIREWORKS</strong>. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-[#D81C28] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-[#D81C28] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/wholesale" className="hover:text-[#D81C28] transition-colors">
              B2B Trade Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

