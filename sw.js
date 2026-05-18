const CACHE_NAME = 'academia-agrometal-v2'; // Cambiamos a v2 para que el celu sepa que hay cambios

// ACÁ AGREGÁS LAS RUTAS DE LOS MANUALES
const urlsToCache = [
  './',
  './index.html',
  './manifest.webmanifest',
  './js/register-sw.js',
  
  // Agregá acá las rutas de las carpetas o páginas de tus procedimientos actuales
  './modelo-apx/index.html',
  './grafito/index.html',
  './mantenimiento/index.html'
  // A medida que sumes manuales, agregás su ruta .html acá abajo
];

// El resto del código se queda exactamente igual...
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});