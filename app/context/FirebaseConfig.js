import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAU79K3RDgEGEL1oY3GZVsjvdb82JFf5Sw",
  authDomain: "fitapp-fe1fb.firebaseapp.com",
  projectId: "fitapp-fe1fb",
  storageBucket: "fitapp-fe1fb.appspot.com",
  messagingSenderId: "568071090980",
  appId: "1:568071090980:web:2a0ffb30f419747ced79b1"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);