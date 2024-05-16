'use client'

import {createContext, useContext, useEffect, useState} from "react";
import {auth, firebaseApp} from "@/lib/firebase/firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {io} from "socket.io-client";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

import APIClient from '../services/api'
import {toast, ToastContainer} from "react-toastify";
import useFcmToken from "@/hooks/useFcmToken";

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);


export const AuthContextProvider = ({
                                        children,
                                    }) => {
    const { fcmToken,notificationPermissionStatus } = useFcmToken();

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
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(firebaseApp);
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground push notification received:', payload);
                toast('🦄 Wow so easy!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
                // Handle the received push notification while the app is in the foreground
                // You can display a notification or update the UI based on the payload
            });
            return () => {
                unsubscribe(); // Unsubscribe from the onMessage event
            };
        }
    }, []);


    return (
        <AuthContext.Provider value={settings}>

            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"
            />
        </AuthContext.Provider>
    );
};
