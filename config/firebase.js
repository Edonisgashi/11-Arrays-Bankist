import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyArGrgA1B0BGLbGn5zD2FIXAnkdyEqGBc8",
  authDomain: "bankist-16dc3.firebaseapp.com",
  projectId: "bankist-16dc3",
  storageBucket: "bankist-16dc3.appspot.com",
  messagingSenderId: "932242433822",
  appId: "1:932242433822:web:02228fbdbef51f9e5f8b0f",
  measurementId: "G-G8704QT879",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
const analytics = getAnalytics(app);
