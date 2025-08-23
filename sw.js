// Define a name for the cache
const CACHE_NAME = 'rivava-finance-v2'; // Updated version name

// List of essential files to cache for the app to work offline
const urlsToCache = [
  './', // Caches the root URL
  './index.html',
  './logo.png'
];

// Install event: opens the cache and adds the core files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache and caching essential files');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event: cleans up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});


// Fetch event: serves cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});
