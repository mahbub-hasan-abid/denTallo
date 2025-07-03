// Firebase is available globally via CDN scripts included in the HTML files.
// You can use firebase.* APIs in your service worker if needed (with proper importScripts for service workers).

// Service Worker for denTallo Dental Website
const CACHE_NAME = 'dentallo-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/gallery.html',
  '/blog.html',
  '/contact.html',
  '/login.html',
  '/dashboard.html',
  '/css/bootstrap.css',
  '/css/style.css',
  '/css/font-awesome.min.css',
  '/css/css_slider.css',
  '/images/banner.png',
  '/images/about.jpg',
  '/images/tooth.png'
];

// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 