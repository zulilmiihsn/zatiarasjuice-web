import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Phone, Clock, Sparkles, Star, Navigation } from 'lucide-react';

interface BranchSelectionModalProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelectBranch: (branch: 'berau' | 'samarinda') => void;
  onClose: () => void;
}

const BranchSelectionModal: React.FC<BranchSelectionModalProps> = ({
  isOpen,
  onSelectBranch,
  onClose
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const lastButtonRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'Tab':
          if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstButtonRef.current) {
              event.preventDefault();
              lastButtonRef.current?.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastButtonRef.current) {
              event.preventDefault();
              firstButtonRef.current?.focus();
            }
          }
          break;
        case 'Enter':
        case ' ':
          if (document.activeElement?.getAttribute('data-branch-id')) {
            event.preventDefault();
            const branchId = document.activeElement.getAttribute('data-branch-id') as 'berau' | 'samarinda';
            onSelectBranch(branchId);
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first button when modal opens
      setTimeout(() => {
        firstButtonRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onSelectBranch]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const branches = [
    {
      id: 'berau' as const,
      name: 'Berau',
      address: 'Jl. Merah Delima depan Klinik Berlian Bakti, Berau, Kalimantan Timur',
      phone: '+62813-4988-2015',
      hours: '08:00 - 22:00 WITA',
      description: 'Cabang utama di Berau',
      rating: '4.9',
      reviews: '500+',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      backgroundImage: '/images/city-berau.jpg',
      accentColor: 'emerald',
      features: []
    },
    {
      id: 'samarinda' as const,
      name: 'Samarinda',
      address: 'Jl. Juanda Samping Ami Ali Parfum, Samarinda, Kalimantan Timur',
      phone: '+62813-5007-6071',
      hours: '08:00 - 22:00 WITA',
      description: 'Cabang utama di Samarinda',
      rating: '4.9',
      reviews: '500+',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      backgroundImage: '/images/city-samarinda.jpg',
      accentColor: 'blue',
      features: []
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
          onClick={onClose}
          data-testid="branch-modal-overlay"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ 
              type: "spring", 
              duration: 0.6,
              bounce: 0.1
            }}
            ref={modalRef}
            className="relative w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20 mx-4 sm:mx-6 lg:mx-8"
            style={{
              maxWidth: '1000px',
              maxHeight: '90vh',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
            data-testid="branch-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Header Section - Compact Design */}
            <div className="relative bg-gradient-to-br from-primary-500/90 via-pinky-500/90 to-primary-600/90 backdrop-blur-xl p-4 sm:p-6 text-white overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, 20, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-20 h-20 bg-white/15 rounded-full blur-xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.7, 0.4],
                    x: [0, -15, 0],
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                />
              </div>

              
              <div className="text-center relative z-10">
                <motion.div 
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
                  </motion.div>
                </motion.div>
                
                <motion.h2 
                  id="modal-title"
                  className="text-xl sm:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 font-rounded text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Pilih Cabang Terdekat
                </motion.h2>
                
                <motion.p 
                  id="modal-description"
                  className="text-white/90 text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-medium px-2 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Lokasi Anda tidak terdeteksi. Silakan pilih cabang yang paling dekat dengan Anda untuk pengalaman terbaik.
                </motion.p>
              </div>
            </div>

            {/* Content Section - Mobile Optimized Layout */}
            <div className="p-2 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50/50 via-white/80 to-gray-50/50 backdrop-blur-sm overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                {branches.map((branch, index) => (
                  <motion.button
                    key={branch.id}
                    ref={index === 0 ? firstButtonRef : index === branches.length - 1 ? lastButtonRef : null}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.01,
                      y: -4,
                      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectBranch(branch.id)}
                    className="group relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-xl sm:rounded-2xl p-0 text-left hover:border-primary-200/50 transition-all duration-500 overflow-hidden shadow-elegant hover:shadow-floating focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-transparent"
                    style={{
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                    data-branch-id={branch.id}
                    aria-label={`Pilih cabang ${branch.name} di ${branch.address}`}
                  >
                    {/* Image Section */}
                    <div className="relative h-32 sm:h-36 w-full overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                      <Image
                        src={branch.backgroundImage}
                        alt={`View ${branch.name}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Rating Badge */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 py-1 border border-white/20">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-bold text-gray-900">{branch.rating}</span>
                          <span className="text-xs text-gray-600 hidden sm:inline">({branch.reviews})</span>
                        </div>
                      </div>
                      
                      {/* Location Icon */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <div 
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20"
                          style={{
                            background: branch.id === 'berau' 
                              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                              : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                          }}
                        >
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>
                      
                      {/* Branch Name */}
                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                        <h3 className="text-lg sm:text-xl font-black text-white font-rounded drop-shadow-lg mb-1">
                          {branch.name}
                        </h3>
                        <p className="text-white/90 text-xs font-semibold">
                          {branch.description}
                        </p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-2 sm:p-4">

                      {/* Details */}
                      <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary-200">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                          </div>
                          <span className="text-xs text-gray-700 leading-relaxed font-medium pt-1">{branch.address}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-secondary-200">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-600" />
                          </div>
                          <span className="text-xs text-gray-700 font-medium">{branch.phone}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-accent-200">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-accent-600" />
                          </div>
                          <span className="text-xs text-gray-700 font-medium">{branch.hours}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-2 sm:mt-3">
                        <motion.div 
                          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold group-hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                          style={{
                            background: branch.id === 'berau' 
                              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                              : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={false}
                          />
                          <Navigation className="w-3 h-3 sm:w-4 sm:h-4 relative z-10" />
                          <span className="relative z-10">Pilih Cabang {branch.name}</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-center bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm border-t border-gray-200/50">
              <motion.div 
                className="flex items-center justify-center gap-2 text-xs text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-primary-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-semibold">Pilihan ini akan disimpan untuk kunjungan selanjutnya</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BranchSelectionModal;
