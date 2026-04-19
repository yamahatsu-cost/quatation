const CACHE_NAME = 'estimate-app-v4.33';
const STATIC_ASSETS = [
  './index_clean_pwa_v433.html',
  './manifest.json',
  './icon.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).catch(() => {}));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        const cache = await caches.open(CACHE_NAME);
        cache.put('./index_clean_pwa_v433.html', fresh.clone()).catch(() => {});
        return fresh;
      } catch {
        return (await caches.match(req)) || (await caches.match('./index_clean_pwa_v433.html'));
      }
    })());
    return;
  }

  if (STATIC_ASSETS.some(asset => url.pathname.endsWith(asset.replace('./','')))) {
    event.respondWith((async () => (await caches.match(req)) || fetch(req))());
  }
});
