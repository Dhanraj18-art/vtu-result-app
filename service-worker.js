const CACHE_NAME = "vtu-result-cache-v4";

const urlsToCache = [
    "/",
    "/index.html",
    "/app.js",
    "/manifest.json"
];

/***********************
 * INSTALL
 ***********************/
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

/***********************
 * FETCH
 ***********************/
self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => {

                if (response) {
                    return response;
                }

                return fetch(event.request);

            })
    );

});

/***********************
 * ACTIVATE
 ***********************/
self.addEventListener("activate", event => {

    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {

                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }

                })
            );
        })
    );

});
