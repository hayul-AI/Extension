import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy_api_key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "converter-fd0f2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "converter-fd0f2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "converter-fd0f2.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abc123def456",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DUMMY123"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
