import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary-500 to-pinky-500 p-6 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <h2 className="text-2xl font-black mb-2">Pilih Cabang Terdekat</h2>
                <p className="text-white/90">
                  Lokasi Anda tidak terdeteksi. Silakan pilih cabang yang paling dekat dengan Anda.
                </p>
              </div>
            </div>

            {/* Branch Options */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {branches.map((branch, index) => (
                  <motion.button
                    key={branch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectBranch(branch.id)}
                    className="group relative bg-white border-2 border-gray-100 rounded-2xl p-0 text-left hover:border-primary-200 transition-all duration-300 overflow-hidden"
                  >
                    {/* City Background Image */}
                    <div className="relative h-32 w-full overflow-hidden">
                      <Image
                        src={branch.backgroundImage}
                        alt={`View ${branch.name}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className={`w-10 h-10 bg-gradient-to-r ${branch.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-10 p-6">

                      {/* Branch Info */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {branch.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {branch.description}
                      </p>

                      {/* Branch Details */}
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{branch.address}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{branch.phone}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{branch.hours}</span>
                        </div>
                      </div>

                      {/* Select Button */}
                      <div className="mt-4">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${branch.gradient} text-white rounded-lg text-sm font-semibold group-hover:shadow-lg transition-all duration-300`}>
                          <span>Pilih Cabang {branch.name}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 text-center">
              <p className="text-sm text-gray-600">
                Pilihan ini akan disimpan untuk kunjungan selanjutnya
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BranchSelectionModal;
