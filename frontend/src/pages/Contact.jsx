import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import apiService from '../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Question',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.submitEnquiry({
        ...formData,
        enquiryType: formData.subject
      });
      if (res.success) {
        toast.success('Your message has been dispatched to our Sivakasi headquarters!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: 'General Question',
          message: ''
        });
      } else {
        toast.error('Unable to send. Please call our sales desk directly at 8098443633.');
      }
    } catch {
      toast.error('Error connecting to sales desk. Please reach us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-28 pb-20">
      {/* Header */}
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 mb-16 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D81C28] px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 inline-block mb-3">
          Direct Customer Service
        </span>
        <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
          Contact <span className="text-[#D81C28]">Pon Murugan</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Have queries about custom celebration boxes, legal logistics transport, or order dispatch status? Our dedicated Sivakasi fireworks advisors are ready to assist you.
        </p>
      </div>

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Direct Call Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-red-50 text-[#D81C28] shrink-0 border border-red-100">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-gray-900">Telephone Helpline</h4>
                <p className="text-xs text-gray-500 mt-1 mb-2">Speak directly with our Sivakasi order desk:</p>
                <a href="tel:8098443633" className="font-sans text-lg font-black text-[#D81C28] hover:underline">
                  +91 80984 43633
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-gray-900">Instant WhatsApp Desk</h4>
                <p className="text-xs text-gray-500 mt-1 mb-2">Quick queries, catalogues &amp; dispatch tracking:</p>
                <a
                  href="https://wa.me/918098443633?text=Hi%20Pon%20Murugan%20Fireworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  <span>Chat on +91 80984 43633</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-red-50 text-[#D81C28] shrink-0 border border-red-100">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-gray-900">Official Correspondence</h4>
                <p className="text-xs text-gray-500 mt-1 mb-2">Institutional quotes and billing queries:</p>
                <a href="mailto:sales@ponmuruganfireworks.com" className="text-sm font-semibold text-gray-800 hover:text-[#D81C28]">
                  sales@ponmuruganfireworks.com
                </a>
              </div>
            </div>

            {/* Factory Address Card */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-700 shrink-0 border border-amber-100">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-gray-900">Sivakasi Factory Office</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  PON MURUGAN Fireworks<br />
                  Sivakasi Main Road, Virudhunagar District,<br />
                  Tamil Nadu - 626123, India
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-[11px] text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Mon – Sat: 9:00 AM – 8:30 PM (IST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-xl">
              <h3 className="font-sans text-2xl font-bold text-gray-900 mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Fill out the form below. We typically respond within 1–2 hours during business hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Anand Kumar"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Mobile Number *
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28] cursor-pointer"
                    >
                      <option value="General Question">General Question</option>
                      <option value="Festival Retail Booking">Festival Retail Booking</option>
                      <option value="Wholesale Dealership">Wholesale Dealership</option>
                      <option value="Wedding Fireworks Show">Wedding Fireworks Show</option>
                      <option value="Parcel Tracking Inquiry">Parcel Tracking Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Message / Inquiries *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your detailed query or festival requirements here..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl btn-red font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#D81C28]/20 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message To Sivakasi Office'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

