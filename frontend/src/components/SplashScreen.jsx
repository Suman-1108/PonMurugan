import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import circleLogoImg from '../assets/logo/pon_murugan_circle_logo.jpg';

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
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-white cursor-pointer select-none overflow-hidden"
          title="Click to skip"
        >
          {/* Ambient Warm Golden & Festive Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: [0.6, 1.25, 1] }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 196, 90, 0.4) 0%, rgba(212, 175, 55, 0.18) 35%, rgba(216, 28, 40, 0.06) 55%, transparent 70%)',
              filter: 'blur(45px)'
            }}
          />

          {/* Golden Pulse Ring 1 */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: [0.7, 1.2, 1.35],
              opacity: [0, 0.45, 0]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
            className="absolute w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full border border-amber-400/40 pointer-events-none"
          />

          {/* Golden Dashed Ring 2 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.9, 1.3, 1.45],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.4
            }}
            className="absolute w-80 h-80 sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-[#C29B38]/30 pointer-events-none"
          />

          {/* Centered Circle Type Logo with Zoom-In In-Animation */}
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
            {/* Circular Medallion Frame */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden bg-black border-[4px] sm:border-[6px] border-[#C29B38] shadow-[0_20px_60px_rgba(122,21,24,0.32),0_0_45px_rgba(245,196,90,0.38)] flex items-center justify-center p-3 sm:p-4">
              <img
                src={circleLogoImg}
                alt="PON MURUGAN Fireworks"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = '/assets/pon_murugan_circle_logo.jpg';
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

