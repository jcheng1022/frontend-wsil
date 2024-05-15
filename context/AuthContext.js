'use client'

import {createContext, useContext, useState} from "react";
import {auth} from "@/lib/firebase/firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);


export const AuthContextProvider = ({
                                        children,
                                    }) => {

    const [loading, setLoading] = useState(true);

    console.log(auth.currentUser, '23232', auth)
    const logOut = async () => {
        await auth.signOut()

        return window.location.href = window.location.href

    }

    const handleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // window.location.href = window.location.href

            }).catch((error) => {
            console.log(`Error signing in: ${error}`)
            // Handle Errors here.

        })}

    const settings = {
        handleSignIn,
        // user: currentUser,
        logOut,
        initializingAuth: loading
    }
    return (
        <AuthContext.Provider value={settings}>

            {children}
        </AuthContext.Provider>
    );
};
