import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { fb } from "../getFirebaseConfig/getApp";

export function createUser(email:string, password:string): Promise<string>{
    //Authenticationを登録しログイン
    const auth = fb.getCurrentAuth()
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((newUser) => {
                login(email, password)
                resolve(newUser.user.uid)
            }).catch((error) =>{
                console.error(error.code)
                console.error(error.message)
                reject()
            })
    })
}

export function login(email:string, password:string): Promise<void>{
    const auth = fb.getCurrentAuth()
    //ログインするだけ
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                resolve()
            }).catch((error) => {
                console.error(error.code)
                console.error(error.message)
                reject()
            })
        })
}

export async function logout(){
    const auth = fb.getCurrentAuth()
    await signOut(auth)
        .catch((error) => {
            console.error(error.code)
            console.error(error.message)
        })
}