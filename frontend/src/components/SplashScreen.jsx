import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo/pon_murugan_logo.png';

const SplashScreen = ({ onComplete, duration = 2600 }) => {
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
          {/* Breathing Ambient Warm Golden Aura */}
          <motion.div
            animate={{
              scale: [0.92, 1.08, 0.92],
              opacity: [0.55, 0.9, 0.55]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(122, 21, 24, 0.09) 45%, rgba(250, 247, 242, 0) 72%)',
              filter: 'blur(35px)'
            }}
          />

          {/* Centered App Icon + Loading Animation Container */}
          <motion.div
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{
              scale: [0.65, 1.04, 1],
              opacity: [0, 1, 1]
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.7, 1],
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.25, ease: 'easeOut' }
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Pulsing Card Wrapper for Live Loading Feel */}
            <motion.div
              animate={{
                scale: [1, 1.025, 1]
              }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.9
              }}
              className="relative"
            >
              {/* Outer Golden Glow Ring on Card */}
              <div className="absolute -inset-1 rounded-[30px] sm:rounded-[38px] bg-gradient-to-r from-amber-400/30 via-yellow-200/40 to-amber-500/30 blur-sm pointer-events-none" />

              {/* Modern Rounded-Square App Icon Card */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-[28px] sm:rounded-[36px] bg-black flex items-center justify-center p-2.5 sm:p-3 shadow-[0_20px_45px_rgba(0,0,0,0.22),0_10px_25px_rgba(122,21,24,0.18)] border border-amber-300/45 overflow-hidden">
                <img
                  src={logoImg}
                  alt="PON MURUGAN"
                  className="w-full h-full object-contain select-none pointer-events-none"
                />

                {/* Shimmer Light Sweep Loading Effect across the Logo */}
                <motion.div
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 0.6,
                    duration: 1.5,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.3
                  }}
                  className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />
              </div>
            </motion.div>

            {/* Brand Typography Below Card */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.24em] uppercase text-[#7A1518] mt-6 sm:mt-7 font-sans drop-shadow-sm text-center">
              PON MURUGAN
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.34em] uppercase text-[#C29B38] mt-1.5 sm:mt-2 text-center">
              PREMIUM • SIVAKASI • FIREWORKS
            </p>

            {/* Smooth Loading Progress Bar */}
            <div className="mt-5 sm:mt-6 w-36 sm:w-44 h-1 sm:h-1.5 bg-amber-900/10 rounded-full overflow-hidden p-[1px] relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: (duration / 1000) * 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2
                }}
                className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#7A1518] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.7)] relative overflow-hidden"
              >
                {/* Moving Light Shimmer on Progress Bar */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.9,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
