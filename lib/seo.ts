// SEO utilities untuk optimasi lokal dan structured data

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    image?: string;
    url: string;
    type: string;
  };
  structuredData: any;
}

// Data SEO untuk setiap cabang
export const getBranchSEOData = (branch: 'berau' | 'samarinda', page: string = 'home'): SEOData => {
  const branchData = {
    berau: {
      name: 'Berau',
      city: 'Berau',
      region: 'Kalimantan Timur',
      address: 'Jl. Merah Delima depan Klinik Berlian Bakti, Berau, Kalimantan Timur',
      phone: '+62813-4988-2015',
      whatsapp: '+62813-5035-4856',
      latitude: -2.1872,
      longitude: 117.3703,
    },
    samarinda: {
      name: 'Samarinda',
      city: 'Samarinda',
      region: 'Kalimantan Timur',
      address: 'Jl. Juanda Samping Ami Ali Parfum, Samarinda, Kalimantan Timur',
      phone: '+62813-5007-6071',
      whatsapp: '+62858-2061-5188',
      latitude: -0.5021,
      longitude: 117.1536,
    },
  };

  const data = branchData[branch];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zatiarasjuice.com';

  // SEO data berdasarkan halaman
  if (page === 'contact') {
    return {
      title: `Kontak Zatiaras Juice ${data.name} — WhatsApp, Instagram, TikTok`,
      description: `Hubungi Zatiaras Juice ${data.name} melalui WhatsApp, Instagram, atau TikTok. Customer service siap melayani Anda 24/7. Phone: ${data.phone}`,
      keywords: [
        `kontak zatiaras juice ${data.city}`,
        `whatsapp ${data.name}`,
        `customer service ${data.city}`,
        `instagram zatiaras ${data.name}`,
        `tiktok zatiaras ${data.city}`,
        `hubungi zatiaras ${data.name}`,
        `phone zatiaras ${data.city}`,
        `alamat zatiaras ${data.name}`,
        `lokasi zatiaras ${data.city}`,
        `jam buka zatiaras ${data.name}`,
        `jus terenak ${data.city}`,
        `jus terbaik ${data.name}`,
        `delivery jus ${data.city}`,
        `gofood ${data.name}`,
        `grabfood ${data.city}`,
      ],
      canonical: `${baseUrl}/${branch}/contact`,
      openGraph: {
        title: `Kontak Zatiaras Juice ${data.name} — WhatsApp, Instagram, TikTok`,
        description: `Hubungi Zatiaras Juice ${data.name} melalui WhatsApp, Instagram, atau TikTok. Customer service siap melayani Anda 24/7.`,
        url: `${baseUrl}/${branch}/contact`,
        type: 'website',
      },
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `Zatiaras Juice ${data.name}`,
        image: `${baseUrl}/images/logo.png`,
        description: `Zatiaras Juice ${data.name} - Jus Alpukat & Buah Segar Nomor 1 di ${data.city}`,
        url: `${baseUrl}/${branch}/contact`,
        telephone: data.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: data.address.split(',')[0],
          addressLocality: data.city,
          addressRegion: data.region,
          addressCountry: 'ID',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: data.latitude,
          longitude: data.longitude,
        },
        openingHours: 'Mo-Su 08:00-22:00',
        priceRange: '$$',
        servesCuisine: 'Indonesian',
        hasMenu: `${baseUrl}/${branch}/menu`,
        sameAs: [
          branch === 'berau' ? 'https://instagram.com/zatiarasjuice' : 'https://instagram.com/zatiarasjuice_smr',
          'https://tiktok.com/@zatiarasjuice_01',
        ],
      },
    };
  }

  return {
    title: `Zatiaras Juice ${data.name} — Jus Alpukat & Buah Segar Nomor 1 di ${data.city}`,
    description: `Nikmati jus alpukat dan aneka jus segar di Zatiaras Juice ${data.name}. Menu lengkap, harga transparan, order via GoFood/GrabFood/WA. Lokasi: ${data.address}`,
    keywords: [
      `jus alpukat ${data.city}`,
      `jus segar ${data.name}`,
      `zatiaras juice ${data.city}`,
      `menu jus ${data.name}`,
      `harga jus ${data.city}`,
      `gofood ${data.city}`,
      `grabfood ${data.name}`,
      `delivery jus ${data.city}`,
      `jus buah segar ${data.name}`,
      `restoran jus ${data.city}`,
      `jus terenak ${data.city}`,
      `jus terbaik ${data.name}`,
      `rating 4.9 jus ${data.city}`,
      `review jus ${data.name}`,
      `jus mangga ${data.city}`,
      `alpukat kocok ${data.name}`,
      `jus sehat ${data.city}`,
      `jus alami ${data.name}`,
    ],
    canonical: `${baseUrl}/${branch}`,
      openGraph: {
        title: `Zatiaras Juice ${data.name} — Jus Alpukat & Buah Segar Nomor 1`,
        description: `Nikmati jus alpukat dan aneka jus segar di Zatiaras Juice ${data.name}. Menu lengkap, harga transparan, order via GoFood/GrabFood/WA.`,
        url: `${baseUrl}/${branch}`,
        type: 'website',
      },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `Zatiaras Juice ${data.name}`,
      image: `${baseUrl}/images/logo.png`,
      description: `Zatiaras Juice ${data.name} - Jus Alpukat & Buah Segar Nomor 1 di ${data.city}`,
      url: `${baseUrl}/${branch}`,
      telephone: data.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.address.split(',')[0],
        addressLocality: data.city,
        addressRegion: data.region,
        addressCountry: 'ID',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.latitude,
        longitude: data.longitude,
      },
      openingHours: [
        'Mo-Su 08:00-22:00',
      ],
      priceRange: '$$',
      servesCuisine: 'Indonesian',
      hasMenu: {
        '@type': 'Menu',
        url: `${baseUrl}/${branch}/menu`,
      },
      sameAs: [
        branch === 'berau' ? 'https://www.instagram.com/zatiarasjuice' : 'https://www.instagram.com/zatiarasjuice_smr',
        'https://www.tiktok.com/@zatiarasjuice_01',
        branch === 'berau' 
          ? 'https://gofood.co.id/berau/restaurant/juice-zatiaras-tanjungredeb-65ca1162-75a7-4c4e-ab1e-14369af8bf64'
          : 'https://gofood.co.id/samarinda/restaurant/zatiaras-jus-samarinda-e66a662d-6a07-4069-b35f-62642eb1e2c6',
        branch === 'berau'
          ? 'https://food.grab.com/id/en/restaurant/zatiaras-juice-berau'
          : 'https://food.grab.com/id/en/restaurant/zatiaras-juice-samarinda',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '150',
      },
    },
  };
};

// SEO data untuk homepage
export const getHomepageSEOData = (): SEOData => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zatiarasjuice.com';
  
  return {
    title: 'Zatiaras Juice — Jus Terenak & Terbaik di Berau & Samarinda | Rating 4.9/5',
    description: 'Jus terenak di Berau & Samarinda! Rating 4.9/5 dari 500+ review. 100% alami, tanpa pengawet. Order via WhatsApp/GoFood/GrabFood. Jus alpukat & buah segar terbaik.',
    keywords: [
      'jus terenak berau',
      'jus terbaik samarinda',
      'jus alpukat terenak berau',
      'jus segar terbaik samarinda',
      'zatiaras juice berau',
      'zatiaras juice samarinda',
      'jus terenak di berau',
      'jus terbaik di samarinda',
      'menu jus terenak berau',
      'harga jus terbaik samarinda',
      'gofood berau jus terenak',
      'grabfood samarinda jus terbaik',
      'delivery jus terenak berau',
      'jus buah segar terbaik samarinda',
      'restoran jus terenak berau',
      'rating 4.9 jus berau',
      'review jus terbaik samarinda',
      'jus mangga terbaik',
      'alpukat kocok terenak',
      'jus sehat alami',
      'jus tanpa pengawet',
    ],
    canonical: baseUrl,
    openGraph: {
      title: 'Zatiaras Juice — Jus Terenak & Terbaik di Berau & Samarinda',
      description: 'Jus terenak di Berau & Samarinda! Rating 4.9/5 dari 500+ review. 100% alami, tanpa pengawet. Order via WhatsApp/GoFood/GrabFood.',
      url: baseUrl,
      type: 'website',
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Zatiaras Juice',
      description: 'Jus Alpukat & Buah Segar Nomor 1 di Berau & Samarinda',
      url: baseUrl,
      logo: `${baseUrl}/images/logo.png`,
      sameAs: [
        'https://www.instagram.com/zatiarasjuice_smr',
        'https://www.facebook.com/zatiarasjuice',
        'https://www.tiktok.com/@zatiarasjuice_01',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Menu Jus Zatiaras',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Jus Alpukat',
              description: 'Dibuat dari buah alpukat pilihan terbaik, tanpa pengawet, 100% alami',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Jus Mangga',
              description: 'Dibuat fresh setiap hari dengan buah pilihan',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Alpukat Kocok',
              description: 'Resep rahasia turun temurun, susu segar pilihan, gula aren asli',
            },
          },
        ],
      },
    },
  };
};

// Function untuk generate breadcrumb structured data
export const getBreadcrumbStructuredData = (items: Array<{name: string, url: string}>): any => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

// Function untuk generate FAQ structured data
export const getFAQStructuredData = (faqs: Array<{question: string, answer: string}>): any => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

// Function untuk generate review structured data
export const getReviewStructuredData = (reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>): any => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
      reviewCount: reviews.length,
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
    })),
  };
};
