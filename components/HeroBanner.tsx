import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Menu } from 'lucide-react';
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

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

interface HeroBannerProps {
  branch?: 'berau' | 'samarinda' | null;
  slides?: HeroSlide[];
  // eslint-disable-next-line no-unused-vars
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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"], { clamp: true });
  const glassmorphismY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"], { clamp: true });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"], { clamp: true });
  const floatingElementsY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"], { clamp: true });
  
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 3], { clamp: true });
  const glassmorphismRotate = useTransform(scrollYProgress, [0, 1], [0, -2], { clamp: true });
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 1.5], { clamp: true });
  const floatingElementsRotate = useTransform(scrollYProgress, [0, 1], [0, 6], { clamp: true });

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

  const defaultSlides: HeroSlide[] = useMemo(() => [
    {
      id: '1',
      title: `Jus Terenak di ${branch ? branch.charAt(0).toUpperCase() + branch.slice(1) : 'Berau & Samarinda'}`,
      subtitle: 'Zatiaras Juice - Pilihan #1',
      description: 'Dibuat dari buah alpukat pilihan terbaik, tanpa pengawet, Semua bahan alami. Lebih dari 500+ pelanggan puas setiap bulan. Rating 4.9/5 dari 500+ review.',
      image: '/images/hero-avocado-juice.png?v=20250926',
      ctaText: 'Lihat Menu',
      ctaLink: branch ? `/${branch}/menu` : '/menu',
      gradient: 'from-green-400 via-emerald-500 to-teal-600',
    },
    {
      id: '2',
      title: 'Jus Mangga Terbaik di Kota',
      subtitle: 'Zatiaras Juice - Fresh tiap hari',
      description: 'Dibuat fresh setiap hari dengan buah pilihan terbaik. Order via WhatsApp atau GoFood? Kami siap',
      image: '/images/hero-mango-juice.png?v=20250926',
      ctaText: 'Lihat Menu',
      ctaLink: branch ? `/${branch}/menu` : '/menu',
      gradient: 'from-orange-400 via-amber-500 to-yellow-500',
    },
    {
      id: '3',
      title: `Alpukat Kocok #1 di ${branch ? branch.charAt(0).toUpperCase() + branch.slice(1) : 'Kaltim'}`,
      subtitle: 'Zatiaras Juice - Kualitas Premium',
      description: `Resep hasil riset panjang, trial dan error Alpukat, susu segar, coklat Milo manis. Lebih dari 3 tahun melayani ${branch ? branch.charAt(0).toUpperCase() + branch.slice(1) : 'Berau & Samarinda'} dengan kualitas konsisten.`,
      image: '/images/hero-avocado-shake.png?v=20250926',
      ctaText: 'Lihat Menu',
      ctaLink: branch ? `/${branch}/menu` : '/menu',
      gradient: 'from-green-600 via-emerald-700 to-teal-800',
    },
  ], [branch]);

  const heroSlides = slides || defaultSlides;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, heroSlides.length]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let animationFrameId: number | null = null;
    let lastTime = 0;
    const throttleDelay = 16;
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      
      if (now - lastTime >= throttleDelay) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        
        animationFrameId = requestAnimationFrame(() => {
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseXValue = (e.clientX - centerX) / 40;
            const mouseYValue = (e.clientY - centerY) / 40;
      
            mouseX.set(mouseXValue);
            mouseY.set(mouseYValue);
          }
          lastTime = now;
          animationFrameId = null;
        });
      }
    };

    if (typeof window !== 'undefined' && 
        window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
        !window.matchMedia('(hover: none)').matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
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
        
        <motion.div 
          className="absolute inset-0 overflow-hidden silky-smooth fps-60"
          style={{ 
            y: floatingElementsY,
            willChange: 'transform',
            contain: 'layout style paint'
          }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute silky-smooth fps-60"
              style={{
                left: `${(i * 25) % 100}%`,
                top: `${(i * 25) % 100}%`,
                willChange: 'transform, opacity',
                contain: 'layout style paint',
                transform: 'translateZ(0)', // Force GPU acceleration
              }}
              animate={{
                x: [0, 15, 0],
                y: [0, 10, 0],
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 12 + i * 2, // Longer duration for smoother animation
                repeat: Infinity,
                ease: 'linear', // Linear easing for smoother performance
                repeatType: 'loop',
              }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r from-white/15 to-white/5 rounded-full blur-lg`} />
            </motion.div>
          ))}
          
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`geo-${i}`}
              className="absolute silky-smooth fps-60"
              style={{
                left: `${(i * 33.33) % 100}%`,
                top: `${(i * 40) % 100}%`,
                y: floatingElementsY,
                rotate: floatingElementsRotate,
                willChange: 'transform',
                contain: 'layout style paint',
                transform: 'translateZ(0)', // Force GPU acceleration
              }}
              animate={{
                x: [0, 15, 0],
                y: [0, 10, 0],
                rotate: [0, 60, 120, 180],
                scale: [0.9, 1.05, 0.9],
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
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 12,
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
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 14,
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
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 120, 240, 360],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'linear', // Linear easing for smoother performance
              repeatType: 'loop',
            }}
          />
        </div>
      </motion.div>

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
                        <Menu className="w-6 h-6" />
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
                        <Menu className="w-6 h-6" />
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
                      <WhatsAppIcon className="w-6 h-6" />
                      <span>Order via WhatsApp</span>
                    </span>
                  </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

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
            <motion.div
              className="hero-image-container relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
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
                className="hero-image object-cover transition-transform duration-500"
                priority
                quality={100}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                onLoad={() => {
                  // Force re-render untuk memastikan gambar ter-load dengan kualitas maksimal
                  if (typeof window !== 'undefined') {
                    const img = document.querySelector(`img[alt="${heroSlides[currentSlide].title}"]`) as HTMLImageElement;
                    if (img) {
                      img.style.imageRendering = 'high-quality';
                      img.style.imageRendering = '-webkit-optimize-contrast';
                      img.style.imageRendering = 'crisp-edges';
                      img.classList.add('hero-image');
                      // Force repaint untuk memastikan filter diterapkan
                      img.style.transform = 'translateZ(0)';
                      img.style.backfaceVisibility = 'hidden';
                    }
                  }
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>

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