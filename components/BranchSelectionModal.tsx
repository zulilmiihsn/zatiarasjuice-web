import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, X, Phone, Clock } from 'lucide-react';

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
  const branches = [
    {
      id: 'berau' as const,
      name: 'Berau',
      address: 'Jl. Ahmad Yani No. 123, Berau, Kalimantan Timur',
      phone: '+62812-3456-7890',
      hours: '08:00 - 22:00 WITA',
      description: 'Cabang utama di Berau',
      gradient: 'from-emerald-500 to-teal-600',
      backgroundImage: '/images/city-berau.jpg'
    },
    {
      id: 'samarinda' as const,
      name: 'Samarinda',
      address: 'Jl. Sudirman No. 456, Samarinda, Kalimantan Timur',
      phone: '+62812-3456-7891',
      hours: '08:00 - 22:00 WITA',
      description: 'Cabang utama di Samarinda',
      gradient: 'from-blue-500 to-indigo-600',
      backgroundImage: '/images/city-samarinda.jpg'
    }
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
          onClick={onClose}
      data-testid="branch-modal-overlay"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-premium overflow-hidden"
            style={{
              maxWidth: '640px',
              minHeight: '600px'
            }}
            onClick={(e) => e.stopPropagation()}
            data-testid="branch-modal-content"
          >
            <div className="relative bg-gradient-to-br from-primary-500 via-pinky-500 to-primary-600 p-8 text-white">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
              
              <div className="text-center pr-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                  <MapPin className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black mb-3 font-rounded text-white">
                  Pilih Cabang Terdekat
                </h2>
                <p className="text-white/90 text-lg leading-relaxed max-w-md mx-auto">
                  Lokasi Anda tidak terdeteksi. Silakan pilih cabang yang paling dekat dengan Anda.
                </p>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {branches.map((branch, index) => (
                  <motion.button
                    key={branch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -8,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectBranch(branch.id)}
                    className="group relative bg-white border border-gray-100 rounded-2xl p-0 text-left hover:border-primary-200 transition-all duration-500 overflow-hidden shadow-elegant hover:shadow-floating"
                  >
                    <div className="relative h-36 w-full overflow-hidden rounded-t-2xl">
                      <Image
                        src={branch.backgroundImage}
                        alt={`View ${branch.name}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm"
                          style={{
                            background: branch.id === 'berau' 
                              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                              : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                          }}
                        >
                          <MapPin className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-black text-white font-rounded drop-shadow-lg">
                        {branch.name}
                      </h3>
                        <p className="text-white/90 text-sm font-medium">
                        {branch.description}
                      </p>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MapPin className="w-4 h-4 text-primary-600" />
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed font-medium">{branch.address}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-secondary-600" />
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{branch.phone}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-4 h-4 text-accent-600" />
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{branch.hours}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div 
                          className="w-full flex items-center justify-center gap-2 px-6 py-4 text-white rounded-xl text-sm font-bold group-hover:shadow-lg transition-all duration-300"
                          style={{
                            background: branch.id === 'berau' 
                              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                              : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                          }}
                        >
                          <MapPin className="w-4 h-4" />
                          <span>Pilih Cabang {branch.name}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="px-8 py-6 text-center bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                <span className="font-medium">Pilihan ini akan disimpan untuk kunjungan selanjutnya</span>
              </div>
            </div>
          </motion.div>
        </div>
  );
};

export default BranchSelectionModal;
