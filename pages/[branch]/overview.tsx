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
        <title>{`${seoData.title} - Overview`}</title>
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

       <motion.div 
         className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex flex-col relative overflow-hidden"
         animate={{
           background: [
             'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fdf2f8 100%)',
             'linear-gradient(135deg, #fce7f3 0%, #fdf2f8 50%, #fce7f3 100%)',
             'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fdf2f8 100%)'
           ]
         }}
         transition={{
           duration: 8,
           repeat: Infinity,
           ease: "easeInOut"
         }}
       >
         {/* Animated Background Elements - Minimal for header area only */}
         <div className="absolute inset-0 pointer-events-none">
           {/* Only 2 elements in header area */}
           <motion.div
             className="absolute top-[15vh] left-1/2 w-3 h-3 bg-pink-300 rounded-full opacity-50 shadow-md"
             animate={{
               y: [0, -15, 0],
               x: [0, 10, 0],
               scale: [1, 1.2, 1],
               rotate: [0, 90, 180, 270, 360]
             }}
             transition={{
               duration: 4,
               repeat: Infinity,
               ease: "easeInOut",
               delay: 0.5
             }}
           />
           <motion.div
             className="absolute top-[20vh] right-1/4 w-2.5 h-2.5 bg-rose-300 rounded-full opacity-45 shadow-md"
             animate={{
               y: [0, -12, 0],
               x: [0, -8, 0],
               scale: [1, 1.1, 1],
               rotate: [0, -90, -180, -270, -360]
             }}
             transition={{
               duration: 3.5,
               repeat: Infinity,
               ease: "easeInOut",
               delay: 1.2
             }}
           />
           
         </div>

         {/* Header dengan tombol back */}
         <div className="flex-shrink-0 bg-gradient-to-r from-pink-100 to-rose-100 border-b border-pink-200 shadow-sm relative overflow-hidden">
           {/* Enhanced Animated Decorative background pattern */}
           <div className="absolute inset-0 opacity-10">
             <motion.div 
               className="absolute top-2 left-4 w-3 h-3 bg-pink-400 rounded-full shadow-lg"
               animate={{
                 scale: [1, 1.5, 1],
                 opacity: [0.3, 0.8, 0.3],
                 rotate: [0, 180, 360]
               }}
               transition={{
                 duration: 2.5,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             />
             <motion.div 
               className="absolute top-4 right-8 w-2 h-2 bg-rose-400 rounded-full shadow-lg"
               animate={{
                 scale: [1, 1.6, 1],
                 opacity: [0.3, 0.9, 0.3],
                 rotate: [0, -180, -360]
               }}
               transition={{
                 duration: 2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1
               }}
             />
             <motion.div 
               className="absolute bottom-2 left-12 w-2.5 h-2.5 bg-pink-300 rounded-full shadow-lg"
               animate={{
                 scale: [1, 1.4, 1],
                 opacity: [0.3, 0.7, 0.3],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.5
               }}
             />
             <motion.div 
               className="absolute bottom-4 right-4 w-2 h-2 bg-rose-300 rounded-full shadow-lg"
               animate={{
                 scale: [1, 1.7, 1],
                 opacity: [0.3, 0.8, 0.3],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 2.8,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.5
               }}
             />
             
             {/* Additional floating elements */}
             <motion.div 
               className="absolute top-6 left-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full shadow-md"
               animate={{
                 scale: [1, 1.3, 1],
                 opacity: [0.2, 0.6, 0.2],
                 y: [0, -5, 0]
               }}
               transition={{
                 duration: 2.2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.8
               }}
             />
             <motion.div 
               className="absolute bottom-6 right-1/3 w-1 h-1 bg-rose-500 rounded-full shadow-md"
               animate={{
                 scale: [1, 1.4, 1],
                 opacity: [0.2, 0.7, 0.2],
                 y: [0, 5, 0]
               }}
               transition={{
                 duration: 2.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.2
               }}
             />
           </div>
           
           <div className="flex items-center justify-between px-4 py-3 relative z-10">
             <Link href={`/${branch}/menu`}>
               <motion.button
                 whileHover={{ 
                   scale: 1.2,
                   rotate: -10,
                   transition: { duration: 0.3 }
                 }}
                 whileTap={{ scale: 0.8 }}
                 animate={{
                   scale: [1, 1.1, 1],
                   y: [0, -2, 0]
                 }}
                 transition={{
                   scale: {
                     duration: 1.5,
                     repeat: Infinity,
                     ease: "easeInOut"
                   },
                   y: {
                     duration: 2,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }
                 }}
                 className="flex items-center justify-center text-pink-700 hover:text-pink-800 transition-all duration-200 hover:bg-pink-200/30 w-10 h-10 rounded-full relative overflow-hidden"
               >
                 <motion.div
                   className="absolute inset-0 bg-gradient-to-r from-pink-300/30 to-rose-300/30 rounded-full"
                   animate={{
                     scale: [0, 1.5, 0],
                     opacity: [0, 0.8, 0]
                   }}
                   transition={{
                     duration: 1.2,
                     repeat: Infinity,
                     ease: "easeOut"
                   }}
                 />
                 <motion.div
                   className="absolute inset-0 bg-gradient-to-r from-rose-300/20 to-pink-300/20 rounded-full"
                   animate={{
                     scale: [0, 1.8, 0],
                     opacity: [0, 0.6, 0]
                   }}
                   transition={{
                     duration: 1.8,
                     repeat: Infinity,
                     ease: "easeOut",
                     delay: 0.5
                   }}
                 />
                 <ArrowLeft className="w-5 h-5 relative z-10" />
               </motion.button>
             </Link>
             
             <div className="absolute left-1/2 transform -translate-x-1/2">
               <motion.h1 
                 className="text-lg font-black text-pink-800 font-rounded"
                 animate={{
                   scale: [1, 1.05, 1],
                   y: [0, -2, 0],
                   textShadow: [
                     '0 0 0px rgba(219, 39, 119, 0)',
                     '0 0 15px rgba(219, 39, 119, 0.5)',
                     '0 0 0px rgba(219, 39, 119, 0)'
                   ]
                 }}
                 transition={{
                   duration: 2.5,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
               >
                 Menu Lengkap
               </motion.h1>
             </div>
             
             <div className="w-10 h-10"></div> {/* Spacer untuk centering */}
           </div>
         </div>

         {/* Content - Scrollable dengan maksimal 130% tinggi layar */}
         <div className="flex-1 px-2 py-4 relative">
           {/* New Content Layer - Behind category tables - Full height coverage */}
           <div className="absolute inset-0 pointer-events-none z-0" style={{ minHeight: '200vh' }}>
             {/* Evenly distributed floating fruit emojis across entire scrollable area */}
             
             {/* Fruit emoji array for random selection */}
             {(() => {
               const fruits = ['🍓', '🍇', '🍊', '🍋', '🍌', '🍉', '🍎', '🍑', '🥝', '🍒', '🍈', '🍍', '🥭', '🍐', '🍅'];
               const getRandomFruit = () => fruits[Math.floor(Math.random() * fruits.length)];
               
               return (
                 <div>
             
             {/* Top Section - 0-25% of content - Dense Grid */}
             <motion.div
               className="absolute top-[5%] left-[10%] text-2xl opacity-60"
               animate={{
                 y: [0, -8, 0],
                 x: [0, 6, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 3.5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.2
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[8%] right-[15%] text-xl opacity-55"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.8
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[12%] left-[50%] text-3xl opacity-50"
               animate={{
                 y: [0, -10, 0],
                 x: [0, 8, 0],
                 scale: [1, 1.3, 1],
                 rotate: [0, 180, 360]
               }}
               transition={{
                 duration: 4.1,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.5
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[7%] left-[25%] text-lg opacity-65"
               animate={{
                 y: [0, -4, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 2.8,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.5
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[10%] right-[25%] text-xl opacity-60"
               animate={{
                 y: [0, -7, 0],
                 x: [0, -5, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 3.0,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.2
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[15%] left-[75%] text-2xl opacity-55"
               animate={{
                 y: [0, -9, 0],
                 x: [0, 7, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -180, -360]
               }}
               transition={{
                 duration: 3.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.0
               }}
             >
               {getRandomFruit()}
             </motion.div>
             
             {/* Additional Top Section Fruits */}
             <motion.div
               className="absolute top-[3%] left-[5%] text-lg opacity-60"
               animate={{
                 y: [0, -3, 0],
                 x: [0, 2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.1
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[6%] left-[35%] text-xl opacity-55"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.1,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.6
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[9%] right-[35%] text-lg opacity-60"
               animate={{
                 y: [0, -4, 0],
                 x: [0, -3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.0
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[13%] left-[65%] text-xl opacity-55"
               animate={{
                 y: [0, -6, 0],
                 x: [0, 5, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.7
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[18%] right-[5%] text-lg opacity-60"
               animate={{
                 y: [0, -3, 0],
                 x: [0, -2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.3
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[20%] left-[90%] text-xl opacity-55"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.9
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[22%] left-[15%] text-lg opacity-60"
               animate={{
                 y: [0, -4, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.4
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[24%] right-[45%] text-xl opacity-55"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.1
               }}
             >
               {getRandomFruit()}
             </motion.div>
             
             {/* Middle Section - 25-50% of content - Dense Grid */}
             <motion.div
               className="absolute top-[26%] left-[12%] text-xl opacity-60"
               animate={{
                 y: [0, -7, 0],
                 x: [0, 5, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.8,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.5
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[31%] right-[12%] text-2xl opacity-55"
               animate={{
                 y: [0, -9, 0],
                 x: [0, -6, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 3.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.2
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[36%] left-[33%] text-lg opacity-65"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.3, 1],
                 rotate: [0, -180, -360]
               }}
               transition={{
                 duration: 2.9,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.1
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[28%] left-[40%] text-xl opacity-60"
               animate={{
                 y: [0, -6, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 3.3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.8
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[33%] right-[30%] text-lg opacity-65"
               animate={{
                 y: [0, -4, 0],
                 x: [0, -3, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 2.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.6
               }}
             >
               {getRandomFruit()}
             </motion.div>
             <motion.div
               className="absolute top-[38%] left-[60%] text-2xl opacity-55"
               animate={{
                 y: [0, -8, 0],
                 x: [0, 6, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, 180, 360]
               }}
               transition={{
                 duration: 3.9,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.4
               }}
             >
               {getRandomFruit()}
             </motion.div>
             
             {/* Additional Middle Section Dots */}
             <motion.div
               className="absolute top-[27%] left-[5%] w-1 h-1 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, 2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.3
               }}
             />
             <motion.div
               className="absolute top-[29%] left-[20%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.1,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.9
               }}
             />
             <motion.div
               className="absolute top-[34%] right-[20%] w-1 h-1 bg-pink-400 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, -3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.4
               }}
             />
             <motion.div
               className="absolute top-[39%] left-[50%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, 5, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.0
               }}
             />
             <motion.div
               className="absolute top-[42%] right-[5%] w-1 h-1 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, -2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.7
               }}
             />
             <motion.div
               className="absolute top-[44%] left-[80%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.1
               }}
             />
             <motion.div
               className="absolute top-[46%] left-[8%] w-1 h-1 bg-pink-400 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.8
               }}
             />
             <motion.div
               className="absolute top-[48%] right-[40%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.5
               }}
             />
             
             {/* Lower Middle Section - 50-75% of content - Dense Grid */}
             <motion.div
               className="absolute top-[52%] left-[20%] w-2 h-2 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -8, 0],
                 x: [0, 6, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 3.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.7
               }}
             />
             <motion.div
               className="absolute top-[57%] right-[20%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.1,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.4
               }}
             />
             <motion.div
               className="absolute top-[62%] left-[50%] w-2.5 h-2.5 bg-pink-400 rounded-full opacity-40 shadow-md"
               animate={{
                 y: [0, -10, 0],
                 x: [0, 8, 0],
                 scale: [1, 1.3, 1],
                 rotate: [0, 180, 360]
               }}
               transition={{
                 duration: 4.2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.3
               }}
             />
             
             {/* Additional Lower Middle Section Dots */}
             <motion.div
               className="absolute top-[51%] left-[5%] w-1 h-1 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, 2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.2
               }}
             />
             <motion.div
               className="absolute top-[53%] left-[35%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.1,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.8
               }}
             />
             <motion.div
               className="absolute top-[58%] right-[35%] w-1 h-1 bg-pink-400 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, -3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.3
               }}
             />
             <motion.div
               className="absolute top-[63%] left-[65%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, 5, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.9
               }}
             />
             <motion.div
               className="absolute top-[66%] right-[5%] w-1 h-1 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, -2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.6
               }}
             />
             <motion.div
               className="absolute top-[68%] left-[85%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.0
               }}
             />
             <motion.div
               className="absolute top-[70%] left-[10%] w-1 h-1 bg-pink-400 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.7
               }}
             />
             <motion.div
               className="absolute top-[72%] right-[50%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.4
               }}
             />
             
             {/* Lower Section - 75-100% of content - Dense Grid */}
             <motion.div
               className="absolute top-[76%] left-[14%] w-1 h-1 bg-rose-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 2.8,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.9
               }}
             />
             <motion.div
               className="absolute top-[81%] right-[14%] w-2 h-2 bg-pink-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -8, 0],
                 x: [0, -5, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 3.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.6
               }}
             />
             <motion.div
               className="absolute top-[86%] left-[25%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-40 shadow-sm"
               animate={{
                 y: [0, -7, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.3, 1],
                 rotate: [0, -180, -360]
               }}
               transition={{
                 duration: 3.3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.5
               }}
             />
             
             {/* Additional Lower Section Dots */}
             <motion.div
               className="absolute top-[75%] left-[5%] w-1 h-1 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, 2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.1
               }}
             />
             <motion.div
               className="absolute top-[77%] left-[30%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.1,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.7
               }}
             />
             <motion.div
               className="absolute top-[82%] right-[30%] w-1 h-1 bg-pink-400 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, -3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.2
               }}
             />
             <motion.div
               className="absolute top-[87%] left-[55%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, 5, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.8
               }}
             />
             <motion.div
               className="absolute top-[90%] right-[5%] w-1 h-1 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, -2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.3
               }}
             />
             <motion.div
               className="absolute top-[92%] left-[80%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.9
               }}
             />
             <motion.div
               className="absolute top-[94%] left-[8%] w-1 h-1 bg-pink-400 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.6
               }}
             />
             <motion.div
               className="absolute top-[96%] right-[60%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.1
               }}
             />
             
             {/* Deep Section - 100-125% of content - Dense Grid */}
             <motion.div
               className="absolute top-[102%] left-[11%] w-2.5 h-2.5 bg-pink-400 rounded-full opacity-40 shadow-md"
               animate={{
                 y: [0, -12, 0],
                 x: [0, 9, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, 180, 360]
               }}
               transition={{
                 duration: 4.5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.3
               }}
             />
             <motion.div
               className="absolute top-[107%] right-[11%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.0,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.1
               }}
             />
             <motion.div
               className="absolute top-[112%] left-[33%] w-1 h-1 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.3, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.8
               }}
             />
             
             {/* Additional Deep Section Dots */}
             <motion.div
               className="absolute top-[101%] left-[5%] w-1 h-1 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, 2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.1
               }}
             />
             <motion.div
               className="absolute top-[103%] left-[25%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.1,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.7
               }}
             />
             <motion.div
               className="absolute top-[108%] right-[25%] w-1 h-1 bg-pink-400 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, -3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.2
               }}
             />
             <motion.div
               className="absolute top-[113%] left-[45%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, 5, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.8
               }}
             />
             <motion.div
               className="absolute top-[115%] right-[5%] w-1 h-1 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, -2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.3
               }}
             />
             <motion.div
               className="absolute top-[117%] left-[70%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.9
               }}
             />
             <motion.div
               className="absolute top-[119%] left-[8%] w-1 h-1 bg-pink-400 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.6
               }}
             />
             <motion.div
               className="absolute top-[121%] right-[45%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.1
               }}
             />
             
             {/* Very Deep Section - 125-150% of content */}
             <motion.div
               className="absolute top-[100%] left-[16%] w-2 h-2 bg-rose-400 rounded-full opacity-30 shadow-sm"
               animate={{
                 y: [0, -8, 0],
                 x: [0, 6, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -180, -360]
               }}
               transition={{
                 duration: 3.9,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.6
               }}
             />
             <motion.div
               className="absolute top-[105%] right-[16%] w-1.5 h-1.5 bg-pink-300 rounded-full opacity-35 shadow-sm"
               animate={{
                 y: [0, -7, 0],
                 x: [0, -5, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 3.2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.3
               }}
             />
             <motion.div
               className="absolute top-[110%] left-[50%] w-2.5 h-2.5 bg-rose-300 rounded-full opacity-25 shadow-md"
               animate={{
                 y: [0, -10, 0],
                 x: [0, 8, 0],
                 scale: [1, 1.3, 1],
                 rotate: [0, 180, 360]
               }}
               transition={{
                 duration: 4.3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.0
               }}
             />
             
             {/* Bottom Section - 150-175% of content */}
             <motion.div
               className="absolute top-[120%] left-[12%] w-1 h-1 bg-pink-300 rounded-full opacity-40 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 2.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.4
               }}
             />
             <motion.div
               className="absolute top-[125%] right-[12%] w-2 h-2 bg-rose-300 rounded-full opacity-30 shadow-sm"
               animate={{
                 y: [0, -8, 0],
                 x: [0, -6, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 3.8,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.7
               }}
             />
             <motion.div
               className="absolute top-[130%] left-[25%] w-1.5 h-1.5 bg-pink-400 rounded-full opacity-25 shadow-sm"
               animate={{
                 y: [0, -7, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.3, 1],
                 rotate: [0, -180, -360]
               }}
               transition={{
                 duration: 3.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.4
               }}
             />
             
             {/* Deepest Section - 175-200% of content */}
             <motion.div
               className="absolute top-[140%] left-[18%] w-2.5 h-2.5 bg-rose-400 rounded-full opacity-25 shadow-md"
               animate={{
                 y: [0, -12, 0],
                 x: [0, 9, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, 180, 360]
               }}
               transition={{
                 duration: 4.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.8
               }}
             />
             <motion.div
               className="absolute top-[145%] right-[18%] w-1.5 h-1.5 bg-pink-300 rounded-full opacity-30 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.1,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.5
               }}
             />
             <motion.div
               className="absolute top-[150%] left-[33%] w-1 h-1 bg-rose-300 rounded-full opacity-35 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.3, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.8,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.2
               }}
             />
             
             {/* Additional Scattered Dots - Between sections */}
             <motion.div
               className="absolute top-[17%] left-[5%] w-1 h-1 bg-pink-300 rounded-full opacity-50 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, 2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.3
               }}
             />
             <motion.div
               className="absolute top-[35%] right-[5%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-40 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, -3, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.1,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.1
               }}
             />
             <motion.div
               className="absolute top-[55%] left-[8%] w-1 h-1 bg-pink-400 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.7
               }}
             />
             <motion.div
               className="absolute top-[75%] right-[8%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-35 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.2,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.8
               }}
             />
             <motion.div
               className="absolute top-[95%] left-[6%] w-1 h-1 bg-pink-300 rounded-full opacity-40 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, 2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.9
               }}
             />
             <motion.div
               className="absolute top-[115%] right-[6%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-35 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, -3, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.0,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.5
               }}
             />
             <motion.div
               className="absolute top-[135%] left-[4%] w-1 h-1 bg-pink-400 rounded-full opacity-40 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.6
               }}
             />
             <motion.div
               className="absolute top-[155%] right-[4%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-30 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, -4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.4,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.1
               }}
             />
             
             {/* Extra scattered dots for more visibility */}
             <motion.div
               className="absolute top-[13%] left-[85%] w-1 h-1 bg-pink-300 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, 2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.3
               }}
             />
             <motion.div
               className="absolute top-[37%] left-[85%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-40 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.4
               }}
             />
             <motion.div
               className="absolute top-[57%] right-[85%] w-1 h-1 bg-pink-400 rounded-full opacity-45 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, -2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.8,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.7
               }}
             />
             <motion.div
               className="absolute top-[77%] left-[85%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-35 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.5
               }}
             />
             <motion.div
               className="absolute top-[97%] right-[85%] w-1 h-1 bg-pink-300 rounded-full opacity-40 shadow-sm"
               animate={{
                 y: [0, -3, 0],
                 x: [0, -2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.9,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.8
               }}
             />
             <motion.div
               className="absolute top-[117%] left-[85%] w-1.5 h-1.5 bg-rose-300 rounded-full opacity-35 shadow-sm"
               animate={{
                 y: [0, -5, 0],
                 x: [0, 3, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.3,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1.9
               }}
             />
             <motion.div
               className="absolute top-[137%] right-[85%] w-1 h-1 bg-pink-400 rounded-full opacity-40 shadow-sm"
               animate={{
                 y: [0, -4, 0],
                 x: [0, -2, 0],
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{
                 duration: 2.6,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 0.5
               }}
             />
             <motion.div
               className="absolute top-[157%] left-[85%] w-1.5 h-1.5 bg-rose-400 rounded-full opacity-30 shadow-sm"
               animate={{
                 y: [0, -6, 0],
                 x: [0, 4, 0],
                 scale: [1, 1.2, 1],
                 rotate: [0, -90, -180, -270, -360]
               }}
               transition={{
                 duration: 3.7,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 2.3
               }}
             />
                 </div>
               );
             })()}
           </div>
           
           <div className="grid grid-cols-2 gap-4 relative z-10">
          {sortedCategories.map((category, categoryIndex) => {
            const products = groupedProducts[category];
            return (
               <motion.div
                 key={category}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                 whileHover={{ 
                   scale: 1.05,
                   y: -5,
                   rotateY: 5,
                   transition: { duration: 0.3 }
                 }}
                 className="bg-white rounded-lg border border-pink-200 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-300 relative group"
               >
                 {/* Category Header */}
                 <div className="bg-gradient-to-r from-pink-100 to-rose-100 px-2 py-1.5 border-b border-pink-200 relative overflow-hidden">
                   <motion.div 
                     className="absolute inset-0 bg-gradient-to-r from-pink-200/20 to-rose-200/20"
                     animate={{
                       backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                     }}
                     transition={{
                       duration: 3,
                       repeat: Infinity,
                       ease: "easeInOut"
                     }}
                   />
                   <motion.h2 
                     className="text-xs font-black text-pink-800 font-display relative z-10"
                     whileHover={{ scale: 1.05 }}
                     transition={{ duration: 0.2 }}
                   >
                     {category}
                   </motion.h2>
                   
                   {/* Enhanced shimmer effect */}
                   <motion.div
                     className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                     animate={{
                       x: ['-100%', '100%']
                     }}
                     transition={{
                       duration: 1.5,
                       repeat: Infinity,
                       repeatDelay: 2,
                       ease: "easeInOut"
                     }}
                   />
                   <motion.div
                     className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-pink-200/20 to-transparent"
                     animate={{
                       x: ['100%', '-100%']
                     }}
                     transition={{
                       duration: 2,
                       repeat: Infinity,
                       repeatDelay: 1,
                       ease: "easeInOut"
                     }}
                   />
                 </div>
                 
                 {/* Products List */}
                 <div className="max-h-80 overflow-y-auto scrollbar-hide">
                   {products.map((product, index) => (
                     <motion.div
                       key={product.id}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.2, delay: (categoryIndex * 0.1) + (index * 0.02) }}
                       whileHover={{ 
                         x: 8,
                         scale: 1.02,
                         transition: { duration: 0.3 }
                       }}
                       className="px-1 py-0.5 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transition-all duration-300 border-b border-pink-100 last:border-b-0 group h-6 flex items-center relative overflow-hidden"
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

      </motion.div>
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
        created_at: new Date().toISOString(),
        tipe: 'premium',
        ekstra_ids: null,
        category: 'Jus Alpukat',
        description: 'Jus alpukat segar dengan kualitas terbaik',
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
        created_at: new Date().toISOString(),
        tipe: 'premium',
        ekstra_ids: null,
        category: 'Jus Alpukat',
        description: 'Jus alpukat segar dengan kualitas terbaik',
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
