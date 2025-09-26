// Advanced Service Worker for Zatiaras Juice - Ultra Performance Optimized
const CACHE_NAME = 'zatiaras-juice-v2.0.1';
const STATIC_CACHE = 'zatiaras-static-v2.0.1';
const DYNAMIC_CACHE = 'zatiaras-dynamic-v2.0.1';
const IMAGE_CACHE = 'zatiaras-images-v2.0.1';
const API_CACHE = 'zatiaras-api-v2.0.1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/images/juice-placeholder.svg',
  // Removed old JPG hero assets to avoid pinning stale cache
  '/_next/static/css/',
  '/_next/static/chunks/framework.js',
  '/_next/static/chunks/main.js',
  '/_next/static/chunks/pages/_app.js',
  '/_next/static/chunks/pages/index.js',
];

// Cache strategies
const CACHE_STRATEGIES = {
  static: 'cache-first',
  dynamic: 'network-first',
  images: 'cache-first',
  api: 'network-first',
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
      return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
            }
          })
      );
    })
      .then(() => self.clients.claim())
  );
});

// Advanced fetch event with intelligent caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // Determine cache strategy based on request type
  const strategy = getCacheStrategy(request);
  
  event.respondWith(
    handleRequest(request, strategy)
  );
});

// Intelligent cache strategy selection
function getCacheStrategy(request) {
  const url = new URL(request.url);
  
  // Static assets (CSS, JS, images)
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname.startsWith('/images/') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js')) {
    return 'static';
  }
  
  // API requests
  if (url.pathname.startsWith('/api/')) {
    return 'api';
  }
  
  // Images
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) {
    return 'images';
  }
  
  // Dynamic content (pages)
  return 'dynamic';
}

// Handle request with appropriate strategy
async function handleRequest(request, strategy) {
  const url = new URL(request.url);
  
  switch (strategy) {
    case 'static':
      return handleStaticRequest(request);
    case 'images':
      return handleImageRequest(request);
    case 'api':
      return handleApiRequest(request);
    case 'dynamic':
    default:
      return handleDynamicRequest(request);
  }
}

// Cache-first strategy for static assets
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline fallback for static assets
    return new Response('Offline', { status: 503 });
  }
}

// Cache-first strategy for images
async function handleImageRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return placeholder image for offline
    return caches.match('/images/juice-placeholder.svg');
  }
}

// Network-first strategy for API requests
async function handleApiRequest(request) {
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const cache = await caches.open(API_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Network-first strategy for dynamic content
async function handleDynamicRequest(request) {
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/');
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered')
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Menu'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Zatiaras Juice', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/menu')
    );
  }
});