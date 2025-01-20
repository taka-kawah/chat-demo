import React, { createContext, ReactNode, useEffect } from "react";
import { FirebaseInitializer } from "../getFirebaseConfig/getApp";
import { onAuthStateChanged, User } from "firebase/auth";

const defaultUser: User = {
    emailVerified: false,
    isAnonymous: false,
    metadata: {
        creationTime: new Date().toString(),
        lastSignInTime: new Date().toString()
    },
    providerData: [],
    refreshToken: '',
    tenantId: null
} as unknown as User

//contextにuserのデフォルト値を設定
export const AuthContext = createContext<User>(defaultUser)

//Appがレンダリング
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const firebaseInitializer = new FirebaseInitializer()
    const auth = firebaseInitializer.getCurrentAuth()

    let user: User = defaultUser

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                user = currentUser
            }else{
                console.error('エラー：未ログインです')
            }
        })

        return unsubscribe
    }, [])

    //現在ログイン中のuserが渡される(未ログインの場合はデフォルト値)
    return(
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}
