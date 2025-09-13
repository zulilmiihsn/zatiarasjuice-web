'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface PerformanceOptimizedScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const PerformanceOptimizedScrollSection: React.FC<PerformanceOptimizedScrollSectionProps> = ({
  children,
  className = '',
  threshold = 0.1,
  direction = 'up',
  distance = 50,
  delay = 0,
  duration = 0.6,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    amount: threshold,
    once: once,
    margin: '-50px 0px'
  });

  // Optimized scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Transform values based on direction
  const baseTransform = useTransform(scrollYProgress, [0, 1], [distance, 0]);
  const downTransform = useTransform(scrollYProgress, [0, 1], [-distance, 0]);
  const rightTransform = useTransform(scrollYProgress, [0, 1], [-distance, 0]);
  
  const transform = (() => {
    switch (direction) {
      case 'up':
        return { y: baseTransform, x: 0 };
      case 'down':
        return { y: downTransform, x: 0 };
      case 'left':
        return { y: 0, x: baseTransform };
      case 'right':
        return { y: 0, x: rightTransform };
      default:
        return { y: baseTransform, x: 0 };
    }
  })();

  // Optimized animation variants
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{
        willChange: 'transform, opacity', // Optimize for GPU
      }}
    >
      {children}
    </motion.div>
  );
};

// Specialized scroll sections for common use cases
export const FadeInSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => (
  <PerformanceOptimizedScrollSection
    className={className}
    direction="up"
    distance={30}
    delay={delay}
    duration={0.5}
  >
    {children}
  </PerformanceOptimizedScrollSection>
);

export const SlideInSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}> = ({ children, className = '', direction = 'left', delay = 0 }) => (
  <PerformanceOptimizedScrollSection
    className={className}
    direction={direction}
    distance={50}
    delay={delay}
    duration={0.6}
  >
    {children}
  </PerformanceOptimizedScrollSection>
);

export const ScaleInSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => (
  <PerformanceOptimizedScrollSection
    className={className}
    direction="up"
    distance={0}
    delay={delay}
    duration={0.5}
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {children}
    </motion.div>
  </PerformanceOptimizedScrollSection>
);

// Staggered animation for multiple children
export const StaggeredSection: React.FC<{
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.1 }) => (
  <div className={className}>
    {children.map((child, index) => (
      <FadeInSection key={index} delay={index * staggerDelay}>
        {child}
      </FadeInSection>
    ))}
  </div>
);

export default PerformanceOptimizedScrollSection;
