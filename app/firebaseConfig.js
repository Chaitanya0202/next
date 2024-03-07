
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBnpRuPg1lQoUa2IbX9NyqJB8kU4CwbZBw",
  authDomain: "nextuser-1dfa6.firebaseapp.com",
  projectId: "nextuser-1dfa6",
  storageBucket: "nextuser-1dfa6.appspot.com",
  messagingSenderId: "90475234683",
  appId: "1:90475234683:web:60ff905648e957b082a9de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
