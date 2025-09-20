'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  gradient: string;
}

interface HeroBannerProps {
  branch?: 'berau' | 'samarinda' | null;
  slides?: HeroSlide[];
  onBranchSelect?: (branch: 'berau' | 'samarinda') => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ branch, slides, onBranchSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // ULTRA PERFORMANCE PARALLAX TRANSFORMS - 60FPS OPTIMIZED
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]); // Reduced scale for smoother performance

  // Optimized parallax speeds with better performance curves
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"], { clamp: true });
  const glassmorphismY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"], { clamp: true });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"], { clamp: true });
  const floatingElementsY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"], { clamp: true });
  
  // Reduced rotation effects for smoother performance
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 3], { clamp: true });
  const glassmorphismRotate = useTransform(scrollYProgress, [0, 1], [0, -2], { clamp: true });
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 1.5], { clamp: true });
  const floatingElementsRotate = useTransform(scrollYProgress, [0, 1], [0, 6], { clamp: true });

  // Ultra optimized mouse parallax with better spring config
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [3, -3], { clamp: true }), { 
    stiffness: 150, 
    damping: 25,
    mass: 0.8
  });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-3, 3], { clamp: true }), { 
    stiffness: 150, 
    damping: 25,
    mass: 0.8
  });

  // Default slides dengan value proposition yang kuat dan dinamis berdasarkan cabang
  const defaultSlides: HeroSlide[] = [
    {
      id: '1',
      title: `Jus Terenak di ${branch ? branch.charAt(0).toUpperCase() + branch.slice(1) : 'Berau & Samarinda'}`,
      subtitle: 'Zatiaras Juice - #1 Choice',
      description: 'Dibuat dari buah alpukat pilihan terbaik, tanpa pengawet, 100% alami. Lebih dari 500+ pelanggan puas setiap bulan. Rating 4.9/5 dari 150+ review.',
      image: '/images/hero-avocado.jpg',
      ctaText: 'Lihat Menu',
      ctaLink: branch ? `/${branch}/menu` : '/menu',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    },
    {
      id: '2',
      title: 'Jus Segar Terbaik',
      subtitle: 'Zatiaras Juice - Fresh Daily',
      description: 'Dibuat fresh setiap hari dengan buah pilihan. Garansi uang kembali jika tidak puas. Order via WhatsApp/GoFood, siap dalam 15 menit.',
      image: '/images/hero-fruits.jpg',
      ctaText: 'Lihat Menu',
      ctaLink: branch ? `/${branch}/menu` : '/menu',
      gradient: 'from-pink-400 via-rose-500 to-red-600',
    },
    {
      id: '3',
      title: `Jus Alpukat #1 di ${branch ? branch.charAt(0).toUpperCase() + branch.slice(1) : 'Kaltim'}`,
      subtitle: 'Zatiaras Juice - Premium Quality',
      description: 'Resep rahasia turun temurun, susu segar pilihan, gula aren asli. Lebih dari 3 tahun melayani Berau & Samarinda dengan kualitas konsisten.',
      image: '/images/hero-healthy.jpg',
      ctaText: 'Lihat Menu',
      ctaLink: branch ? `/${branch}/menu` : '/menu',
      gradient: 'from-purple-400 via-violet-500 to-indigo-600',
    },
  ];

  const heroSlides = slides || defaultSlides;

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, heroSlides.length]);

  // ULTRA PERFORMANCE MOUSE TRACKING - 60FPS OPTIMIZED
  useEffect(() => {
    let ticking = false;
    let lastTime = 0;
    const throttleDelay = 16; // ~60fps
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      
      if (now - lastTime >= throttleDelay) {
        if (!ticking) {
          requestAnimationFrame(() => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
              // Ultra smooth mouse tracking with reduced sensitivity
              const mouseXValue = (e.clientX - centerX) / 30; // Further reduced for smoothness
              const mouseYValue = (e.clientY - centerY) / 30;
        
              // Use direct value setting for better performance
        mouseX.set(mouseXValue);
        mouseY.set(mouseYValue);
            }
            ticking = false;
            lastTime = now;
          });
          ticking = true;
        }
      }
    };

    // Only add listener if user prefers motion and device supports it
    if (typeof window !== 'undefined' && 
        window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
        !window.matchMedia('(hover: none)').matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen h-screen overflow-hidden"
      style={{
        perspective: '1000px',
      }}
    >
      {/* Animated Background dengan Enhanced Parallax */}
      <motion.div 
        className="absolute inset-0 silky-smooth fps-60"
        style={{ 
          y: backgroundY, 
          scale, 
          rotate: backgroundRotate,
          willChange: 'transform',
          contain: 'layout style paint'
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].gradient} opacity-90`}>
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Floating Premium Shapes - Optimized for Performance */}
        <motion.div 
          className="absolute inset-0 overflow-hidden silky-smooth fps-60"
          style={{ 
            y: floatingElementsY,
            willChange: 'transform',
            contain: 'layout style paint'
          }}
        >
          {[...Array(6)].map((_, i) => ( // Reduced from 8 to 6 for better performance
            <motion.div
              key={i}
              className="absolute silky-smooth fps-60"
              style={{
                left: `${(i * 16.67) % 100}%`, // Adjusted for 6 elements
                top: `${(i * 20) % 100}%`, // Adjusted for 6 elements
                willChange: 'transform, opacity',
                contain: 'layout style paint',
                transform: 'translateZ(0)', // Force GPU acceleration
              }}
              animate={{
                x: [0, 20, 0], // Reduced movement for smoother performance
                y: [0, 15, 0], // Reduced movement for smoother performance
                rotate: [0, 120, 240, 360], // Smoother rotation
                scale: [1, 1.1, 1], // Reduced scale for smoother performance
                opacity: [0.2, 0.5, 0.2], // Reduced opacity for smoother performance
              }}
              transition={{
                duration: 10 + i * 1.5, // Longer duration for smoother animation
                repeat: Infinity,
                ease: 'linear', // Linear easing for smoother performance
                repeatType: 'loop',
              }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r from-white/20 to-white/5 rounded-full blur-lg`} />
            </motion.div>
          ))}
          
          {/* ULTRA PERFORMANCE Geometric Shapes - 60FPS Optimized */}
          {[...Array(3)].map((_, i) => ( // Reduced from 4 to 3 for better performance
            <motion.div
              key={`geo-${i}`}
              className="absolute silky-smooth fps-60"
              style={{
                left: `${(i * 33.33) % 100}%`, // Adjusted for 3 elements
                top: `${(i * 40) % 100}%`, // Adjusted for 3 elements
                y: floatingElementsY,
                rotate: floatingElementsRotate,
                willChange: 'transform',
                contain: 'layout style paint',
                transform: 'translateZ(0)', // Force GPU acceleration
              }}
              animate={{
                x: [0, 15, 0], // Reduced movement for smoother performance
                y: [0, 10, 0], // Reduced movement for smoother performance
                rotate: [0, 60, 120, 180], // Smoother rotation
                scale: [0.9, 1.05, 0.9], // Reduced scale for smoother performance
              }}
              transition={{
                duration: 12 + i * 2, // Longer duration for smoother animation
                repeat: Infinity,
                ease: 'linear', // Linear easing for smoother performance
                repeatType: 'loop',
              }}
            >
              <div className={`w-20 h-20 bg-gradient-to-r from-primary-500/20 to-pinky-500/20 rounded-2xl blur-md`} />
            </motion.div>
          ))}
        </motion.div>

        {/* ULTRA PERFORMANCE Gradient Orbs - 60FPS Optimized */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl silky-smooth fps-60"
            style={{ 
              y: floatingElementsY, 
              rotate: floatingElementsRotate,
              willChange: 'transform, opacity',
              contain: 'layout style paint',
              transform: 'translateZ(0)',
            }}
            animate={{
              scale: [1, 1.2, 1], // Reduced scale for smoother performance
              opacity: [0.2, 0.5, 0.2], // Reduced opacity for smoother performance
              x: [0, 30, 0], // Reduced movement for smoother performance
              y: [0, -20, 0], // Reduced movement for smoother performance
            }}
            transition={{
              duration: 12, // Longer duration for smoother animation
              repeat: Infinity,
              ease: 'linear', // Linear easing for smoother performance
              repeatType: 'loop',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl silky-smooth fps-60"
            style={{ 
              y: floatingElementsY, 
              rotate: floatingElementsRotate,
              willChange: 'transform, opacity',
              contain: 'layout style paint',
              transform: 'translateZ(0)',
            }}
            animate={{
              scale: [1.1, 1, 1.1], // Reduced scale for smoother performance
              opacity: [0.3, 0.6, 0.3], // Reduced opacity for smoother performance
              x: [0, -25, 0], // Reduced movement for smoother performance
              y: [0, 25, 0], // Reduced movement for smoother performance
            }}
            transition={{
              duration: 14, // Longer duration for smoother animation
              repeat: Infinity,
              ease: 'linear', // Linear easing for smoother performance
              repeatType: 'loop',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[250px] h-[250px] bg-gradient-to-r from-gold-500/25 to-accent-500/25 rounded-full blur-2xl silky-smooth fps-60"
            style={{ 
              y: floatingElementsY, 
              rotate: floatingElementsRotate,
              willChange: 'transform, opacity',
              contain: 'layout style paint',
              transform: 'translateZ(0)',
            }}
            animate={{
              scale: [1, 1.15, 1], // Reduced scale for smoother performance
              opacity: [0.2, 0.5, 0.2], // Reduced opacity for smoother performance
              rotate: [0, 120, 240, 360], // Smoother rotation
            }}
            transition={{
              duration: 16, // Longer duration for smoother animation
              repeat: Infinity,
              ease: 'linear', // Linear easing for smoother performance
              repeatType: 'loop',
            }}
          />
        </div>
      </motion.div>

      {/* ULTRA PERFORMANCE Main Content dengan 3D Transform - 60FPS Optimized */}
      <motion.div
        className="relative h-full flex items-center justify-center silky-smooth fps-60"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          contain: 'layout style paint',
          transform: 'translateZ(0)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content dengan Enhanced Glassmorphism Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
            style={{ 
              y: glassmorphismY, 
              rotate: glassmorphismRotate,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Glassmorphism Card - Enhanced with Parallax */}
            <motion.div 
              className="backdrop-blur-xl bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] flex flex-col"
              style={{
                transform: 'translateZ(20px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col h-full space-y-4 sm:space-y-6"
              >
                {/* Top Section - Subtitle */}
                <div className="flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </motion.div>
                    <span className="text-base sm:text-lg lg:text-xl font-semibold text-white/90 font-display">
                      {heroSlides[currentSlide].subtitle}
                    </span>
                  </motion.div>
                </div>

                {/* Middle Section - Title */}
                <div className="flex-1 flex items-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-rounded leading-tight tracking-tight text-white"
                  >
                      {heroSlides[currentSlide].title}
                  </motion.h1>
                </div>

                {/* Bottom Section - Description */}
                <div className="flex-1 flex items-start pt-4">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-sm sm:text-base lg:text-lg text-white/80 max-w-lg leading-relaxed"
                  >
                    {heroSlides[currentSlide].description}
                  </motion.p>
                </div>

                {/* CTA Buttons dengan Modern Design */}
                <div className="flex-shrink-0 mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                  {onBranchSelect && !branch ? (
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 20px 40px rgba(255, 255, 255, 0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onBranchSelect('berau')}
                      className="group relative bg-white text-gray-900 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span className="text-2xl">🍹</span>
                        <span>{heroSlides[currentSlide].ctaText}</span>
                      </span>
                    </motion.button>
                  ) : (
                    <motion.a
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 20px 40px rgba(255, 255, 255, 0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      href={heroSlides[currentSlide].ctaLink}
                      className="group relative bg-white text-gray-900 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span className="text-2xl">🍹</span>
                        <span>{heroSlides[currentSlide].ctaText}</span>
                      </span>
                    </motion.a>
                  )}
                  
                  <motion.a
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(255, 255, 255, 0.2)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/6281234567890`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative border-2 border-white/60 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg overflow-hidden backdrop-blur-sm"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span className="text-2xl">💬</span>
                      <span>Order via WhatsApp</span>
                    </span>
                  </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image Content dengan Enhanced 3D Parallax */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              y: imageY,
              rotate: imageRotate
            }}
          >
            {/* 3D Image Container dengan Parallax */}
            <motion.div
              className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
              style={{
                rotateY: useTransform(mouseX, [-300, 300], [-5, 5]),
                rotateX: useTransform(mouseY, [-300, 300], [5, -5]),
                transform: 'translateZ(30px)',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                fill
                className="object-cover transition-transform duration-500"
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>

            {/* Floating Background Elements dengan Parallax */}
            <motion.div
              className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-xl"
              style={{ y: floatingElementsY, rotate: floatingElementsRotate }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-xl"
              style={{ y: floatingElementsY, rotate: floatingElementsRotate }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Controls dengan Modern Design */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-20">
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Slide Indicators dengan Modern Design */}
      <div className="absolute bottom-8 right-8 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white shadow-lg'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator - Hidden on Mobile */}
      <motion.div
        className="absolute bottom-8 left-8 z-20 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
