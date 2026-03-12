const cacheName = 'hira-fanantenana-v6';
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
  const url = new URL(e.request.url);

  if (url.pathname.endsWith('.mp3')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
