'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  amplitude?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
  duration = 4,
  amplitude = 20,
  className = '',
  style = {},
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -amplitude, 0],
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    });
  }, [controls, delay, duration, amplitude]);

  return (
    <motion.div
      animate={controls}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

interface FloatingElementsProps {
  count?: number;
  children: React.ReactNode;
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 5,
  children,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <FloatingElement
          key={index}
          delay={index * 0.5}
          duration={3 + Math.random() * 2}
          amplitude={15 + Math.random() * 10}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {children}
        </FloatingElement>
      ))}
    </div>
  );
};

export { FloatingElement, FloatingElements };
