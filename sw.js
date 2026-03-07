const cacheName = 'hira-fanantenana-v2';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './lyrics.json',
  './logo.png',
  './back-icon.png',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});