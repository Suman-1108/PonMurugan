import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo/pon_murugan_logo.png';

const SplashScreen = ({ onComplete, duration = 2500 }) => {
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
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FAF7F2] cursor-pointer select-none overflow-hidden"
          title="Click anywhere to skip"
        >
          {/* Subtle Warm Amber Ambient Glow Behind the App Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.20) 0%, rgba(122, 21, 24, 0.08) 45%, rgba(250, 247, 242, 0) 72%)',
              filter: 'blur(35px)'
            }}
          />

          {/* Centered App Icon + Typography with Zoom-In Entrance Animation */}
          <motion.div
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{
              scale: [0.65, 1.04, 1],
              opacity: [0, 1, 1]
            }}
            transition={{
              duration: 1.0,
              times: [0, 0.7, 1],
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.3, ease: 'easeOut' }
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Modern Rounded-Square App Icon Card */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-[28px] sm:rounded-[36px] bg-black flex items-center justify-center p-2.5 sm:p-3 shadow-[0_20px_45px_rgba(0,0,0,0.18),0_10px_25px_rgba(122,21,24,0.14)] border border-amber-300/40 overflow-hidden">
              <img
                src={logoImg}
                alt="PON MURUGAN"
                className="w-full h-full object-contain select-none pointer-events-none"
              />
            </div>

            {/* Typography Below Card Matching Sowmiya Foods Reference */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.24em] uppercase text-[#7A1518] mt-6 sm:mt-7 font-sans drop-shadow-sm text-center">
              PON MURUGAN
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.34em] uppercase text-[#C29B38] mt-1.5 sm:mt-2 text-center">
              PREMIUM • SIVAKASI • FIREWORKS
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
