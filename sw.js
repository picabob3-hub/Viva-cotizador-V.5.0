const CACHE_NAME = 'viva-estudio-v11'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './VIVAICONO.png',
  'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap'
];

// Instalar y guardar en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activar y limpiar cachés antiguas (aquí borrará la v2 vieja)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Responder desde caché o red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

