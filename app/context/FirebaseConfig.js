import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import * as SecureStore from 'expo-secure-store';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getDatabase(FIREBASE_APP);





// Set up secure token storage
async function saveToken(key, value) {
  await SecureStore.setItemAsync(key, value);
  console.log('Token stored:', token);
}

// Save user token when authenticated
FIREBASE_AUTH.onAuthStateChanged(async (user) => {
  if (user) {
    const token = await user.getIdToken();
    await saveToken('userToken', token);
  } else {
    await SecureStore.deleteItemAsync('userToken');
  }
  
async function getToken(key) {
  return await SecureStore.getItemAsync(key);
  console.log('Retrieved token:', token);
}


});