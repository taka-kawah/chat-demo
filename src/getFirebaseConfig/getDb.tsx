import { getFirestore } from "firebase/firestore";
import app from "./getApp";

const db = getFirestore(app)
export default db