import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LoadingScreenProps {
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  icon, 
  size = 'xl' 
}) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl', 
    xl: 'text-4xl'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-rose-300 flex items-center justify-center relative overflow-hidden">
      {/* Floating Pink Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {windowSize.width > 0 && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 text-pink-500 opacity-70"
            initial={{ 
              x: Math.random() * windowSize.width,
              y: windowSize.height + 50,
              rotate: 0
            }}
            animate={{
              y: -50,
              rotate: 360,
              x: Math.random() * windowSize.width
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Floating Pink Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {windowSize.width > 0 && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-60"
            initial={{ 
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              scale: 0
            }}
            animate={{
              y: [null, -100],
              scale: [0, 1, 0],
              x: Math.random() * windowSize.width
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Main Loading Icon Container */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Icon Container */}
        <motion.div
          className={`${sizeClasses[size]} bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-2xl`}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Custom Icon atau Default Icon */}
          {icon ? (
            <div className={`${textSizes[size]} text-white`}>
              {icon}
            </div>
          ) : (
            <div className={`${textSizes[size]} text-white`}>
              <Image
                src="/images/juice-icon.png"
                alt="Juice Icon"
                width={64}
                height={64}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          )}
        </motion.div>

        {/* Pulse Ring Effect */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-pink-400 rounded-3xl`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-rose-400 rounded-3xl`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="flex space-x-2"
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
          <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
