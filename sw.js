const CACHE_NAME = 'academia-agrometal-v6';

// Rutas relativas a la carpeta 'site' que entiende el servidor web de GitHub
const urlsToCache = [
  './',
  './index.html',
  './manifest.webmanifest',
  './js/register-sw.js',
  
  // Apuntamos a la subcarpeta donde realmente están tus archivos HTML
  './Sembradora_Modelo_APX/actuadores.html',
  './Sembradora_Modelo_APX/burlete.html',
  './Sembradora_Modelo_APX/dobles.html',
  './Sembradora_Modelo_APX/espaciado.html',
  './Sembradora_Modelo_APX/grafito.html',
  './Sembradora_Modelo_APX/poblacion.html',
  './Sembradora_Modelo_APX/problemas_siembra.html',
  './Sembradora_Modelo_APX/semillas_pequenas.html'
];

// ... (El resto del código de install, fetch y activate queda exactamente igual que antes)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache abierta. Descargando manuales de Sembradora...');
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

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});