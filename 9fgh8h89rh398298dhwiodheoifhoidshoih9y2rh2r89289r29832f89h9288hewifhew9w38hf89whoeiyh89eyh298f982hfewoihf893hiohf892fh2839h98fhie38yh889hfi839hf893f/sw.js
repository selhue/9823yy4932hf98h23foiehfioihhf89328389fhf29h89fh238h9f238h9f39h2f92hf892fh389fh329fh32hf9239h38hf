const CACHE_NAME = 'journal-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',        // your HTML file
  '/manifest.json',
  '/style.css',         // if you separate CSS, or inline CSS is fine
  '/script.js',         // your JS file if separate
  'https://fonts.googleapis.com/css2?family=Alata&display=swap',
  // Add other assets you want cached, e.g. icons
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - cleanup old caches if needed
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
