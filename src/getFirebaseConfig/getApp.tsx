import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBElptVFXyDKDvuxEdMJjbqpd4E7TA-z7k",
    authDomain: "chat-demo-47f22.firebaseapp.com",
    projectId: "chat-demo-47f22",
    storageBucket: "chat-demo-47f22.firebasestorage.app",
    messagingSenderId: "722796065113",
    appId: "1:722796065113:web:3bdb8e02d389e72f631c48",
    measurementId: "G-LK1D9FVRHH"
};

const app = initializeApp(firebaseConfig)

export default app