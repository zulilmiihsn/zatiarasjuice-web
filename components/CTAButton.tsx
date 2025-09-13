'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, MessageCircle, ExternalLink } from 'lucide-react';

interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'gofood' | 'grabfood';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  disabled = false,
  loading = false,
  icon,
  className = '',
  target,
  rel,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-glow hover:scale-105 focus:ring-primary-500',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:shadow-glow-green hover:scale-105 focus:ring-secondary-500',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:scale-105 focus:ring-primary-500',
    whatsapp: 'bg-green-500 text-white hover:bg-green-600 hover:scale-105 focus:ring-green-500',
    gofood: 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 focus:ring-orange-500',
    grabfood: 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 focus:ring-green-600',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const iconMap = {
    whatsapp: <MessageCircle className="w-5 h-5" />,
    gofood: <ExternalLink className="w-5 h-5" />,
    grabfood: <ExternalLink className="w-5 h-5" />,
    primary: <ShoppingCart className="w-5 h-5" />,
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  const buttonIcon = icon || iconMap[variant as keyof typeof iconMap];

  const buttonContent = (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className="flex items-center space-x-2"
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
        />
      ) : (
        buttonIcon && <span>{buttonIcon}</span>
      )}
      <span>{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {buttonContent}
    </motion.button>
  );
};

export default CTAButton;
