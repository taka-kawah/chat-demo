import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './connectToFirebase'
import { UseAuth } from './AuthContext'

export async function createUser(email:string, password:string){
    const {SetUser} = UseAuth()

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            SetUser(user)
        }).catch((error) =>{
            console.error(error.code)
            console.error(error.message)
        })
}

export async function login(email:string, password:string){
    const {SetUser} = UseAuth()

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            SetUser(user)
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