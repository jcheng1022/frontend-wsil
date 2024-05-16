'use client'

import {createContext, useContext, useEffect, useState} from "react";
import {auth, firebaseApp} from "@/lib/firebase/firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {io} from "socket.io-client";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

import APIClient from '../services/api'

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);


export const AuthContextProvider = ({
                                        children,
                                    }) => {

    const [loading, setLoading] = useState(true);

    const logOut = async () => {
        await auth.signOut()
        if (window) {
            return window.location.href = window.location.href

        }

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

    const socket = io('https://backend-wsil-production.up.railway.app');


    const settings = {
        handleSignIn,
        socket,
        // user: currentUser,
        logOut,
        initializingAuth: loading
    }



    function requestPermission() {
        console.log('Requesting permission...');
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.')

                const messaging = getMessaging(firebaseApp);

                getToken(messaging, {vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY})
                    .then(async (token) => {
                        console.log(`Got Token`)

                        // await APIClient.
                    }).catch((e) => console.log(`Failed to get token: ${e}`))

            }
        }).catch(e => {
            console.error('Error requesting notification permission: ', e);
        })}




    useEffect(() => {

        requestPermission();

    },[])
    useEffect(() => {
        const messaging = getMessaging(firebaseApp);

        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            // ...
        });
    }, [])

    return (
        <AuthContext.Provider value={settings}>

            {children}
        </AuthContext.Provider>
    );
};
