'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NeumorphicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-primary-400 to-primary-600 text-white';
      case 'secondary':
        return 'bg-gradient-to-br from-secondary-400 to-secondary-600 text-white';
      case 'accent':
        return 'bg-gradient-to-br from-accent-400 to-accent-600 text-white';
      case 'ghost':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gradient-to-br from-primary-400 to-primary-600 text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-10 py-5 text-xl';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ 
        scale: 1.05,
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)'
      }}
      whileTap={{ 
        scale: 0.95,
        boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.2)'
      }}
      className={`
        relative rounded-2xl font-semibold transition-all duration-300
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        boxShadow: variant === 'ghost' 
          ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff'
          : '6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.7)',
      }}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mx-auto"
        />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default NeumorphicButton;
