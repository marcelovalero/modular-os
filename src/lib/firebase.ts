
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt0i4YfmNf0bSJBYLCvKZcuejrST5fXk8",
  authDomain: "modular-os.firebaseapp.com",
  projectId: "modular-os",
  storageBucket: "modular-os.firebasestorage.app",
  messagingSenderId: "995088201685",
  appId: "1:995088201685:web:3e1808b0c160d144156f5c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
