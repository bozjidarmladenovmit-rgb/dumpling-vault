// Стариот линк веќе нема апликација: овој service worker го брише стариот кеш и се одјавува,
// за телефоните да ја вчитаат страницата за пренасочување кон https://nadjasquishytime.github.io/
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); })
    .then(function () { return self.registration.unregister(); })
    .then(function () { return self.clients.matchAll({ type: 'window' }); })
    .then(function (cs) { cs.forEach(function (c) { c.navigate(c.url); }); }));
});
