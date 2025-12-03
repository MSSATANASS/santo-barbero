// Service Worker para Santo Barbero PWA
const CACHE_NAME = 'santo-barbero-v3';
const STATIC_CACHE = 'santo-barbero-static-v3';
const DYNAMIC_CACHE = 'santo-barbero-dynamic-v3';

// Recursos estáticos esenciales
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker v3...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Cache estático abierto');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Activar inmediatamente
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker v3...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Tomar control inmediato
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Ignorar peticiones externas (APIs, etc)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && (response.type === 'basic' || response.type === 'opaque')) {
            const copy = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => {
          // Sin conexión - devolver página offline si es navegación
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return cached;
        });

      // Stale-while-revalidate: devuelve cache si existe, actualiza en background
      return cached || networkFetch;
    })
  );
});

// Manejar notificaciones push (para futuras recordatorios)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : '¡Tienes un recordatorio de Santo Barbero!',
    icon: '/logo.png',
    badge: '/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'confirm', title: '✓ Confirmar' },
      { action: 'cancel', title: '✗ Cancelar' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Santo Barbero', options)
  );
});

// Manejar click en notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'confirm') {
    // Abrir WhatsApp con confirmación
    event.waitUntil(
      clients.openWindow('https://wa.me/525555555555?text=Confirmo%20mi%20cita')
    );
  } else {
    // Abrir la app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync para guardar citas offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-appointments') {
    event.waitUntil(syncAppointments());
  }
});

async function syncAppointments() {
  // Aquí se sincronizarían las citas guardadas offline
  console.log('[SW] Sincronizando citas pendientes...');
}
