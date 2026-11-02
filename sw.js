const CACHE_NAME = "todo-cache-v1";
const PRECACHE_ASSETS = [
    "/offline.html",
    "/style.css",
    "/script.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;
    
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then(response => {
                return response || caches.match("/offline.html");
            });
        })
    );
});
