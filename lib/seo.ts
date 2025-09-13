// SEO utilities untuk optimasi lokal dan structured data

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
  structuredData: any;
}

// Data SEO untuk setiap cabang
export const getBranchSEOData = (branch: 'berau' | 'samarinda'): SEOData => {
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
      image: `${baseUrl}/images/og-${branch}.jpg`,
      url: `${baseUrl}/${branch}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Zatiaras Juice ${data.name} — Jus Alpukat & Buah Segar Nomor 1`,
      description: `Nikmati jus alpukat dan aneka jus segar di Zatiaras Juice ${data.name}. Menu lengkap, harga transparan, order via GoFood/GrabFood/WA.`,
      image: `${baseUrl}/images/twitter-${branch}.jpg`,
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `Zatiaras Juice ${data.name}`,
      image: `${baseUrl}/images/logo-${branch}.png`,
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

// Function untuk generate structured data menu
export const getMenuStructuredData = (
  branch: 'berau' | 'samarinda',
  products: any[]
): any => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zatiarasjuice.com';
  const branchData = getBranchSEOData(branch);

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `Menu Zatiaras Juice ${branchData.openGraph.title.split('—')[0].trim()}`,
    description: `Menu lengkap Zatiaras Juice ${branchData.openGraph.title.split('—')[0].trim()}`,
    url: `${baseUrl}/${branch}/menu`,
    provider: {
      '@type': 'LocalBusiness',
      name: `Zatiaras Juice ${branchData.openGraph.title.split('—')[0].trim()}`,
      url: `${baseUrl}/${branch}`,
    },
    hasMenuSection: products.reduce((sections: any[], product: any) => {
      const existingSection = sections.find(s => s.name === product.category);
      if (existingSection) {
        existingSection.hasMenuItem.push({
          '@type': 'MenuItem',
          name: product.name,
          description: product.description,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'IDR',
          },
        });
      } else {
        sections.push({
          '@type': 'MenuSection',
          name: product.category,
          hasMenuItem: [{
            '@type': 'MenuItem',
            name: product.name,
            description: product.description,
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'IDR',
            },
          }],
        });
      }
      return sections;
    }, []),
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
