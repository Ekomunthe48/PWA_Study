const CACHE_NAME = "foodpwa-v5.0.2";
var urlsToCache = [
        "/",
        "/nav.html",
        "/index.html",
        "/pages/home.html",
        "/pages/appetizers.html",
        "/pages/main.html",
        "/pages/dessert.html",
        "/css/materialize.min.css",
        "/js/materialize.min.js",
        "/js/nav.js",
        "/css/timeline.css",
        "/css/index.css",
        "/icon.png",
        "/src/ErcPhaBVS2OMnh07iiZf_banana-cake-with-cream-cheese-frosting-08.jpg",
        "/src/tZnTIjaSmSSUSKMsTP0l_charlies-famous-chicken-salad-with-grapes_153.jpg",
        "/src/whCeWl0LRbCEBfa3J4YP_0S9A6313.jpg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });
  
  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });