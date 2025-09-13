'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [offset, offset - 100 * speed]), springConfig);
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [offset, offset - 100 * speed]), springConfig);

  const yDown = useSpring(useTransform(scrollYProgress, [0, 1], [offset, offset + 100 * speed]), springConfig);
  const xRight = useSpring(useTransform(scrollYProgress, [0, 1], [offset, offset - 100 * speed]), springConfig);

  return (
    <motion.div
      ref={ref}
      style={
        direction === 'up' ? { y } :
        direction === 'down' ? { y: yDown } :
        direction === 'left' ? { x } :
        direction === 'right' ? { x: xRight } :
        { y }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
