const CACHE_NAME = "v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/index-BGOqGD-v.js",
  "/assets/index-DUEfxN0n.css",
  // Add more assets like images and fonts if needed
];

// Cache resources during installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch resources from cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate the new service worker and clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Listen for push events (for background notifications)
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "New Message";
  const options = {
    body: data.body || "You have a new message!",
    icon: "/icons/superiorsupplyio_image.png",
    badge: "/icons/superiorsupplyio_image.png",
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Open the corresponding chat window if it's already open
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Listen for messages from the client (foreground JS)
self.addEventListener("message", (event) => {
  // Handle custom actions or update notifications if needed
  if (event.data && event.data.type === "NEW_MESSAGE") {
    const { title, body, url } = event.data.payload;

    self.registration.showNotification(title, {
      body: body,
      icon: "/icons/superiorsupplyio_image.png",
      badge: "/icons/superiorsupplyio_image.png",
      data: {
        url: url,
      },
    });
  }
});
