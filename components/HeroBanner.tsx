'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Image from 'next/image';

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
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background Image */}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-2xl sm:text-3xl font-bold text-white/90 mb-2"
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.h2>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={heroSlides[currentSlide].ctaLink}
                      className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-strong transition-all duration-300 text-center"
                    >
                      {heroSlides[currentSlide].ctaText}
                    </motion.a>
                    
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`https://wa.me/6281234567890`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-center"
                    >
                      Order via WhatsApp
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Image Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
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
