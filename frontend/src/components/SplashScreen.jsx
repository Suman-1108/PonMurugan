import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo/pon_murugan_logo.png';

const SplashScreen = ({ onComplete, duration = 2400 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent background scrolling while splash is visible
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [duration]);

  const handleAnimationComplete = () => {
    if (!isVisible) {
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0A0204] cursor-pointer select-none overflow-hidden"
          title="Click to skip"
        >
          {/* Ambient Radial Golden & Crimson Festive Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: [0.6, 1.2, 1] }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 196, 90, 0.22) 0%, rgba(122, 21, 24, 0.35) 45%, transparent 70%)',
              filter: 'blur(30px)'
            }}
          />

          {/* Golden Aura Ring Pulse */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: [0.7, 1.15, 1.25],
              opacity: [0, 0.45, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
            className="absolute w-56 h-56 sm:w-80 sm:h-80 rounded-full border border-amber-400/30 pointer-events-none"
          />

          {/* Centered Logo with Zoom-In In-Animation */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{
              scale: [0.3, 1.08, 1],
              opacity: [0, 1, 1]
            }}
            transition={{
              duration: 1.3,
              times: [0, 0.7, 1],
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative z-10 flex items-center justify-center p-4"
          >
            <img
              src={logoImg}
              alt="PON MURUGAN Fireworks"
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_40px_rgba(245,196,90,0.4)]"
              onError={(e) => {
                e.target.src = '/assets/pon_murugan_logo.png';
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
