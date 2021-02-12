importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const cachingSkeleton = ["/loader.css", "/build/bundle.js", "/global.css", "/build/bundle.css", "/manifest.json", "/index.html"]

/*
workbox.precaching.precacheAndRoute([

    ...cachingSkeleton.map((item) => { return { url: item, revision: null } })
]);
*/

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 100,
                
                maxAgeSeconds: 3 * 24 * 3600, // 30 Days
            }),
        ],
    })
);
const cacheLinks = ['https://firebasestorage.googleapis.com/v0/b/unify-tn.appspot.com/o/' , '/imgs/']
const matchCb = ({ url, event }) => {
    return cacheLinks.some((item) => url.href.includes(item));
};

workbox.routing.registerRoute(
    matchCb,
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 100,
                
                maxAgeSeconds: 3 * 24 * 3600, // 30 Days
            }),
        ],
    })
);
const cachingLinks = ['https://cdnjs.cloudflare.com', 'https://unpkg.com']
const matchFiles = ({url, event}) => {
    return cachingLinks.some((item) => url.href.includes(item))
}

workbox.routing.registerRoute(
    matchFiles,
    new workbox.strategies.CacheFirst({
        cacheName: 'libraries',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 7 * 24 * 3600, // 30 Days
            }),
        ],
    })
);

self.addEventListener('fetch', async (event) => {
    if (navigator.onLine === false) {
        if (event.request.destination == "document") {
            event.respondWith(caches.match('/index.html'))
        }
    }
})

/*
const matchSkeleton = ({ url, event }) => {
    return cachingSkeleton.some((item) => url.href.includes(item))
}
workbox.routing.registerRoute(
    matchSkeleton,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'skeleton',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 3600, // 30 Days
            }),
        ],
    })
)
*/