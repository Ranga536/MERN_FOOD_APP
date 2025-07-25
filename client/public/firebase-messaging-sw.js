importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAUTCnVmF-u7CH6nXkbxnWPBhnqydFFrLg",
  authDomain: "fooddeliverypush.firebaseapp.com",
  projectId: "fooddeliverypush",
  storageBucket: "fooddeliverypush.firebasestorage.app",
  messagingSenderId: "886329277430",
  appId: "1:886329277430:web:422fc3ea316d952822e5d7",
  measurementId: "G-MGLR87CKB0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/android-launchericon-192-192.png", // path to your logo or favicon
    badge: "/image_96x96",           // ✅bagde icon for the notification
    // badge: "/image_72x72", // ✅badge icon for the notification
    // vibrate: [100, 50, 100],            // ✅vibration pattern
    // tag: "notification-tag",            // ✅tag for the notification
    data: {
      // url: `${import.meta.env.VITE_O_APP_URL}`, // 👈 REPLACE this with your actual domain!
      url: "https://www.delbite.com/shop/home",
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

});

// ✅ Handle click event when user clicks notification
// self.addEventListener("notificationclick", function(event) {
//   event.notification.close();

//   const redirectUrl = event.notification.data?.url || "https://www.delbite.com/shop/home"; // Default URL if not specified

//   event.waitUntil(
//     clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
//       for (const client of clientList) {
//         if (client.url === redirectUrl && "focus" in client) {
//           return client.focus();
//         }
//       }
//       if (clients.openWindow) {
//         return clients.openWindow(redirectUrl);
//       }
//     })
//   );
// });

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  const redirectUrl = (event.notification.data && event.notification.data.url) || "https://www.delbite.com/shop/home";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('delbite.com') && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(redirectUrl);
      }
    })
  );
});