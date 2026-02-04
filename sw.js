const cacheName = 'todo-v1';
const assets = ['./', './index.html', './style.css', './main.js', './images/list.png'];


self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});