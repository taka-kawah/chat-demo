import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './connectToFirebase'

export async function createUser(email:string, password:string){
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            return user
        }).catch((error) =>{
            console.error(error.code)
            console.error(error.message)
        })
}

export async function login(email:string, password:string){
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            return user
        }).catch((error) => {
            console.error(error.code)
            console.error(error.message)
        })
}

export async function logout(){
    await signOut(auth)
        .then()
        .catch((error) => {
            console.error(error.code)
            console.error(error.message)
        })
}