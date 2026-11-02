const CACHE_NAME = "todo-cache-v3";
const PRECACHE_ASSETS = [
    "./offline.html",
    "./style.css",
    "./script.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Proses caching dimulai...");
            return cache.addAll(PRECACHE_ASSETS);
        }).catch(err => {
            console.error("Gagal caching! Ada file yang tidak ditemukan:", err);
        })
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
                return response || caches.match("./offline.html");
            });
        })
    );
});
