import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseInitializer } from "../getFirebaseConfig/getApp";

export function createUser(email:string, password:string): Promise<string>{
    //Authenticationを登録しログイン
    const firebaseInitializer = new FirebaseInitializer()
    const auth = firebaseInitializer.getCurrentAuth()
    if(auth){
        if(auth.emulatorConfig){
            console.log('認証エミュレータ不使用')
        }
    }else{
        //ここにきます
        console.error('Firebase未認証')
    }
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
    const firebaseInitializer = new FirebaseInitializer()
    const auth = firebaseInitializer.getCurrentAuth()
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
    const firebaseInitializer = new FirebaseInitializer()
    const auth = firebaseInitializer.getCurrentAuth()
    await signOut(auth)
        .catch((error) => {
            console.error(error.code)
            console.error(error.message)
        })
}