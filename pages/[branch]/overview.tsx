import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getBranchSEOData } from '../../lib/seo';
import { getProducts, getCategories, getBranchInfo } from '../../lib/supabase';
import type { Branch, Product, Category } from '../../lib/supabase';

interface OverviewPageProps {
  branch: Branch;
  products: Product[];
  categories: Category[];
  branchInfo: any;
  seoData: any;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ 
  branch, 
  products, 
  seoData 
}) => {
  // Group products by category and sort by price (highest to lowest)
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || 'Lainnya';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Sort products in each category by price (highest to lowest)
  Object.keys(groupedProducts).forEach(category => {
    groupedProducts[category].sort((a, b) => {
      const priceA = a.is_minuman ? (a.price_large || a.price_regular || a.price) : a.price;
      const priceB = b.is_minuman ? (b.price_large || b.price_regular || b.price) : b.price;
      return priceB - priceA; // Highest to lowest
    });
  });

  // Define category priority order
  const categoryPriority = [
    'Jus Buah & Sayur',
    'Rekomendasi Mix Jus',
    'Kocok',
    'Baby',
    'Non-Jus',
    'Teh',
    'Cemilan'
  ];

  // Sort categories by priority, then alphabetically for others
  const sortedCategories = Object.keys(groupedProducts).sort((a, b) => {
    const aIndex = categoryPriority.indexOf(a);
    const bIndex = categoryPriority.indexOf(b);
    
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) {
      return -1;
    }
    if (bIndex !== -1) {
      return 1;
    }
    return a.localeCompare(b);
  });

  return (
    <>
      <Head>
        <title>{seoData.title} - Overview</title>
        <meta name="description" content={`Overview lengkap menu ${branch} - ${seoData.description}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
         <style jsx global>{`
           body {
             overflow: auto !important;
             max-height: 130vh !important;
             -webkit-text-size-adjust: none !important;
             text-size-adjust: none !important;
           }
           html {
             overflow: auto !important;
             max-height: 130vh !important;
             -webkit-text-size-adjust: none !important;
             text-size-adjust: none !important;
           }
           #__next {
             min-height: 100vh !important;
             max-height: 130vh !important;
           }
           .scrollbar-hide {
             -ms-overflow-style: none;
             scrollbar-width: none;
           }
           .scrollbar-hide::-webkit-scrollbar {
             display: none;
           }
           .text-small {
             font-size: 0.75rem !important;
             line-height: 1rem !important;
           }
           .text-xs {
             font-size: 0.625rem !important;
             line-height: 0.875rem !important;
           }
           .text-xxs {
             font-size: 0.5rem !important;
             line-height: 0.625rem !important;
           }
           .text-micro {
             font-size: 0.375rem !important;
             line-height: 0.5rem !important;
           }
           .text-nano {
             font-size: 10px !important;
             line-height: 12px !important;
             -webkit-text-size-adjust: none !important;
             text-size-adjust: none !important;
           }
           .text-pico {
             font-size: 8px !important;
             line-height: 10px !important;
             -webkit-text-size-adjust: none !important;
             text-size-adjust: none !important;
           }
         `}</style>
      </Head>

       <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex flex-col">
         {/* Header dengan tombol back */}
         <div className="flex-shrink-0 bg-gradient-to-r from-pink-100 to-rose-100 border-b border-pink-200 shadow-sm relative overflow-hidden">
           {/* Decorative background pattern */}
           <div className="absolute inset-0 opacity-5">
             <div className="absolute top-2 left-4 w-2 h-2 bg-pink-400 rounded-full"></div>
             <div className="absolute top-4 right-8 w-1 h-1 bg-rose-400 rounded-full"></div>
             <div className="absolute bottom-2 left-12 w-1.5 h-1.5 bg-pink-300 rounded-full"></div>
             <div className="absolute bottom-4 right-4 w-1 h-1 bg-rose-300 rounded-full"></div>
           </div>
           
           <div className="flex items-center justify-between px-4 py-3 relative z-10">
             <Link href={`/${branch}/menu`}>
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="flex items-center justify-center text-pink-700 hover:text-pink-800 transition-all duration-200 hover:bg-pink-200/30 w-10 h-10 rounded-full"
               >
                 <ArrowLeft className="w-5 h-5" />
               </motion.button>
             </Link>
             
             <div className="absolute left-1/2 transform -translate-x-1/2">
               <h1 className="text-lg font-black text-pink-800 font-rounded">
                 Menu Lengkap
               </h1>
             </div>
             
             <div className="w-10 h-10"></div> {/* Spacer untuk centering */}
           </div>
         </div>

         {/* Content - Scrollable dengan maksimal 130% tinggi layar */}
         <div className="flex-1 px-2 py-4">
           <div className="grid grid-cols-2 gap-4">
          {sortedCategories.map((category, categoryIndex) => {
            const products = groupedProducts[category];
            return (
               <motion.div
                 key={category}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                 className="bg-white rounded-lg border border-pink-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
               >
                 {/* Category Header */}
                 <div className="bg-gradient-to-r from-pink-100 to-rose-100 px-2 py-1.5 border-b border-pink-200 relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 to-rose-200/20"></div>
                   <h2 className="text-xs font-black text-pink-800 font-display relative z-10">
                     {category}
                   </h2>
                 </div>
                 
                 {/* Products List */}
                 <div className="max-h-80 overflow-y-auto scrollbar-hide">
                   {products.map((product, index) => (
                     <motion.div
                       key={product.id}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.2, delay: (categoryIndex * 0.1) + (index * 0.02) }}
                       className="px-1 py-0.5 hover:bg-pink-50 transition-all duration-200 border-b border-pink-100 last:border-b-0 group h-6 flex items-center"
                     >
                       <div className="flex items-center justify-between w-full">
                         {/* Product Name */}
                         <div className="flex-1 min-w-0 mr-1">
                           <h3 className="text-nano font-semibold text-pink-900 font-display group-hover:text-pink-800 transition-colors duration-200 truncate" style={{fontSize: '10px', lineHeight: '12px'}}>
                             {product.name}
                           </h3>
                         </div>
                         
                         {/* Price */}
                         <div className="text-right flex-shrink-0">
                           {product.is_minuman ? (
                             <div className="text-right">
                               <div className="text-pico font-bold text-pink-600 font-display group-hover:text-pink-700 transition-colors duration-200" style={{fontSize: '8px', lineHeight: '10px'}}>
                                 R: Rp{(product.price_regular || product.price).toLocaleString('id-ID')}
                               </div>
                               <div className="text-pico text-pink-500 group-hover:text-pink-600 transition-colors duration-200" style={{fontSize: '8px', lineHeight: '10px'}}>
                                 L: Rp{(product.price_large || product.price).toLocaleString('id-ID')}
                               </div>
                             </div>
                           ) : (
                             <div className="text-pico font-bold text-pink-600 font-display group-hover:text-pink-700 transition-colors duration-200" style={{fontSize: '8px', lineHeight: '10px'}}>
                               Rp{product.price.toLocaleString('id-ID')}
                             </div>
                           )}
                         </div>
                       </div>
                     </motion.div>
                   ))}
                 </div>
               </motion.div>
            );
          })}
          </div>
        </div>

      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { branch: 'berau' } },
      { params: { branch: 'samarinda' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const branch = params?.branch as Branch;

  try {
    // Fetch data from Supabase
    const [products, categories, branchInfo] = await Promise.all([
      getProducts(branch),
      getCategories(branch),
      getBranchInfo(branch)
    ]);

    // Fallback data if Supabase fails
    const fallbackProducts: Product[] = [
      {
        id: 'fallback-1',
        name: 'Jus Alpukat Segar',
        kategori_id: null,
        price: 15000,
        gambar: '/images/juice-placeholder.svg',
        created_at: new Date().toISOString(),
        tipe: 'premium',
        ekstra_ids: null,
        category: 'Jus Alpukat',
        description: 'Jus alpukat segar dengan kualitas terbaik',
        image_url: '/images/juice-placeholder.svg',
        is_featured: true,
        rating: 4.8,
        review_count: 120,
        is_minuman: true,
        price_regular: 15000,
        price_large: 18000
      }
    ];

    const fallbackCategories: Category[] = [
      { 
        id: 'fallback-1', 
        name: 'Jus Alpukat',
        description: 'Koleksi Jus Alpukat segar',
        image_url: '/images/juice-placeholder.svg',
        sort_order: 1,
        is_active: true
      }
    ];

    const fallbackBranchInfo = {
      id: 'fallback',
      name: branch.charAt(0).toUpperCase() + branch.slice(1),
      address: `Jl. Contoh No. 123, ${branch.charAt(0).toUpperCase() + branch.slice(1)}`,
      phone: '+62812-3456-7890',
      whatsapp: '+62812-3456-7890',
      latitude: 0,
      longitude: 0,
      is_active: true,
      delivery_radius: 10
    };

    return {
      props: {
        branch,
        products: products.length > 0 ? products : fallbackProducts,
        categories: categories.length > 0 ? categories : fallbackCategories,
        branchInfo: branchInfo || fallbackBranchInfo,
        seoData: getBranchSEOData(branch),
      },
      revalidate: 60,
    };
  } catch (error) {
    // Error fetching data from Supabase
    const fallbackProducts: Product[] = [
      {
        id: 'error-1',
        name: 'Jus Alpukat Segar',
        kategori_id: null,
        price: 15000,
        gambar: '/images/juice-placeholder.svg',
        created_at: new Date().toISOString(),
        tipe: 'premium',
        ekstra_ids: null,
        category: 'Jus Alpukat',
        description: 'Jus alpukat segar dengan kualitas terbaik',
        image_url: '/images/juice-placeholder.svg',
        is_featured: true,
        rating: 4.8,
        review_count: 120,
        is_minuman: true,
        price_regular: 15000,
        price_large: 18000
      }
    ];

    const fallbackCategories: Category[] = [
      { 
        id: 'error-1', 
        name: 'Jus Alpukat',
        description: 'Koleksi Jus Alpukat segar',
        image_url: '/images/juice-placeholder.svg',
        sort_order: 1,
        is_active: true
      }
    ];

    const fallbackBranchInfo = {
      id: 'error',
      name: branch.charAt(0).toUpperCase() + branch.slice(1),
      address: `Jl. Contoh No. 123, ${branch.charAt(0).toUpperCase() + branch.slice(1)}`,
      phone: '+62812-3456-7890',
      whatsapp: '+62812-3456-7890',
      latitude: 0,
      longitude: 0,
      is_active: true,
      delivery_radius: 10
    };

    return {
      props: {
        branch,
        products: fallbackProducts,
        categories: fallbackCategories,
        branchInfo: fallbackBranchInfo,
        seoData: getBranchSEOData(branch),
      },
      revalidate: 60,
    };
  }
};

export default OverviewPage;
