import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebaseConfig'
import axios from 'axios';

export const AuthContext = createContext(null)
function ContextProvider({ children }) {

    const [dark, setDark] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true)
    const [disable, setDisable] = useState(false)
    const logInByGoogle = () => {
        setloading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }
    const createUser = (email, pass) => {
        setloading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    };

    const signIn = (email, pass) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const LogOut = () => {
        setloading(true)
        signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email
            const loggedUser = { email: userEmail }
            if (currentUser) {
                axios.post('https://a11-server-phi.vercel.app/jwt',
                    loggedUser,
                    { withCredentials: true },
                )
                    .then((res) => {
                        setUser(currentUser)
                        setloading(false);

                    })
            } else {
                setUser(null);
                axios.post('https://a11-server-phi.vercel.app/logout',
                    loggedUser,
                    { withCredentials: true },
                )
                setloading(false);

            }
        });
        return () => {
            unSubscribe()
        }
    }, [])



    const authinfo = { user, setUser, createUser, signIn, LogOut, logInByGoogle, loading, setloading, dark, setDark, disable, setDisable }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider