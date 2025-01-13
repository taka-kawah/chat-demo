import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { auth } from './connectToFirebase'
import { onAuthStateChanged, User } from "firebase/auth";

//これが正解？
interface AuthContextType{
    uUser: User|null
    SetUser: Dispatch<SetStateAction<User|null>>
}

const AuthContext = createContext<AuthContextType>({uUser: null, SetUser: () => {}})

export const UseAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User|null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
            if(userCredential){
                setUser(userCredential)
            }else{
                setUser(null)
            }
        })

        return unsubscribe
    }, [])

    return(
        <AuthContext.Provider value={{uUser:user, SetUser:setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
