import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import axios from 'axios';
import { auth } from './firebaseConfig';

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
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
      }

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
            if (currentUser) {
                setUser(currentUser)
                setloading(false);
            } else {
                setUser(null);
                setloading(false);

            }
        });
        return () => {
            unSubscribe()
        }
    }, [])



    const authinfo = { user, setUser, createUser, signIn, LogOut, logInByGoogle, loading, setloading, dark, setDark, disable, setDisable,updateUserProfile }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider