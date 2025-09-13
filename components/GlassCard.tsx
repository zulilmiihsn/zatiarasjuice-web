'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'blur' | 'frosted' | 'crystal';
  intensity?: 'low' | 'medium' | 'high';
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  intensity = 'medium',
  hover = true,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'blur':
        return 'backdrop-blur-md bg-white/10 border border-white/20';
      case 'frosted':
        return 'backdrop-blur-lg bg-white/15 border border-white/30';
      case 'crystal':
        return 'backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/40';
      default:
        return 'backdrop-blur-sm bg-white/5 border border-white/10';
    }
  };

  const getIntensityStyles = () => {
    switch (intensity) {
      case 'low':
        return 'shadow-soft';
      case 'high':
        return 'shadow-strong';
      default:
        return 'shadow-medium';
    }
  };

  return (
    <motion.div
      whileHover={hover ? { 
        scale: 1.02,
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      className={`
        rounded-2xl p-6 transition-all duration-300
        ${getVariantStyles()}
        ${getIntensityStyles()}
        ${className}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
