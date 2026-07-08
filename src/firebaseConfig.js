import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp1KXxgG2JO23Miud6nsfDZPw0fS0XhRE",
  authDomain: "makokou2026.firebaseapp.com",
  projectId: "makokou2026",
  storageBucket: "makokou2026.firebasestorage.app",
  messagingSenderId: "45084766033",
  appId: "1:45084766033:web:4973de0e9cf49274ec6d70"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
