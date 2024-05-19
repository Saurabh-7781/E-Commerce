
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF6q54GCFNd2PGyH6bGkdOrMQRaSsiFRI",
  authDomain: "e-commerce-45147.firebaseapp.com",
  projectId: "e-commerce-45147",
  storageBucket: "e-commerce-45147.appspot.com",
  messagingSenderId: "809375447789",
  appId: "1:809375447789:web:725ba4af94fa4752392ae4"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)
 const db = getFirestore(app)

export {auth , db}