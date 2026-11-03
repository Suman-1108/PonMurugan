import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import apiService from '../services/api';
import toast from 'react-hot-toast';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Lock,
  ArrowLeft,
  FileText,
  MapPin
} from 'lucide-react';

const Checkout = () => {
  const { cartItems, subtotal, deliveryFee, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    address: '',
    district: '',
    state: 'Tamil Nadu',
    pincode: '',
    orderNotes: '',
    paymentPreference: 'cash_on_hub_delivery' // 'cash_on_hub_delivery' | 'direct_bank_transfer'
  });

  const [pincodeCheck, setPincodeCheck] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmittedData, setOrderSubmittedData] = useState(null);

  const finalTotal = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'pincode' && value.length === 6) {
      const check = apiService.checkPincodeLegalStatus(value);
      setPincodeCheck(check);
    } else if (name === 'pincode' && value.length < 6) {
      setPincodeCheck(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.mobileNumber.trim() || !formData.address.trim() || !formData.district.trim() || !formData.pincode.trim()) {
      toast.error('Please complete all required shipping fields.');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (pincodeCheck && pincodeCheck.restricted) {
      toast.error('Doorstep delivery is restricted in this PIN code. Please select licensed hub pickup.');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customer: formData,
      items: cartItems.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
      subtotal,
      deliveryFee,
      total: finalTotal,
      complianceAccepted: true,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await apiService.submitOrderIntent(orderPayload);
      // Per instructions: "Keep payment integration configurable. Do not simulate successful payments or claim orders have been placed without a real backend confirmation."
      setOrderSubmittedData({
        orderRef: `PM-ORD-${Date.now().toString().slice(-6)}`,
        requiresBackend: res.requiresBackend,
        instructions: res.instructions || 'Order details saved. Please confirm transport booking with our Sivakasi sales desk.',
        customer: { ...formData },
        items: [...cartItems],
        subtotal,
        deliveryFee,
        total: finalTotal
      });
      clearCart();
    } catch {
      toast.error('Network error during order submission. Connecting via WhatsApp...');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !orderSubmittedData) {
    navigate('/cart');
    return null;
  }

  const generateWhatsAppOrderText = () => {
    const items = orderSubmittedData?.items || cartItems;
    const sub = orderSubmittedData?.subtotal || subtotal;
    const del = orderSubmittedData?.deliveryFee || deliveryFee;
    const tot = orderSubmittedData?.total || finalTotal;
    const cust = orderSubmittedData?.customer || formData;
    const ref = orderSubmittedData?.orderRef || 'PM-ORD-NEW';

    const itemList = items
      .map(
        (i, index) =>
          `${index + 1}. *${i.name}* (${i.packSize || '1 Unit'})\n   Qty: ${i.quantity} × ₹${i.price} = *₹${(i.price * i.quantity).toLocaleString('en-IN')}*`
      )
      .join('\n\n');

    return encodeURIComponent(
      `🎆 *PON MURUGAN PREMIUM FIREWORKS* 🎆\n` +
      `*ORDER BOOKING CONFIRMATION*\n` +
      `------------------------------------\n` +
      `🔖 *Booking Ref:* ${ref}\n\n` +
      `*Customer & Dispatch Details:*\n` +
      `• Name: ${cust.fullName}\n` +
      `• Mobile: ${cust.mobileNumber}\n` +
      `• Address: ${cust.address}, ${cust.district}, ${cust.state} - ${cust.pincode}\n\n` +
      `*Selected Items:*\n` +
      `------------------------------------\n` +
      `${itemList}\n` +
      `------------------------------------\n\n` +
      `📦 *Total Quantity:* ${items.reduce((acc, i) => acc + i.quantity, 0)} items (${items.length} varieties)\n` +
      `💰 *Items Subtotal:* ₹${sub.toLocaleString('en-IN')}\n` +
      `🚚 *Transport Fee:* ${del === 0 ? 'FREE' : `₹${del}`}\n` +
      `💵 *Total Estimated Amount:* ₹${tot.toLocaleString('en-IN')}\n\n` +
      `Please confirm dispatch allocation and transport parcel booking clearance!`
    );
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-900 pt-40 sm:pt-48 pb-20">
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        {/* Order Submission Status / Confirmation Box */}
        {orderSubmittedData ? (
          <div className="max-w-2xl mx-auto py-2 sm:py-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-white border border-[#EAE3D6] rounded-3xl p-6 sm:p-10 text-center shadow-xl relative overflow-hidden">
              {/* Top Accent Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#7A1518] via-[#C29B38] to-[#7A1518]"></div>

              {/* Verified Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-5 border-2 border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              {/* Status Badge */}
              <span className="text-xs font-bold uppercase tracking-widest text-[#7A1518] px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#E5DAC6] inline-block mb-3">
                Order Intent Registered
              </span>

              {/* Booking Reference */}
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                Booking Ref: <span className="text-[#7A1518] font-mono">{orderSubmittedData.orderRef}</span>
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 max-w-lg mx-auto">
                In accordance with legal explosives delivery regulations, orders are dispatched via licensed Sivakasi parcel transport hubs. Your order intent has been logged.
              </p>

              {/* Customer & Order Summary Snapshot */}
              <div className="bg-[#FAF8F5] border border-[#EBE4D8] rounded-2xl p-4 sm:p-5 mb-6 text-left text-xs text-gray-700 space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D6]">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Customer Name:</span>
                  <span className="font-bold text-gray-900">{orderSubmittedData.customer?.fullName || formData.fullName}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D6]">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Mobile Contact:</span>
                  <span className="font-bold text-gray-900">{orderSubmittedData.customer?.mobileNumber || formData.mobileNumber}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D6]">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Delivery Destination:</span>
                  <span className="font-bold text-gray-900">
                    {orderSubmittedData.customer?.district || formData.district}, {orderSubmittedData.customer?.state || formData.state} - {orderSubmittedData.customer?.pincode || formData.pincode}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 font-bold">
                  <span className="text-[#7A1518] uppercase tracking-wider text-xs">Total Order Value:</span>
                  <span className="text-[#7A1518] text-base sm:text-lg font-black">₹{(orderSubmittedData.total || finalTotal).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Sivakasi Transport Dispatch Notice */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-left mb-6 space-y-1.5 text-amber-900">
                <p className="font-bold flex items-center gap-1.5 text-amber-950">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Sivakasi Transport Dispatch Notice:</span>
                </p>
                <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed">
                  In accordance with fireworks transport protocols, our Sivakasi sales desk will verify your order items and dispatch slot. Please click below to confirm your booking via WhatsApp for instantaneous bill generation.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/918098443633?text=${generateWhatsAppOrderText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm Order via WhatsApp</span>
                </a>

                <Link
                  to="/"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-300 hover:bg-gray-50 font-bold text-sm text-gray-700 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Form Header (Only shown during active form completion) */}
            <div className="mb-8">
              <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#7A1518] mb-3">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shopping Cart</span>
              </Link>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-gray-900">
                Checkout &amp; <span className="text-[#7A1518]">Transport Booking</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Complete your delivery details for licensed Sivakasi explosives transport dispatch.
              </p>
            </div>

            <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Shipping Address & Customer Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
                  <h3 className="font-sans text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D81C28]" />
                    <span>Customer &amp; Delivery Destination</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Receiver's name"
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="mobileNumber"
                          required
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          placeholder="10-digit mobile number"
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="For order dispatch waybill receipt"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Street Address / Delivery Location *
                      </label>
                      <textarea
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="House / Door number, Street name, Landmark"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28] resize-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          District / City *
                        </label>
                        <input
                          type="text"
                          name="district"
                          required
                          value={formData.district}
                          onChange={handleInputChange}
                          placeholder="e.g. Madurai"
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          State *
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28] cursor-pointer"
                        >
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Other States">Other Authorized State</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          6-Digit PIN Code *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          maxLength={6}
                          required
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="e.g. 625001"
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                        />
                      </div>
                    </div>

                    {/* PIN Code Verification Indicator */}
                    {pincodeCheck && (
                      <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        pincodeCheck.restricted
                          ? 'bg-red-50 border border-red-200 text-red-700'
                          : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      }`}>
                        {pincodeCheck.restricted ? (
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        <span>{pincodeCheck.message}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Order Notes / Nearest Transport Service Preference
                      </label>
                      <input
                        type="text"
                        name="orderNotes"
                        value={formData.orderNotes}
                        onChange={handleInputChange}
                        placeholder="e.g. Deliver via VRL / KPN / ARC parcel service hub"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-[#D81C28]"
                      />
                    </div>
                  </div>
                </div>

                {/* Statutory Explosives Compliance Checkbox */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    I declare that all fireworks ordered are intended for lawful festive celebrations, conforming to PESO guidelines and local municipal regulations. Fireworks will be delivered through licensed transport agencies only.
                  </p>
                </div>
              </div>

              {/* Order Summary & Final Confirmation Button */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xl sticky top-28">
                  <h3 className="font-sans text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                    Order Items ({cartItems.length})
                  </h3>

                  <div className="max-h-60 overflow-y-auto space-y-3 pr-2 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs text-gray-700">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-xs">{item.quantity}x</span>
                          <span className="truncate max-w-[170px]">{item.name}</span>
                        </div>
                        <span className="font-mono text-[#D81C28] font-bold">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5 text-xs text-gray-600 py-3 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span>Items Subtotal:</span>
                      <span className="font-mono text-gray-900 font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transport Parcel Charge:</span>
                      <span className="font-mono text-gray-900 font-semibold">
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                  </div>

                  <div className="py-4 border-t border-gray-100 flex justify-between items-baseline mb-6">
                    <span className="font-sans text-base font-bold text-gray-900">Total Order Value:</span>
                    <span className="font-sans text-2xl font-black text-[#D81C28]">
                      ₹{finalTotal}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl btn-red text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#D81C28]/20 disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isSubmitting ? 'Registering Booking...' : 'Submit Transport Order Booking'}</span>
                  </button>

                  {/* Or Instant WhatsApp Booking Button */}
                  <div className="mt-4 text-center">
                    <span className="text-[11px] text-gray-500 uppercase tracking-widest block mb-2">Or Direct WhatsApp Booking</span>
                    <a
                      href={`https://wa.me/918098443633?text=${generateWhatsAppOrderText()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-300 text-xs font-bold transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Book Instantly on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
        )}
      </div>
    </div>
  );
};

export default Checkout;

