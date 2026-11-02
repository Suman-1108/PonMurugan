import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-200 shadow-xl space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B1018] block mb-2">Terms of Service</span>
            <h1 className="font-sans text-3xl sm:text-4xl font-black text-gray-900">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs text-gray-500 mt-2">Effective: October 2026</p>
          </div>

          <section className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <h2 className="font-sans text-lg font-bold text-gray-900">1. Legal Fireworks &amp; Regulatory Compliance</h2>
            <p>
              All products listed by PON MURUGAN are manufactured in Sivakasi in accordance with the Petroleum and Explosives Safety Organization (PESO) regulations and Supreme Court mandates regarding Green Crackers. Sales, delivery, and possession are strictly subject to applicable local, state, and central laws.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <h2 className="font-sans text-lg font-bold text-gray-900">2. Licensed Transport &amp; Parcel Booking</h2>
            <p>
              Fireworks are categorized as hazardous commercial goods and cannot be shipped via normal domestic air or express postal couriers. All orders are booked via approved, licensed surface transport services (lorry parcel agencies) with hub delivery pick-up or permitted doorstep delivery. Minimum booking thresholds apply to ensure logistics safety.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <h2 className="font-sans text-lg font-bold text-gray-900">3. Safety &amp; Usage Responsibility</h2>
            <p>
              Fireworks should only be handled and discharged by adults in designated open areas, observing safe distances from structures and flammable materials. PON MURUGAN accepts no liability for misuse, unauthorized alterations, or failure to observe basic safety protocols.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <h2 className="font-sans text-lg font-bold text-gray-900">4. Order Confirmation &amp; Cancellations</h2>
            <p>
              Due to seasonal demand and statutory restrictions, all dispatched consignment bookings are final once transferred to the licensed transport carrier.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
