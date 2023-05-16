import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAamF602S7aB5crMRJMvVeqzv8QKtjc804",
  authDomain: "ecokpala.firebaseapp.com",
  projectId: "ecokpala",
  storageBucket: "ecokpala.appspot.com",
  messagingSenderId: "911424646377",
  appId: "1:911424646377:web:fe5626c90c9f30a442d478"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
