import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATXD6eyICmX7OgJNDmrEwOPDwZa82-GxE",
  authDomain: "review-5e4f9.firebaseapp.com",
  projectId: "review-5e4f9",
  storageBucket: "review-5e4f9.appspot.com",
  messagingSenderId: "237278301577",
  appId: "1:237278301577:web:8e4691ebd5a4942cb3a558",
  measurementId: "G-70Q9LX0RD5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
