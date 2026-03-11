const cacheName = 'sampana-v2';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './lyrics.json',
  './play.png',
  './pause.png',
  './stop.png',
  './logo.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  if (url.pathname.endsWith('.mp3')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
