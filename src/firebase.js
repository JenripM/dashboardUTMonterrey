// src/firebase.js (temporal)
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjxeFgFp71SDg-aafSy0ynQiSsHdkiomM",
  authDomain: "ulima-template.firebaseapp.com",
  projectId: "ulima-template",
  storageBucket: "ulima-template.firebasestorage.app",
  messagingSenderId: "717193047007",
  appId: "1:717193047007:web:0e9638c47c769a7b24326a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);