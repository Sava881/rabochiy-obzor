const CACHE_NAME = "rabochiy-obzor-cache-v1";
const urlsToCache = [
  "/index.html",
  "/manifest.json",
  "/sw.js",
  "/icon-192.png",
  "/icon-512.png"
];

// Установка сервис-воркера и кэширование
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Активация сервис-воркера
self.addEventListener("activate", event => {
  console.log("Service Worker активирован");
});

// Перехват запросов и отдача из кэша
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
