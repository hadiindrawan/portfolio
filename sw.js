// Service Worker - Modern caching strategy for portfolio website
const CACHE_NAME = 'hadi-portfolio-v1.0.0';
const CACHE_STRATEGY = {
    CACHE_FIRST: 'cache-first',
    NETWORK_FIRST: 'network-first',
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Assets to cache immediately
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/style/app.css',
    '/js/app.js',
    '/js/data/portfolio-data.js',
    '/js/modules/navigation.js',
    '/js/modules/typing-effect.js',
    '/js/modules/scroll-reveal.js',
    '/js/modules/carousel.js',
    '/js/modules/data-renderer.js',
    '/js/modules/image-optimizer.js',
    '/asset/new.png',
    '/asset/profile-pic.png'
];

// Runtime caching rules
const RUNTIME_CACHE_RULES = [
    {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
        handler: CACHE_STRATEGY.CACHE_FIRST,
        options: {
            cacheName: 'images-cache',
            expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                purgeOnQuotaError: true
            }
        }
    },
    {
        urlPattern: /\.(?:js|css)$/,
        handler: CACHE_STRATEGY.STALE_WHILE_REVALIDATE,
        options: {
            cacheName: 'static-resources',
            expiration: {
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
            }
        }
    },
    {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: CACHE_STRATEGY.STALE_WHILE_REVALIDATE,
        options: {
            cacheName: 'google-fonts-stylesheets'
        }
    },
    {
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: CACHE_STRATEGY.CACHE_FIRST,
        options: {
            cacheName: 'google-fonts-webfonts',
            expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
            }
        }
    },
    {
        urlPattern: /^https:\/\/cdn\.tailwindcss\.com/,
        handler: CACHE_STRATEGY.STALE_WHILE_REVALIDATE,
        options: {
            cacheName: 'cdn-resources',
            expiration: {
                maxEntries: 10,
                maxAgeSeconds: 24 * 60 * 60 // 1 day
            }
        }
    }
];

// Install event - precache assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Precaching assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Precaching completed');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => {
                console.error('Service Worker: Precaching failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            // Delete old cache versions
                            return cacheName.startsWith('hadi-portfolio-') && cacheName !== CACHE_NAME;
                        })
                        .map((cacheName) => {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('Service Worker: Cache cleanup completed');
                return self.clients.claim(); // Take control immediately
            })
    );
});

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip external requests that we don't want to cache
    if (!event.request.url.startsWith(self.location.origin) && 
        !shouldCacheExternalRequest(event.request.url)) {
        return;
    }

    const rule = findMatchingRule(event.request.url);
    
    if (rule) {
        event.respondWith(
            handleRequestWithStrategy(event.request, rule.handler, rule.options)
        );
    } else {
        // Default strategy for unmatched requests
        event.respondWith(
            handleRequestWithStrategy(event.request, CACHE_STRATEGY.NETWORK_FIRST)
        );
    }
});

// Strategy implementations
async function handleRequestWithStrategy(request, strategy, options = {}) {
    const cacheName = options.cacheName || CACHE_NAME;
    
    switch (strategy) {
        case CACHE_STRATEGY.CACHE_FIRST:
            return cacheFirst(request, cacheName, options);
        
        case CACHE_STRATEGY.NETWORK_FIRST:
            return networkFirst(request, cacheName, options);
        
        case CACHE_STRATEGY.STALE_WHILE_REVALIDATE:
            return staleWhileRevalidate(request, cacheName, options);
        
        default:
            return fetch(request);
    }
}

// Cache First Strategy
async function cacheFirst(request, cacheName, options) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            await cacheResponse(cache, request, networkResponse.clone(), options);
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('Network request failed, no cache available:', error);
        return createOfflineFallback(request);
    }
}

// Network First Strategy
async function networkFirst(request, cacheName, options) {
    const cache = await caches.open(cacheName);
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            await cacheResponse(cache, request, networkResponse.clone(), options);
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('Network request failed, trying cache:', error);
        
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return createOfflineFallback(request);
    }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName, options) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    // Fetch from network in the background
    const networkFetch = fetch(request)
        .then((networkResponse) => {
            if (networkResponse.ok) {
                cacheResponse(cache, request, networkResponse.clone(), options);
            }
            return networkResponse;
        })
        .catch((error) => {
            console.warn('Background network request failed:', error);
        });
    
    // Return cached response immediately if available
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // If no cached response, wait for network
    try {
        return await networkFetch;
    } catch (error) {
        return createOfflineFallback(request);
    }
}

// Helper functions
function findMatchingRule(url) {
    return RUNTIME_CACHE_RULES.find(rule => rule.urlPattern.test(url));
}

function shouldCacheExternalRequest(url) {
    const allowedDomains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'cdn.tailwindcss.com'
    ];
    
    return allowedDomains.some(domain => url.includes(domain));
}

async function cacheResponse(cache, request, response, options) {
    // Check cache expiration options
    if (options.expiration) {
        await enforceExpiration(cache, options.expiration);
    }
    
    // Add timestamp for expiration checking
    const responseWithTimestamp = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
            ...Object.fromEntries(response.headers.entries()),
            'sw-cached-at': Date.now().toString()
        }
    });
    
    await cache.put(request, responseWithTimestamp);
}

async function enforceExpiration(cache, expiration) {
    const { maxEntries, maxAgeSeconds } = expiration;
    
    if (maxAgeSeconds) {
        // Remove expired entries
        const requests = await cache.keys();
        const now = Date.now();
        
        for (const request of requests) {
            const response = await cache.match(request);
            const cachedAt = response.headers.get('sw-cached-at');
            
            if (cachedAt && (now - parseInt(cachedAt)) > (maxAgeSeconds * 1000)) {
                await cache.delete(request);
            }
        }
    }
    
    if (maxEntries) {
        // Remove oldest entries if over limit
        const requests = await cache.keys();
        
        if (requests.length >= maxEntries) {
            const responses = await Promise.all(
                requests.map(async (request) => {
                    const response = await cache.match(request);
                    return {
                        request,
                        cachedAt: parseInt(response.headers.get('sw-cached-at')) || 0
                    };
                })
            );
            
            responses.sort((a, b) => a.cachedAt - b.cachedAt);
            
            const toDelete = responses.slice(0, requests.length - maxEntries + 1);
            await Promise.all(toDelete.map(({ request }) => cache.delete(request)));
        }
    }
}

function createOfflineFallback(request) {
    const url = new URL(request.url);
    
    // Return appropriate offline fallback based on request type
    if (request.destination === 'image') {
        return createOfflineImageResponse();
    }
    
    if (request.destination === 'document') {
        return createOfflinePageResponse();
    }
    
    return new Response('Offline - Content not available', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}

function createOfflineImageResponse() {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
            <rect width="100%" height="100%" fill="#f3f4f6"/>
            <g fill="#9ca3af" transform="translate(135,85)">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </g>
            <text x="150" y="130" text-anchor="middle" fill="#6b7280" font-size="12" font-family="sans-serif">Offline</text>
        </svg>
    `;
    
    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-store'
        }
    });
}

function createOfflinePageResponse() {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Offline - Hadi Indrawan Portfolio</title>
            <style>
                body { font-family: system-ui; text-align: center; padding: 50px; background: #f8f5f0; }
                .container { max-width: 400px; margin: 0 auto; }
                h1 { color: #2d2d2d; }
                p { color: #8b7d6b; }
                .retry-btn { background: #a0956b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>You're Offline</h1>
                <p>Please check your internet connection and try again.</p>
                <button class="retry-btn" onclick="window.location.reload()">Retry</button>
            </div>
        </body>
        </html>
    `;
    
    return new Response(html, {
        headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-store'
        }
    });
}

// Message handling for cache management
self.addEventListener('message', (event) => {
    const { type, payload } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
        
        case 'GET_VERSION':
            event.ports[0].postMessage({ version: CACHE_NAME });
            break;
        
        case 'CLEAR_CACHE':
            clearCache(payload.cacheName)
                .then(() => event.ports[0].postMessage({ success: true }))
                .catch((error) => event.ports[0].postMessage({ success: false, error: error.message }));
            break;
    }
});

async function clearCache(cacheName = CACHE_NAME) {
    return await caches.delete(cacheName);
}

// Periodic cleanup (runs when the service worker becomes idle)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'cache-cleanup') {
        event.waitUntil(performCacheCleanup());
    }
});

async function performCacheCleanup() {
    console.log('Service Worker: Performing periodic cache cleanup');
    
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        
        // Find matching rule for expiration settings
        const rule = RUNTIME_CACHE_RULES.find(r => r.options?.cacheName === cacheName);
        
        if (rule && rule.options?.expiration) {
            await enforceExpiration(cache, rule.options.expiration);
        }
    }
}