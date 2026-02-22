import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",            // ← Preencha com sua API Key
  authDomain: "",        // ← Preencha com seu Auth Domain
  projectId: "",         // ← Preencha com seu Project ID
  storageBucket: "",     // ← Preencha com seu Storage Bucket
  messagingSenderId: "", // ← Preencha com seu Messaging Sender ID
  appId: "",             // ← Preencha com seu App ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
