import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-200 shadow-xl space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B1018] block mb-2">Legal Compliance</span>
            <h1 className="font-sans text-3xl sm:text-4xl font-black text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-500 mt-2">Last Updated: October 2026</p>
          </div>

          <section className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <h2 className="font-sans text-lg font-bold text-gray-900">1. Information We Collect</h2>
            <p>
              PON MURUGAN Fireworks collects basic identification details such as your name, mobile contact number, shipping destination, and email address solely for processing fireworks quotations, wholesale trade inquiries, and licensed transport dispatch logistics.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <h2 className="font-sans text-lg font-bold text-gray-900">2. Purpose of Data Use</h2>
            <p>
              Your contact details are used strictly to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Communicate order status and provide transport waybill consignment receipts.</li>
              <li>Coordinate with licensed statutory parcel services for lawful transport.</li>
              <li>Respond to wholesale dealership inquiries from our Sivakasi headquarters.</li>
            </ul>
          </section>

          <section className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <h2 className="font-sans text-lg font-bold text-gray-900">3. Information Protection &amp; Third Parties</h2>
            <p>
              We do not sell, rent, or trade your personal information to marketing databases. Details are shared exclusively with authorized delivery carriers to complete logistics under applicable Indian Explosives Rules.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <h2 className="font-sans text-lg font-bold text-gray-900">4. Contact Our Privacy Officer</h2>
            <p>
              For data access, corrections, or inquiries, reach out to our Sivakasi Administrative Desk at <a href="mailto:contact@ponmuruganfireworks.com" className="text-[#8B1018] font-semibold underline">contact@ponmuruganfireworks.com</a> or phone +91 80984 43633.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
