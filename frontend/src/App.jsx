import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FloatingOrderBar from './components/FloatingOrderBar';
import SearchModal from './components/SearchModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Gallery from './pages/Gallery';
import Wholesale from './pages/Wholesale';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// Helper component to scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#18181B] selection:bg-[#D81C28] selection:text-white">
        <ScrollToTop />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#FFFFFF',
              color: '#18181B',
              border: '1px solid #E2E8F0',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '12px'
            },
            success: {
              iconTheme: {
                primary: '#16A34A',
                secondary: '#FFFFFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#D81C28',
                secondary: '#FFFFFF',
              },
            },
          }}
        />

        {/* Global Navigation */}
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Live Search Modal */}
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        {/* Floating WhatsApp Quick Connect */}
        <WhatsAppButton />

        {/* Global Floating Order Summary Bar (triggers on any item addition) */}
        <FloatingOrderBar />

        {/* Main Routed Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Navigate to="/products" replace />} />
            <Route path="/gallery" element={<Navigate to="/products" replace />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;

