import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './connectToFirebase'
import { UseAuth } from './AuthContext'

export function createUser(email:string, password:string): Promise<void>{
    //名前と一緒にdbのユーザーコレクションに自分の情報を追加したい
    return new Promise((resolve, reject) => {
        const {SetUser} = UseAuth()

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                SetUser(user)
                resolve()
            }).catch((error) =>{
                console.error(error.code)
                console.error(error.message)
                reject()
            })
    })
}

export function login(email:string, password:string): Promise<void>{
    return new Promise((resolve, reject) => {
        const {SetUser} = UseAuth()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                SetUser(user)
                resolve()
            }).catch((error) => {
                console.error(error.code)
                console.error(error.message)
                reject()
            })
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