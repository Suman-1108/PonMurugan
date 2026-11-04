import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import splashLogoImg from '../assets/logo/pon_murugan_splash_logo.png';

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
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#070102] cursor-pointer select-none overflow-hidden"
          title="Click to skip"
        >
          {/* Ambient Radial Golden & Crimson Festive Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: [0.6, 1.25, 1] }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 196, 90, 0.28) 0%, rgba(122, 21, 24, 0.38) 45%, transparent 70%)',
              filter: 'blur(35px)'
            }}
          />

          {/* Golden Aura Ring Pulse */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: [0.7, 1.2, 1.35],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
            className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-amber-400/30 pointer-events-none"
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
            className="relative z-10 flex items-center justify-center p-4 max-w-[90vw] max-h-[90vh]"
          >
            <img
              src={splashLogoImg}
              alt="PON MURUGAN Fireworks"
              className="w-64 h-64 sm:w-84 sm:h-84 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px] object-contain drop-shadow-[0_0_55px_rgba(245,196,90,0.5)]"
              onError={(e) => {
                e.target.src = '/assets/pon_murugan_splash_logo.png';
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

