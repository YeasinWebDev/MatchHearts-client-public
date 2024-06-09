import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import axios from 'axios';
import { auth } from './firebaseConfig';
import useAxiosCommon from '../Hooks/useAxiosCommon';

export const AuthContext = createContext(null)
function ContextProvider({ children }) {
    const axiosCommon = useAxiosCommon()

    const [dark, setDark] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true)
    const [disable, setDisable] = useState(false)
    const [bioId, setBioId] = useState('')
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
        setloading(true);
        return updateProfile(auth?.currentUser, {
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


    // save user
    const saveUser = async user => {
        const currentuser = {
            email: user?.email,
            name: user?.displayName,
            role: "normal",
        };

        const { data } = await axiosCommon.put(`/user`, currentuser);
        return data;
    };

    // get the token from the server
    const getToken = (email) => {
        console.log(email)
        const data = axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email }, { withCredentials: true })
    }




    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                saveUser(currentUser);
                getToken(currentUser.email);
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



    const authinfo = { user, setUser, createUser, signIn, LogOut, logInByGoogle, loading, setloading, dark, setDark, disable, setDisable, updateUserProfile, bioId, setBioId }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider