// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmVAZ0y6JbH5pTheQthMnDfaUHcU04MbQ",
  authDomain: "podcast-platform-b083d.firebaseapp.com",
  projectId: "podcast-platform-b083d",
  storageBucket: "podcast-platform-b083d.appspot.com",
  messagingSenderId: "177209329389",
  appId: "1:177209329389:web:8f7ecdf9ff43b9750deee4",
  measurementId: "G-40MRTJT6K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };