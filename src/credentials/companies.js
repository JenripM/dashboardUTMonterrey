// src/firebase2.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Config de la segunda app
const firebaseConfig2 = {
  apiKey: "AIzaSyADtQbLfYK8HGav1SSPATDnLJpryyuurA0",
  authDomain: "prueba-login-prueba.firebaseapp.com",
  projectId: "prueba-login-prueba",
  storageBucket: "prueba-login-prueba.firebasestorage.app",
  messagingSenderId: "291661131431",
  appId: "1:291661131431:web:a8a3ce57ce90e41f41b582"
 };
// Para apps adicionales, se puede dar un nombre distinto
const app2 = !getApps().some(app => app.name === "secondary") 
  ? initializeApp(firebaseConfig2, "secondary") 
  : getApp("secondary");

export const db2 = getFirestore(app2);
