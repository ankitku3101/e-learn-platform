import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBHMC3f7s0n4YagM7nikqBPrgZo_jSS0Pg",
  authDomain: "unilearn-439c2.firebaseapp.com",
  projectId: "unilearn-439c2",
  storageBucket: "unilearn-439c2.firebasestorage.app",
  messagingSenderId: "1059087333443",
  appId: "1:1059087333443:web:c5c21b10403dcee112fcf6"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };

const auth = getAuth(app);
export { auth };