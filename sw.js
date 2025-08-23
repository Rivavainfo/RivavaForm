// Define a name for the cache
const CACHE_NAME = 'rivava-finance-v1';

// List of files to cache
const urlsToCache = [
  '/',
  'index.html',
  'logo.png'
  // Add paths to your CSS and other JS files if you have them
];

// Install event: opens the cache and adds the core files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serves cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});
