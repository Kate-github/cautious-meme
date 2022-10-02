const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

const imagesRoute = new Route(({ request, sameOrigin }) => {
  return sameOrigin && request.destination === 'images'
}, new CacheFirst());
registerRoute(imagesRoute);

const cssRoute = new Route(({ request, sameOrigin }) => {
  return sameOrigin && request.destination === 'css'
}, new CacheFirst());
registerRoute(cssRoute);

const jsRoute = new Route(({ request, sameOrigin }) => {
  return sameOrigin && request.destination === 'js'
}, new CacheFirst());
registerRoute(jsRoute);
