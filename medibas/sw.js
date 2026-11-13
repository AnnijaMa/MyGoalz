const CACHE = 'medibas-v1';
const IMG_CACHE = 'medibas-photos-v1';
const IMG_HOST = 'www.xn--medbas-k8a.lv';
const ASSETS = ['./', 'index.html', 'questions.js', 'manifest.json', 'icon-180.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k.startsWith('medibas-') && k !== CACHE && k !== IMG_CACHE).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Exam photos: keep a copy on the phone, serve it from there (works offline).
  if (url.host === IMG_HOST) {
    e.respondWith(caches.open(IMG_CACHE).then(async c => {
      const hit = await c.match(url.href);
      if (hit) return hit;
      const res = await fetch(url.href, { mode: 'cors' });
      if (res.ok) c.put(url.href, res.clone());
      return res;
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;
  // App files: network first (so updates arrive), cache when offline.
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
