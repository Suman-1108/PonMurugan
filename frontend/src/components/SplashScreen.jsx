import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo/pon_murugan_logo.png';

const SplashScreen = ({ onComplete, duration = 3000 }) => {
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
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FAF7F2] cursor-pointer select-none overflow-hidden"
          title="Click anywhere to skip"
        >
          {/* Subtle Warm Amber Ambient Glow Behind */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.35, 0.7, 0.45, 0.65, 0.35],
              scale: [0.95, 1.15, 1.0, 1.1, 0.95]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.15, 0.3, 0.45, 0.75]
            }}
            className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(122, 21, 24, 0.12) 45%, rgba(250, 247, 242, 0) 75%)',
              filter: 'blur(35px)'
            }}
          />

          {/* Centered App Icon + Typography with Entrance & Continuous Heartbeat Animation */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Heartbeat Animated App Icon Card Container */}
            <div className="relative flex items-center justify-center">
              {/* Synchronized Heartbeat Pulsing Aura */}
              <motion.div
                animate={{
                  scale: [1, 1.22, 1.02, 1.16, 1],
                  opacity: [0.25, 0.75, 0.35, 0.65, 0.25]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.15, 0.3, 0.45, 0.75]
                }}
                className="absolute -inset-3 rounded-[34px] sm:rounded-[42px] bg-gradient-to-tr from-amber-500/30 via-red-600/25 to-amber-400/30 blur-lg pointer-events-none"
              />

              {/* Modern Rounded-Square App Icon Card with Heartbeat Rhythm */}
              <motion.div
                animate={{
                  scale: [1, 1.12, 0.98, 1.15, 1]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.15, 0.3, 0.45, 0.75]
                }}
                className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-[28px] sm:rounded-[36px] bg-black flex items-center justify-center p-2.5 sm:p-3 shadow-[0_20px_45px_rgba(0,0,0,0.2),0_10px_25px_rgba(122,21,24,0.18)] border border-amber-300/40 overflow-hidden"
              >
                <motion.img
                  animate={{
                    scale: [1, 1.06, 1.01, 1.05, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.15, 0.3, 0.45, 0.75]
                  }}
                  src={logoImg}
                  alt="PON MURUGAN"
                  className="w-full h-full object-contain select-none pointer-events-none drop-shadow-md"
                />
              </motion.div>
            </div>

            {/* Typography Below Card Matching Sowmiya Foods Reference */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.24em] uppercase text-[#7A1518] mt-6 sm:mt-7 font-sans drop-shadow-sm text-center"
            >
              PON MURUGAN
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.34em] uppercase text-[#C29B38] mt-1.5 sm:mt-2 text-center"
            >
              PREMIUM • SIVAKASI • FIREWORKS
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
