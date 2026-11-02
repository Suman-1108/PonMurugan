import React, { useState } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';
import toast from 'react-hot-toast';
import {
  Building2,
  PhoneCall,
  Send,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Flame,
  Percent
} from 'lucide-react';

const Wholesale = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    categories: ['Gift Boxes & Combos', 'Aerial Sky Shots'],
    estimatedBudget: '₹50,000 - ₹1,00,000',
    location: '',
    state: 'Tamil Nadu',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);

  const availableCategories = [
    'Sparklers (All sizes)',
    'Flower Pots & Fountains',
    'Ground Chakkars',
    'Aerial Sky Shots & Multi-Cakes',
    'Sky Rockets',
    'Gift Boxes & Combos',
    'Fancy Novelties & Spinners',
    'Loose Sound Crackers'
  ];

  const handleCategoryToggle = (cat) => {
    setFormData(prev => {
      const exists = prev.categories.includes(cat);
      if (exists) {
        return { ...prev, categories: prev.categories.filter(c => c !== cat) };
      } else {
        return { ...prev, categories: [...prev.categories, cat] };
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.businessName.trim() || !formData.contactPerson.trim() || !formData.phone.trim() || !formData.location.trim()) {
      toast.error('Please fill in all required business and contact details.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.submitWholesaleEnquiry(formData);
      if (res.success) {
        setSubmittedRef(res.quoteRef || `PM-B2B-${Date.now().toString().slice(-6)}`);
        toast.success(res.message || 'Wholesale quotation request received!');
      } else {
        toast.error('Unable to send enquiry. Please contact us via WhatsApp at 8098443633.');
      }
    } catch {
      toast.error('Network connection issue. Please connect via direct WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Pon Murugan Fireworks Sivakasi!\n\nI want to inquire about B2B Wholesale Dealership.\n\nBusiness: ${formData.businessName || 'My Enterprise'}\nContact: ${formData.contactPerson || 'Proprietor'}\nPhone: ${formData.phone || 'Pending'}\nLocation: ${formData.location || 'India'}\nEstimated Budget: ${formData.estimatedBudget}\n\nPlease share your wholesale PDF price list.`
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-28 pb-20">
      {/* Header */}
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 mb-16 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D81C28] px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 inline-block mb-3">
          B2B Trade &amp; Bulk Distributorship
        </span>
        <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
          Wholesale <span className="text-[#D81C28]">Enquiry</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Partner directly with Pon Murugan Sivakasi. We supply authorized dealers, corporate gift buyers, and festival retailers across India with competitive tiered wholesale pricing and legal parcel transport.
        </p>
      </div>

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Benefits & WhatsApp Quick Connect */}
          <div className="lg:col-span-5 space-y-6">
            {/* Wholesale Benefits Card */}
            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-md">
              <h3 className="font-sans text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Percent className="w-5 h-5 text-[#D81C28]" />
                <span>Wholesale Tier Privileges</span>
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tiered Slab Discounts:</strong> Up to 50% - 75% savings off standard MRP on carton orders.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Custom Brand Gift Boxes:</strong> Private festival gift combos for corporate clients and institutions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Licensed Sivakasi Logistics:</strong> Safe delivery via registered explosive parcel booking hubs across South India and PAN-India.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Official PESO Documentation:</strong> Tax invoices, safety test approvals, and transport waybills provided.</span>
                </li>
              </ul>

              {/* Direct WhatsApp Callout */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Prefer Fast WhatsApp Negotiation?
                </p>
                <a
                  href={`https://wa.me/918098443633?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat With Wholesale Manager</span>
                </a>
              </div>
            </div>

            {/* Direct Sivakasi Factory Office Box */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-red-50 text-[#D81C28] shrink-0 border border-red-100">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-gray-900">Sivakasi Sales Hotline</h4>
                <p className="text-xs text-gray-600 mt-0.5">Direct Factory Desk: +91 80984 43633</p>
                <p className="text-[11px] text-[#D49A26] mt-1 font-bold">Available Mon - Sat (9:00 AM - 8:30 PM)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Wholesale Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-xl relative">
              {submittedRef ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-sans text-2xl font-bold text-gray-900">Enquiry Received!</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Your wholesale enquiry reference number is <strong className="text-[#D81C28] font-mono">{submittedRef}</strong>. Our Sivakasi B2B manager will contact you within 2 business hours with customized tier pricing.
                  </p>
                  <div className="pt-4 flex justify-center gap-4">
                    <button
                      onClick={() => setSubmittedRef(null)}
                      className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-800 text-xs font-bold hover:bg-gray-200"
                    >
                      Submit Another Query
                    </button>
                    <a
                      href={`https://wa.me/918098443633?text=${encodeURIComponent(`Hi Pon Murugan, checking status for wholesale ref: ${submittedRef}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-xl btn-red text-xs font-bold"
                    >
                      Follow Up on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Business / Store Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="e.g. Sri Lakshmi Crackers & Traders"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                      />
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        required
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        placeholder="e.g. S. Ramanathan"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Mobile Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="dealer@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* City / Location */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        City / District / Town *
                      </label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Madurai / Chennai / Bengaluru"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                      />
                    </div>

                    {/* Estimated Order Budget */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                        Estimated Order Volume
                      </label>
                      <select
                        name="estimatedBudget"
                        value={formData.estimatedBudget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28] cursor-pointer"
                      >
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Starter Batch)</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 (Retail Store)</option>
                        <option value="₹1,00,000 - ₹3,00,000">₹1,00,000 - ₹3,00,000 (Major Dealer)</option>
                        <option value="Above ₹3,00,000">Above ₹3,00,000 (Full Container / Distributor)</option>
                      </select>
                    </div>
                  </div>

                  {/* Required Product Categories Multi-Select */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Required Categories (Select All That Apply):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {availableCategories.map(cat => {
                        const isSelected = formData.categories.includes(cat);
                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => handleCategoryToggle(cat)}
                            className={`p-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between border transition-all ${
                              isSelected
                                ? 'bg-red-50 border-[#D81C28] text-[#D81C28]'
                                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span>{cat}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#D81C28]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Additional Requirements / Transport Hub Preference
                    </label>
                    <textarea
                      name="requirements"
                      rows={3}
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="Specify transport service preference, desired delivery timeframe, or particular cracker items..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28] resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl btn-red font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#D81C28]/20 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting Request...' : 'Submit Wholesale Quotation Request'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wholesale;

