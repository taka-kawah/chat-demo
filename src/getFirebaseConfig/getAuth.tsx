import { getAuth } from "firebase/auth"
import app from "./getApp"

const auth = getAuth(app)
export default auth