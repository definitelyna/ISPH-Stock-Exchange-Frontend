// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "isph-stock-exchange.firebaseapp.com",
  databaseURL: "https://isph-stock-exchange-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "isph-stock-exchange",
  storageBucket: "isph-stock-exchange.firebasestorage.app",
  messagingSenderId: "51224544005",
  appId: "1:51224544005:web:43965c5cf5cc12d8dd6d6c",
  measurementId: "G-JD6T9PH0ST",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider()
export const auth = getAuth(app)
