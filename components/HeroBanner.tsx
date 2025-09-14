'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
import GlassCard from './GlassCard';
import MorphingText from './MorphingText';
import ParallaxSection from './ParallaxSection';
import { FloatingElements } from './FloatingElements';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
}

interface HeroBannerProps {
  branch?: 'berau' | 'samarinda';
  slides?: HeroSlide[];
}

const HeroBanner: React.FC<HeroBannerProps> = ({ branch, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();

  // Default slides jika tidak ada props
  const defaultSlides: HeroSlide[] = [
    {
      id: '1',
      title: 'Jus Alpukat Segar',
      subtitle: 'Zatiaras Juice',
      description: 'Nikmati kesegaran jus alpukat premium dengan kualitas terbaik. Dibuat dari buah alpukat pilihan yang segar dan berkualitas tinggi.',
      image: '/images/hero-avocado.jpg',
      ctaText: 'Lihat Menu',
      ctaLink: branch ? `/${branch}/menu` : '/menu',
      bgGradient: 'from-green-400 via-green-500 to-green-600',
    },
    {
      id: '2',
      title: 'Aneka Jus Buah',
      subtitle: 'Segar & Menyehatkan',
      description: 'Koleksi lengkap jus buah segar dengan berbagai varian rasa yang menggugah selera. Dari mangga, jeruk, hingga buah musiman.',
      image: '/images/hero-fruits.jpg',
      ctaText: 'Order Sekarang',
      ctaLink: branch ? `/${branch}/menu` : '/menu',
      bgGradient: 'from-pink-400 via-pink-500 to-pink-600',
    },
    {
      id: '3',
      title: 'Menu Musiman',
      subtitle: 'Rasa Terbaru',
      description: 'Temukan menu terbaru dan promosi spesial setiap bulannya. Jangan lewatkan kesempatan mencoba varian baru yang lezat.',
      image: '/images/hero-seasonal.jpg',
      ctaText: 'Cek Promo',
      ctaLink: branch ? `/${branch}/menu` : '/menu',
      bgGradient: 'from-purple-400 via-purple-500 to-purple-600',
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

  // Mouse tracking for 3D effects - throttled for performance
  useEffect(() => {
    let lastTime = 0;
    const throttleDelay = 16; // ~60fps max

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      
      lastTime = now;
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Preload images
  useEffect(() => {
    const preloadImages = heroSlides.map((slide) => {
      const img = new window.Image();
      img.src = slide.image;
      return img;
    });

    Promise.all(preloadImages.map(img => new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
    }))).then(() => {
      setIsLoaded(true);
    });
  }, [heroSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isLoaded) {
    return (
      <div className="h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden pt-16 sm:pt-20 lg:pt-0">
      {/* Floating Elements Background - Reduced count for performance */}
      <FloatingElements count={3} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="w-3 h-3 bg-white/15 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </FloatingElements>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1, rotateY: 15 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background Image with Parallax */}
          <ParallaxSection speed={0.5} direction="up" className="absolute inset-0">
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgGradient} opacity-80`} />
            
            {/* Animated Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </ParallaxSection>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              {/* Mobile Layout: Image as background, Glassmorphism overlay */}
              <div className="lg:hidden relative h-full flex items-center justify-center">
                {/* Mobile Background Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Mobile Glassmorphism Overlay */}
                <GlassCard
                  variant="crystal"
                  intensity="high"
                  className="relative z-10 text-white p-6 backdrop-blur-xl mx-4 max-w-sm"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex items-center space-x-2 mb-3"
                    >
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <MorphingText
                        texts={[
                          heroSlides[currentSlide].subtitle,
                          "Jus Segar Berkualitas",
                          "100% Alami",
                          "Tanpa Pengawet"
                        ]}
                        duration={2000}
                        variant="fade"
                        className="text-lg font-bold text-white/90"
                      />
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="text-2xl sm:text-3xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent"
                      style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      {heroSlides[currentSlide].title}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      className="text-sm sm:text-base text-white/90 mb-6 leading-relaxed"
                    >
                      {heroSlides[currentSlide].description}
                    </motion.p>
                  
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="flex flex-col gap-3"
                    >
                      <motion.a
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                          y: -2
                        }}
                        whileTap={{ scale: 0.95 }}
                        href={heroSlides[currentSlide].ctaLink}
                        className="relative group bg-gradient-to-r from-white to-yellow-100 text-gray-900 px-6 py-3 rounded-full text-base font-semibold overflow-hidden"
                        style={{
                          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>{heroSlides[currentSlide].ctaText}</span>
                        </span>
                      </motion.a>
                      
                      <motion.a
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                          y: -2
                        }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://wa.me/6281234567890`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group border-2 border-white/50 text-white px-6 py-3 rounded-full text-base font-semibold overflow-hidden backdrop-blur-sm"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />
                        <span className="relative z-10">Order via WhatsApp</span>
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </GlassCard>
              </div>

              {/* Desktop Layout: Side by side */}
              <div className="hidden lg:grid grid-cols-2 gap-12 items-center">
                {/* Text Content with Glass Effect */}
                <GlassCard
                  variant="crystal"
                  intensity="high"
                  className="text-white p-8 backdrop-blur-xl"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="flex items-center space-x-2 mb-4"
                    >
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                      <MorphingText
                        texts={[
                          heroSlides[currentSlide].subtitle,
                          "Jus Segar Berkualitas",
                          "100% Alami",
                          "Tanpa Pengawet"
                        ]}
                        duration={2000}
                        variant="fade"
                        className="text-2xl sm:text-3xl font-bold text-white/90"
                      />
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent"
                      style={{
                        textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      {heroSlides[currentSlide].title}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-lg"
                    >
                      {heroSlides[currentSlide].description}
                    </motion.p>
                  
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <motion.a
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                          y: -2
                        }}
                        whileTap={{ scale: 0.95 }}
                        href={heroSlides[currentSlide].ctaLink}
                        className="relative group bg-gradient-to-r from-white to-yellow-100 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold overflow-hidden"
                        style={{
                          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />
                        <span className="relative z-10 flex items-center space-x-2">
                          <Zap className="w-5 h-5" />
                          <span>{heroSlides[currentSlide].ctaText}</span>
                        </span>
                      </motion.a>
                      
                      <motion.a
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                          y: -2
                        }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://wa.me/6281234567890`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group border-2 border-white/50 text-white px-8 py-4 rounded-full text-lg font-semibold overflow-hidden backdrop-blur-sm"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />
                        <span className="relative z-10">Order via WhatsApp</span>
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </GlassCard>

                {/* Image Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative transform translate-y-8"
                >
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <Image
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      width={600}
                      height={600}
                      className="object-contain"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlayPause}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </motion.button>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-8 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
