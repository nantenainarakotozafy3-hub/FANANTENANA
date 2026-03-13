const cacheName = 'hira-fanantenana-v10';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './lyrics.json',
  './logo.png',
  './back-icon.png',
  './play.png',
  './pause.png',
  './stop.png',
  './manifest.json'
];self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching assets...');
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

      if (response) return response;

      return fetch(e.request).then(fetchRes => {
        return caches.open(cacheName).then(cache => {

          if (e.request.url.includes('.mp3')) {
             cache.put(e.request.url, fetchRes.clone());
          }
          return fetchRes;
        });
      });
    }).catch(() => 
        console.log("Offline ary tsy hita ny hira");
    })
  );
});
