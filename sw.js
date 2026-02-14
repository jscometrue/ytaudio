const CACHE = 'yt-audio-pwa-v2';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(['./', './index.html', './manifest.json']))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.startsWith('https://www.youtube.com/') || e.request.url.startsWith('https://i.ytimg.com/')) {
    return;
  }
  var isNav = e.request.mode === 'navigate' || (e.request.url.indexOf('index.html') !== -1);
  if (isNav) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(function () {
        return caches.match('./index.html').then(function (r) { return r || caches.match('./'); });
      })
    );
    return;
  }
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
  );
});
