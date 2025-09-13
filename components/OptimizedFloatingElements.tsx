'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface OptimizedFloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  amplitude?: number;
  className?: string;
  style?: React.CSSProperties;
}

const OptimizedFloatingElement: React.FC<OptimizedFloatingElementProps> = ({
  children,
  delay = 0,
  duration = 4,
  amplitude = 10, // Reduced default amplitude
  className = '',
  style = {},
}) => {
  const controls = useRef<any>(null);

  useEffect(() => {
    // Use CSS animation instead of Framer Motion for better performance
    const element = controls.current;
    if (element) {
      element.style.animation = `floating ${duration}s ease-in-out infinite`;
      element.style.animationDelay = `${delay}s`;
      element.style.transform = `translateY(0px)`;
    }
  }, [delay, duration, amplitude]);

  return (
    <div
      ref={controls}
      className={`${className} floating-animation`}
      style={{
        ...style,
        '--amplitude': `${amplitude}px`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

interface OptimizedFloatingElementsProps {
  count?: number;
  children: React.ReactNode;
  className?: string;
}

const OptimizedFloatingElements: React.FC<OptimizedFloatingElementsProps> = ({
  count = 3, // Reduced default count
  children,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <OptimizedFloatingElement
          key={index}
          delay={index * 0.8}
          duration={3 + Math.random() * 2}
          amplitude={8 + Math.random() * 5}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {children}
        </OptimizedFloatingElement>
      ))}
    </div>
  );
};

export { OptimizedFloatingElement, OptimizedFloatingElements };
