import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

const CART_STORAGE_KEY = 'pon_murugan_cart_v1';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success(`Updated ${product.name} quantity to ${existing.quantity + quantity}!`);
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`Added ${product.name} to cart!`);
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    setCartItems(prev => prev.filter(i => i.id !== productId));
    if (item) {
      toast.error(`Removed ${item.name} from cart`);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast('Cart cleared', { icon: '🗑️' });
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const totalMrp = cartItems.reduce((acc, item) => acc + (item.mrp * item.quantity), 0);
  
  const totalSavings = totalMrp - subtotal;

  // Legal & shipping compliance: Minimum order ₹1,000 for safe legal fireworks logistics handling
  const minOrderAmount = 1000;
  const deliveryFee = subtotal >= 3000 || subtotal === 0 ? 0 : 250;
  const isEligibleForOrder = subtotal >= minOrderAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        totalMrp,
        totalSavings,
        deliveryFee,
        minOrderAmount,
        isEligibleForOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

