const cacheName = 'hira-fanantenana-v35';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './lyrics.json',
  './logo.png',
  './show.png',
  './hidden.png',
  './play.png',
  './pause.png',
  './home.png',
  './stop.png',
  './logout.png',
  './manifest.json',
  './access.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
