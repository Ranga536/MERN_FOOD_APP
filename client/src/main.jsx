import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" richColors closeButton />
    </Provider>
  </BrowserRouter>
);

// ✅ Add this AFTER the render
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      // .then((registration) => {
      //   console.log("✅ Firebase service worker registered:", registration);
      // })
      // .catch((err) => {
      //   console.error("❌ Firebase service worker registration failed:", err);
      // });
  });
}