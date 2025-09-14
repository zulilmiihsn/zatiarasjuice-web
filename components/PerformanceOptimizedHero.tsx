'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
import GlassCard from './GlassCard';
import MorphingText from './MorphingText';
import { OptimizedFloatingElements } from './OptimizedFloatingElements';

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

interface PerformanceOptimizedHeroProps {
  branch?: 'berau' | 'samarinda';
  slides?: HeroSlide[];
}

const PerformanceOptimizedHero: React.FC<PerformanceOptimizedHeroProps> = ({ branch, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Default slides jika tidak ada props
  const defaultSlides: HeroSlide[] = [
    {
      id: '1',
      title: 'Jus Alpukat Segar',
      subtitle: '100% Alami',
      description: 'Nikmati kesegaran jus alpukat premium yang dibuat dari buah pilihan terbaik, tanpa pengawet dan bahan kimia.',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=1200&h=800&fit=crop',
      ctaText: 'Pesan Sekarang',
      ctaLink: `/${branch || 'berau'}/menu`,
      bgGradient: 'from-green-400 to-pink-400',
    },
    {
      id: '2',
      title: 'Jus Buah Mix',
      subtitle: 'Kombinasi Sempurna',
      description: 'Perpaduan sempurna antara berbagai buah segar yang memberikan cita rasa unik dan menyehatkan.',
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=1200&h=800&fit=crop',
      ctaText: 'Lihat Menu',
      ctaLink: `/${branch || 'berau'}/menu`,
      bgGradient: 'from-pink-400 to-purple-400',
    },
    {
      id: '3',
      title: 'Jus Detox',
      subtitle: 'Sehat & Segar',
      description: 'Detoksifikasi tubuh dengan jus buah segar yang kaya vitamin dan mineral untuk kesehatan optimal.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop',
      ctaText: 'Order via WhatsApp',
      ctaLink: 'https://wa.me/6281234567890',
      bgGradient: 'from-blue-400 to-green-400',
    },
  ];

  const heroSlides = slides || defaultSlides;

  // Auto-play slideshow
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Increased from 5000 to 6000 for better UX

    return () => clearInterval(interval);
  }, [isPlaying, heroSlides.length]);

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

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isLoaded) {
    return (
      <div className="h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Memuat...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden pt-16 sm:pt-20 lg:pt-0">
      {/* Optimized Floating Elements - Much lighter */}
      <OptimizedFloatingElements count={2} className="absolute inset-0 pointer-events-none">
        <div className="w-3 h-3 bg-white/10 rounded-full" />
      </OptimizedFloatingElements>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background Image - Simplified */}
          <div className="absolute inset-0">
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgGradient} opacity-80`} />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Content with Glass Effect */}
                <GlassCard
                  variant="crystal"
                  intensity="high"
                  className="text-white p-4 sm:p-6 lg:p-8 backdrop-blur-xl"
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
                        duration={3000}
                        variant="fade"
                        className="text-2xl sm:text-3xl font-bold text-white/90"
                      />
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent"
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
                      className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-lg"
                    >
                      {heroSlides[currentSlide].description}
                    </motion.p>
                  
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    >
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={heroSlides[currentSlide].ctaLink}
                        className="relative group bg-gradient-to-r from-white to-yellow-100 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold overflow-hidden text-center"
                        style={{
                          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{heroSlides[currentSlide].ctaText}</span>
                        </span>
                      </motion.a>
                      
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={`https://wa.me/6281234567890`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group border-2 border-white/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold overflow-hidden backdrop-blur-sm text-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        }}
                      >
                        <span className="relative z-10">Order via WhatsApp</span>
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </GlassCard>

                {/* Image Content - Simplified */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative hidden lg:block"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <Image
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      width={600}
                      height={400}
                      className="rounded-3xl shadow-2xl"
                      priority
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Simplified */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 sm:space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlayPause}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
        >
          {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      {/* Slide Indicators - Simplified */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex space-x-2">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PerformanceOptimizedHero;
