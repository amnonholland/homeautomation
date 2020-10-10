// Perform install steps
let CACHE_NAME = 'my-cache';
let urlsToCache = [
    'https://amnonholland.github.io/homeautomation/index.html',
    'https://amnonholland.github.io/homeautomation/trendlog.html'
    ];

self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if ((response)&&(response.status < 400)) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});




self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['pigment'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
