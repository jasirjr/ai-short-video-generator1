// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-generator-b4acd.firebaseapp.com",
  projectId: "ai-short-video-generator-b4acd",
  storageBucket: "ai-short-video-generator-b4acd.firebasestorage.app",
  messagingSenderId: "482728600591",
  appId: "1:482728600591:web:bcfdcaa9c5168793b42f7a",
  measurementId: "G-5R6ZXSNJRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);