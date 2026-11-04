import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import splashLogoImg from '../assets/logo/pon_murugan_splash_logo.jpg';

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
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FAF6ED] cursor-pointer select-none overflow-hidden"
          title="Click to skip"
        >
          {/* Ambient Warm Golden & Festive Cream Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: [0.6, 1.25, 1] }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.32) 0%, rgba(122, 21, 24, 0.12) 40%, rgba(250, 246, 237, 0) 70%)',
              filter: 'blur(35px)'
            }}
          />

          {/* Golden Pulse Ring */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: [0.75, 1.2, 1.35],
              opacity: [0, 0.45, 0]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
            className="absolute w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full border border-amber-400/50 pointer-events-none"
          />

          {/* Centered Royal Medallion with Zoom-In In-Animation */}
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
            className="relative z-10 flex items-center justify-center p-3"
          >
            {/* Elegant Circular Medallion with Royal Gold Borders */}
            <div className="relative w-64 h-64 sm:w-84 sm:h-84 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full bg-[#080203] overflow-hidden flex items-center justify-center shadow-[0_25px_60px_rgba(122,21,24,0.25),0_0_0_3px_#D4AF37,0_0_0_7px_#FAF6ED,0_0_0_9px_rgba(212,175,55,0.45)]">
              <img
                src={splashLogoImg}
                alt="PON MURUGAN Fireworks"
                className="w-[96%] h-[96%] object-contain"
                onError={(e) => {
                  e.target.src = '/assets/pon_murugan_splash_logo.jpg';
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

