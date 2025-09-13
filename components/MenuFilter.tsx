'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';

interface MenuFilterProps {
  categories: Array<{
    id: string;
    name: string;
    count?: number;
  }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const MenuFilter: React.FC<MenuFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className = '',
}) => {
  const allCategories = [
    { id: 'all', name: 'Semua', count: categories.reduce((sum, cat) => sum + (cat.count || 0), 0) },
    ...categories,
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-soft p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Kategori</h3>
        </div>
        {selectedCategory !== 'all' && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onCategoryChange('all')}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {allCategories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-primary-500 text-white shadow-glow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.name}</span>
            {category.count !== undefined && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {category.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Active Filter Display */}
      {selectedCategory !== 'all' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Menampilkan:</span>
            <span className="text-sm font-medium text-primary-600">
              {categories.find(cat => cat.id === selectedCategory)?.name || 'Semua'}
            </span>
            <span className="text-sm text-gray-500">
              ({categories.find(cat => cat.id === selectedCategory)?.count || 0} produk)
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MenuFilter;
