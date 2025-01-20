import {initializeApp, getApps, getApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export class FirebaseInitializer{
    private app: any
    private readonly firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    }

    constructor(){
        if(!getApps().length){
            this.app = initializeApp(this.firebaseConfig)
        }else{
            this.app = getApp()
        }
    }

    public getDb = () => getFirestore(this.app)
    public getCurrentAuth = () => getAuth(this.app)
}