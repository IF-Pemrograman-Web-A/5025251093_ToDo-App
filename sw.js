self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('Service Worker: Terinstall');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Aktif');
});
