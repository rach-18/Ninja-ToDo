// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcyv0mOftmpCiJEnsBYQ4yI6hR5LrlT0w",
  authDomain: "ninjatodo-57d4f.firebaseapp.com",
  projectId: "ninjatodo-57d4f",
  storageBucket: "ninjatodo-57d4f.firebasestorage.app",
  messagingSenderId: "913124387118",
  appId: "1:913124387118:web:e2993ee79ae16e4d0f72bf",
  measurementId: "G-X3XSQ4SKJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;