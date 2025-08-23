// A new version name is CRITICAL for triggering the update process.
const CACHE_NAME = 'rivava-cache-v10'; 

// List of all essential files for the app to work offline.
// This now includes your new history page and main logo.
const urlsToCache = [
  './',
  './index.html',
  './history.html',
  './manifest.json',
  './logo.png',
  './icons_folder/icon-192x192.png',
  './icons_folder/icon-512x512.png'
];

// Install event: The browser runs this when it sees a new service worker version.
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching new files');
      return cache.addAll(urlsToCache);
    })
  );
  // This line tells the new service worker to take over immediately.
  self.skipWaiting();
});

// Activate event: This runs after the install event and is perfect for cleaning up old files.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // If a cache's name is not our new CACHE_NAME, we delete it.
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event: This decides how to handle requests for files.
self.addEventListener("fetch", (e) => {
  e.respondWith(
    // It first tries to find a matching file in the cache.
    caches.match(e.request).then((response) => {
      // If it finds the file in the cache, it returns it.
      // Otherwise, it fetches the file from the network.
      return response || fetch(e.request);
    })
  );
});
