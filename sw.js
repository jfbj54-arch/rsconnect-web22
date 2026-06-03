const CACHE_NAME = "rsconnect-cache-v1";
const FILES_TO_CACHE = [
    "/rsconnect-web22/",
    "/rsconnect-web22/index.html",
    "/rsconnect-web22/login.html",
    "/rsconnect-web22/icon-192.png",
    "/rsconnect-web22/icon-512.png",
    "/rsconnect-web22/manifest.json"
];

// Instalação
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Ativação
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
