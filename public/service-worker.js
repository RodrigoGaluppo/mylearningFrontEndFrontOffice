// service-worker.js

// Define the cache names
const CACHE_NAME = 'mylearningbackoffice-cache-v1';
const DATA_CACHE_NAME = 'mylearningbackoffice-data-cache-v1';

// List the files to be cached
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other files and assets that should be cached
];

// Install the service worker
self.addEventListener('install', (event) => {
  // Perform installation steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercept fetch requests
self.addEventListener('fetch', (event) => {
  // Check if the request is to an API
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            // If the response was successful, clone it and store it in the cache
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch(() => {
            // If the network request fails, try to retrieve the data from the cache
            return cache.match(event.request);
          });
      })
    );
  } else {
    // Serve the file from the cache if available, otherwise fetch it
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
