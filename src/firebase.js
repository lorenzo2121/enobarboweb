// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// La configurazione della tua app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBFu5xW18G79VeFN5kYQP1OKIeNYrOUgZA",
  authDomain: "enobarbo-70f16.firebaseapp.com",
  databaseURL: "https://enobarbo-70f16-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "enobarbo-70f16",
  storageBucket: "enobarbo-70f16.appspot.com",
  messagingSenderId: "745612048147",
  appId: "1:745612048147:web:aebcf56c23e991e48ecce6",
  measurementId: "G-9GK7B5C66N"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Inizializza il database

export { database }; // Esporta il database per utilizzarlo altrove
