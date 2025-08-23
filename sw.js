self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("rivava-cache").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./icons_folder/icon-192x192.png",
        "./icons_folder/icon-512x512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
