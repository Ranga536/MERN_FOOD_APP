import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from "./firebase-config";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const getFcmToken = async () => {
  try {
    const messaging = getMessaging(firebaseApp);
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });

    if (token) {
      // console.log("✅ FCM Token:", token);
      return token;
    } else {
      console.log("❌ No registration token available.");
    }
  } catch (err) {
    console.error("🔥 Error getting FCM token:", err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging(firebaseApp);
    onMessage(messaging, (payload) => {
      console.log("📥 Foreground notification:", payload);
      resolve(payload);
    });
  });
