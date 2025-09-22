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
      address: 'Jl. Ahmad Yani No. 123, Berau, Kalimantan Timur',
      phone: '+62812-3456-7890',
      whatsapp: '+62812-3456-7890',
      latitude: -2.1872,
      longitude: 117.3703,
    },
    samarinda: {
      name: 'Samarinda',
      city: 'Samarinda',
      region: 'Kalimantan Timur',
      address: 'Jl. Sudirman No. 456, Samarinda, Kalimantan Timur',
      phone: '+62812-3456-7891',
      whatsapp: '+62812-3456-7891',
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
          'https://instagram.com/zatiarasjuice',
          'https://tiktok.com/@zatiarasjuice',
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
        'https://www.instagram.com/zatiarasjuice',
        'https://www.tiktok.com/@zatiarasjuice',
        'https://gofood.co.id/merchant/zatiaras-juice',
        'https://food.grab.com/id/en/restaurant/zatiaras-juice',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '150',
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
