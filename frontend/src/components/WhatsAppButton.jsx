import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { totalItemsCount } = useCart();
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '918098443633';
  
  const defaultMessage = encodeURIComponent(
    'Hello PON MURUGAN Fireworks! I would like to inquire about your premium fireworks collection and wholesale pricing.'
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className={`fixed ${totalItemsCount > 0 ? 'bottom-24 sm:bottom-22' : 'bottom-6'} right-4 sm:right-6 z-40 flex flex-col items-end transition-all duration-300`}>
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="mb-3 p-3.5 rounded-2xl bg-[#151515] border border-[#F5C45A]/30 shadow-2xl text-xs max-w-xs text-white backdrop-blur-md relative animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-neutral-400 hover:text-white"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="font-bold text-[#F5C45A] mb-1">Direct Sivakasi WhatsApp Desk</p>
          <p className="text-[#B8B8B8] leading-relaxed">
            Chat directly with our team for wholesale catalogues, festive bookings, and transport support!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-block w-full text-center py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-semibold text-white transition-colors"
          >
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat on WhatsApp with Pon Murugan Fireworks"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-108 active:scale-95"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;

