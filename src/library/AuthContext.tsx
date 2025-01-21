import React, { createContext, ReactNode, useEffect, useState } from "react";
import { fb } from "../getFirebaseConfig/getApp";
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
    const auth = fb.getCurrentAuth()
    const [user, setUser] = useState<User>(defaultUser)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser)
            }else{
                console.log('未ログイン')
            }
        })

        return unsubscribe
    }, [auth])

    //現在ログイン中のuserが渡される(未ログインの場合はデフォルト値)
    return(
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}
